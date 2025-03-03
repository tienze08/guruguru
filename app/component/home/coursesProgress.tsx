import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { DocumentData } from 'firebase/firestore'
import { imageAssets } from '@/constants/Option'
import { Colors } from '@/constants/Colors'
import * as Progress from 'react-native-progress';

interface CoursesListProps {
  courseList : DocumentData[]
}

export default function CoursesProgress({courseList} : CoursesListProps) {
  return (
    <View>
      <Text style={{fontFamily : 'outfit-bold', fontSize: 25}}>Progress</Text>
      <FlatList data={courseList} 
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({index, item}) => (
        <View style={{backgroundColor: Colors.BG_GRAY, padding: 10, margin: 7, borderRadius: 15, width: 220}}>
          <View key={index} style={{display:'flex', flexDirection: 'row', gap: 8}}>
              <Image source={imageAssets[item.banner_image]} style={{width:60, height: 60, borderRadius: 15}}></Image>
              <View style={{flex:1}}>
                <Text numberOfLines={2} style={{fontWeight: 'bold', fontSize: 15, flexWrap:'wrap'}}>{item.courseTitle}</Text>
                <Text style={{fontWeight: '500', fontSize: 12}}>{item.chapters.length} chapters</Text>
              </View>
          </View>
          <View style={{marginTop: 10}}>
            <Progress.Bar progress={0} width={200} />
            <Text style={{marginTop: 2, fontFamily: 'outfit-bold'}}>3 Out of 5 Chapter Completerd</Text>
          </View>
        </View>
      )}></FlatList>
    </View>


  )
}