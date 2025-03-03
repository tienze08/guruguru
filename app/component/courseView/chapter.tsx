import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import React from 'react'
import { DocumentData } from 'firebase/firestore'
import { Colors } from '@/constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

interface CoursesViewProps {
  course : DocumentData
}

export default function Chapter({ course }: CoursesViewProps) {
    const router = useRouter()

    const isChapterCompleted = (index : number) => {
      const isCompleted = course?.completedChapter.find((item : number) => item == index)
      return isCompleted?true:false
    }
  return (
    <View>
      <Text style={{fontSize: 20, fontWeight: 'bold', margin: 10, marginTop: 0}}>Chapter:</Text>
      <FlatList 
          data={course.chapters}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={{display: 'flex', flexDirection: 'row', padding: 10, borderWidth: 1, borderBlockColor: Colors.BLACK, margin: 10, marginTop: 0, borderRadius: 10, justifyContent: 'space-between', alignItems: 'center'}}
              onPress={() => router.push({
                pathname: '/chapterView',
                params: {
                  chapterParams: JSON.stringify(item),
                  docId: course.docId,
                  chapterIndex: index
                }
              })}>
                <View style={{display: 'flex', flexDirection:'row', gap: 10}}>
                    <Text style={{fontSize: 18, fontWeight: '500'}}>{index+1}.</Text>
                    <Text style={{fontSize: 18, fontWeight: '500'}}>{item.chapterName}</Text>
                </View>
                {isChapterCompleted(index) ? <Entypo name="check" size={24} color={Colors.GREEN} /> : <FontAwesome name="play" size={20} color="black" />}
            </TouchableOpacity>
          )}
        />
    </View>
  )
}