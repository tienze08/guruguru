import { View, Text, Platform, ScrollView, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../component/home/header'
import { Colors } from '@/constants/Colors'
import NoCourse from '../component/home/noCourse'
import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore'
import { UserDetailContext } from '@/app/context/userDetailContext'
import { db } from '@/config/firebaseConfig'
import CoursesList from '../component/home/coursesList'
import PracticeSection from '../component/home/practiceSection'
import CoursesProgress from '../component/home/coursesProgress'

export default function Home() {
  const { userDetail } = useContext(UserDetailContext)
  const [courseList, setCourseList] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (userDetail) {
      GetCourseList()
    }
  }, [userDetail])

  const GetCourseList = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, 'Courses'), where("createdBy", '==', userDetail?.email))
      const querySnapshot = await getDocs(q)
      const courses = querySnapshot.docs.map(doc => doc.data()) 
      setCourseList(courses) 
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khóa học:", error)
    }
    setLoading(false)
  }

  return (
    <ScrollView 
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={GetCourseList} />
      }
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        padding: 10,
        paddingTop: Platform.OS === 'ios' ? 45 : undefined,
        backgroundColor: Colors.WHITE
     }}>
      <Header/>
      
      {courseList.length === 0 ? <NoCourse/> : 
      <View>
        <CoursesProgress courseList={courseList}/>
        <PracticeSection />
        <CoursesList courseList={courseList}/>
      </View>}
    </ScrollView>
  )
}