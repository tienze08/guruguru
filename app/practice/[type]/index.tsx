import { View, Text, Image, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { PraticeOption } from '@/constants/Option'
import Ionicons from '@expo/vector-icons/Ionicons';

import { collection, DocumentData, getDocs, orderBy, query, where } from 'firebase/firestore';
import { UserDetailContext } from '@/app/context/userDetailContext';
import { db } from '@/config/firebaseConfig';
import { ActivityIndicator } from 'react-native-paper';
import CourseListGrid from '@/app/component/practice/CourseListGrid';
import { Colors } from '@/constants/Colors';

export default function PracticeTypeHome() {
  const { type } = useLocalSearchParams()
  const router = useRouter()
  const option = PraticeOption.find(item => item.name == type) || {} as DocumentData;
  const {userDetail, setUserDetail} = useContext(UserDetailContext)
  const [loading, setLoading] = useState(false)
  const [courseList, setCourseList] = useState<DocumentData[]>([])

  useEffect(() => {
    userDetail && getCourseList()
  }, [userDetail])
  
  const getCourseList = async () => {
    setLoading(true)
    setCourseList([])
    try {
      const q = query(collection(db, 'Courses'), where('createdBy', '==', userDetail?.email), orderBy('createdOn', 'desc'))

      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        setCourseList(prev => [...prev, doc.data()])
      })
      setLoading(false)
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <View>
      <Image source={option?.image} style={{height: 200, width: '100%'}}></Image>
      <View style={{position: 'absolute', display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 10, gap: 10}}>
        <Pressable onPress = {() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" style={{backgroundColor: Colors.WHITE, padding: 8, borderRadius: 10}}/>
        </Pressable>
        <Text style={{color: Colors.WHITE, fontWeight: 'bold', fontSize: 35}}>{option?.name}</Text>
      </View>

      {loading && <ActivityIndicator size={'large'} style={{marginTop: 150}} color={Colors.PRIMARY}/>}  

      <CourseListGrid courseList={courseList} option={option}/>
    </View>
  )
}