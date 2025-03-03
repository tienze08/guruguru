import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { DocumentData } from 'firebase/firestore'
import { imageAssets } from '@/constants/Option'

import * as Progress from 'react-native-progress';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';


interface CoursesListProps {
  courseList : DocumentData[]
}

export default function CoursesProgress({courseList} : CoursesListProps) {

  const router = useRouter()

  const GetCompletedChapters = (course : any) => {
    const completedChapter = course?.completedChapter?.length
    const perc = completedChapter / course?.chapters?.length
    return perc
  }

  return (
      <View>
        <Text style={{fontFamily : 'outfit-bold', fontSize: 25, color: Colors.WHITE}}>Progress</Text>
        <FlatList data={courseList} 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({index, item}) => (
          <TouchableOpacity style={{backgroundColor: Colors.BG_GRAY, padding: 10, margin: 7, borderRadius: 15, width: 220}}
            onPress={() => router.push({
              pathname: '/courseView',
              params: {
                courseParams: JSON.stringify(item)
              }
            })}
          >
            <View key={index} style={{display:'flex', flexDirection: 'row', gap: 8}}>
                <Image source={imageAssets[item.banner_image]} style={{width:60, height: 60, borderRadius: 15}}></Image>
                <View style={{flex:1}}>
                  <Text numberOfLines={2} style={{fontWeight: 'bold', fontSize: 15, flexWrap:'wrap'}}>{item.courseTitle}</Text>
                  <Text style={{fontWeight: '500', fontSize: 12}}>{item.chapters.length} chapters</Text>
                </View>
            </View>
            <View style={{marginTop: 10}}>
              <Progress.Bar progress={GetCompletedChapters(item)} width={200} />
              <Text style={{marginTop: 2, fontFamily: 'outfit-bold'}}>{item.completedChapter.length ?? 0} Out of {item.chapters.length} Chapter Completerd</Text>
            </View>
          </TouchableOpacity>
        )}></FlatList>
      </View>
  )
}
      