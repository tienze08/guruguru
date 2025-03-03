import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { DocumentData } from 'firebase/firestore'
import { imageAssets } from '@/constants/Option'
import { Colors } from '@/constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';


interface CoursesListProps {
  courseList : DocumentData[]
}

export default function CoursesList({courseList} : CoursesListProps) {
  const router = useRouter()
  return (
    <View >
      <Text style={{fontFamily : 'outfit-bold', fontSize: 25}}>Courses</Text>
      <FlatList data={courseList} 
        horizontal = {true}
        showsHorizontalScrollIndicator = {false}
        renderItem={({item, index}) => (
          <TouchableOpacity key={index} style={styles.coursesContainer} 
            onPress={() => router.push({
              pathname: '/courseView',
              params: {
                courseParams: JSON.stringify(item)
              }
            })}>
            <Image source={imageAssets[item.banner_image]} style={{width:'100%', height: 150, borderRadius: 15}}></Image>
            <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 10}}>{item?.courseTitle}</Text>
            <View style={{display: 'flex', flexDirection:'row', alignItems:"center", marginTop: 5, gap: 2}}>
              <AntDesign name="book" size={24} color="black" />
              <Text style={{}}>{item?.chapters?.length} Chapters</Text>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
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