import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS } from 'react'
import * as Progress from 'react-native-progress';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { imageAssets } from '@/constants/Option';
import { DocumentData } from 'firebase/firestore';

interface CourseProgressCardProps {
    item: DocumentData;
    index: number;
    width?: number;
    textSize?: number;
  }

export default function CourseProgressCard({index, item, width = 220, textSize = 15} : CourseProgressCardProps) {

    const router = useRouter()
    
    const GetCompletedChapters = (course : any) => {
        const completedChapter = course?.completedChapter?.length
        const perc = completedChapter / course?.chapters?.length
        return perc
    }

  return (
    <View>
      <TouchableOpacity style={{backgroundColor: Colors.BG_GRAY, padding: 10, margin: 7, borderRadius: 15, width: width}}
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
                  <Text numberOfLines={2} style={{fontWeight: 'bold', fontSize: textSize, flexWrap:'wrap'}}>{item.courseTitle}</Text>
                  <Text style={{fontWeight: '500', fontSize: textSize - 2}} >{item.chapters.length} chapters</Text>
                </View>
            </View>
            <View style={{marginTop: 10}}>
              <Progress.Bar progress={GetCompletedChapters(item)} width={width - 30} />
              <Text style={{marginTop: 2, fontFamily: 'outfit-bold'}}>{item.completedChapter.length ?? 0} Out of {item.chapters.length} Chapter Completerd</Text>
            </View>
          </TouchableOpacity>
    </View>
  )
}