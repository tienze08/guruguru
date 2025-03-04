import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '@/app/context/userDetailContext'
import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import CourseProgressCard from '../component/shared/courseProgressCard';

export default function Progress() {
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
    <View>
      <Image source={require('../../assets/images/wave.png')} style = {{position:'absolute', width: '100%', height: 700}}></Image>
      <View style={{width: '100%', padding: 20, position: 'absolute'}}>
        <Text style={{fontFamily : 'outfit', fontSize: 50, color: 'white', marginBottom: 20}}>Progress</Text>
        <FlatList data={courseList} showsHorizontalScrollIndicator={false} numColumns={1} onRefresh={() => GetCourseList()}
          refreshing={loading} 
          renderItem={({index, item}) => (
            <View key={index}>
              <CourseProgressCard item={item} index={index} width={350} textSize={20}></CourseProgressCard>
            </View>
          )}>
        </FlatList>
      </View>
    </View>
  );
}

