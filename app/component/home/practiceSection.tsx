import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { PraticeOption } from '@/constants/Option'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function PracticeSection() {

  const router = useRouter()

  return (
    <View>
      <Text style={{fontFamily : 'outfit-bold', fontSize: 25}}>Practice</Text>
      <FlatList data={PraticeOption}
        numColumns={3}
        renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => router.push(`/practice/${item.name}`)} key={index} style={{flex:1, margin:5, aspectRatio: 1}}>
                <Image source={item?.image} style={{width: '100%', height: '100%', maxHeight: 160, borderRadius: 15}}></Image>
                <Text style={{position : 'absolute', padding: 8, fontFamily: 'outfit', fontSize: 12, color: Colors.WHITE}}>{item?.name}</Text>
            </TouchableOpacity >
         )}
      ></FlatList>
    </View>
  )
}