import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { DocumentData } from 'firebase/firestore'
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import CourseProgressCard from '../shared/courseProgressCard';


interface CoursesListProps {
  courseList : DocumentData[]
}

export default function CoursesProgress({courseList} : CoursesListProps) {

  return (
      <View>
        <Text style={{fontFamily : 'outfit-bold', fontSize: 25, color: Colors.WHITE}}>Progress</Text>
        <FlatList data={courseList} 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({index, item}) => (
          <View key={index}>
            <CourseProgressCard item={item} index={index}></CourseProgressCard>
          </View>
        )}></FlatList>
      </View>
  )
}
      