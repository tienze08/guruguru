import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { DocumentData } from 'firebase/firestore';
import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';

interface CourseListGridProps {
  courseList: DocumentData[];
  option: DocumentData;
}

export default function CourseListGrid({ courseList, option }: CourseListGridProps) {
  const router = useRouter()

  const onPress = (course: DocumentData) => {
      router.push({
        pathname: option.path,
        params : {
          courseParams: JSON.stringify(course)
        }
      })
  }

  return (
    <View>
      <FlatList 
        data={courseList} 
        numColumns={2} 
        style={{ padding: 20 }} 
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => onPress(item)} key={index} style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 15, backgroundColor: Colors.WHITE, margin: 7, borderRadius: 15, elevation: 1, minHeight: 180}}>
            <AntDesign name="checkcircle" size={24} color={Colors.GRAY} style={{position: 'absolute', top: 10, right: 20}}/>
            <Image source={option?.icon} style={{ width: '100%', height: 70  }} resizeMode="contain" />
            <Text style={{textAlign: 'center', fontFamily: 'bold', marginTop: 10}}>{item.courseTitle}</Text>
          </TouchableOpacity>
        )}
      />  
    </View>
  );
}
