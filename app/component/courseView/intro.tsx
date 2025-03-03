import { View, Text, FlatList, Image, Pressable } from 'react-native'
import React from 'react'
import { DocumentData } from 'firebase/firestore'
import { imageAssets } from '@/constants/Option'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import Button from '../shared/button'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router'

interface CoursesViewProps {
  course : DocumentData
}

export default function Intro({ course }: CoursesViewProps) {
    const router = useRouter()
    return (
      <View>
        <FlatList 
          data={[course]}
          renderItem={({ item }) => (
            <View style={{display: 'flex', flexDirection: 'column'}}>
                <Image 
                source={imageAssets[item.banner_image]} 
                style={{ width: '100%', height: 280 }}
                />
                <Text style={{fontSize: 25, fontWeight: 'bold', margin: 10}}>{item.courseTitle}</Text>
                <View style={{display: 'flex', flexDirection:'row', alignItems:"center", marginLeft: 10, gap: 2}}>
                    <AntDesign name="book" size={24} color="black" />
                    <Text style={{fontSize: 20}}>{item?.chapters?.length} Chapters</Text>
                </View>
                <Text style={{fontSize: 20, fontWeight: 'bold', margin: 10}}>Descriptions:</Text>
                <Text style={{fontSize: 18, fontWeight: '500', margin: 10, color: Colors.GRAY, marginTop: 0}}>{item.description}</Text>
                <View style={{margin: 10, marginTop: 0}}>
                    <Button  text='Start Now' loading={false} ></Button>
                </View>
                <Pressable style={{position: 'absolute', padding: 10}} onPress={() => router.back()}>
                    <FontAwesome name="arrow-left" size={30} color="black" />
                </Pressable>
            </View>
          )}
        />
      </View>
    );
  }
  