import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, DocumentData, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/config/firebaseConfig'
import CoursesList from '../home/coursesList'
import { imageAssets } from '@/constants/Option'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'

interface CourseListByCategoryProps {
  category: string 
}

export default function CourseListByCategory({ category }: CourseListByCategoryProps) {

    const [courseList, setCourseList] = useState<DocumentData[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        GetCourseListByCategory() 
    }, [category])

    const GetCourseListByCategory = async () => {
        setCourseList([])
        setLoading(true)
        try {
            const q = query(collection(db, 'Courses'),
                where("category", "==", category),
            );
    
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                setCourseList(prev => [...prev, doc.data()])
            })
            setLoading(false)
        } catch (error) {
            console.error("Lỗi khi lấy danh sách khóa học:", error)
        }
    };

  return (
    <View>  
      {courseList.length > 0 && <CoursesList courseList={courseList} heading = {category} enroll = {true}></CoursesList>}
    </View>
  )
}

const styles = StyleSheet.create({
  coursesContainer: {
    backgroundColor: Colors.BG_GRAY,
    padding: 10,
    borderRadius: 10,
    margin: 6,
    width: 240
  }
})