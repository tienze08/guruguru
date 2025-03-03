import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import { PraticeOption } from '@/constants/Option'
import { Colors } from '@/constants/Colors'

export default function PracticeSection() {
  return (
    <View>
      <Text style={{fontFamily : 'outfit-bold', fontSize: 25}}>Practice</Text>
      <FlatList data={PraticeOption}
        numColumns={3}
        renderItem={({item, index}) => (
            <View key={index} style={{flex:1, margin:5, aspectRatio: 1}}>
                <Image source={item?.image} style={{width: '100%', height: '100%', maxHeight: 160, borderRadius: 15}}></Image>
                <Text style={{position : 'absolute', padding: 8, fontFamily: 'outfit', fontSize: 12, color: Colors.WHITE}}>{item?.name}</Text>
            </View>
         )}
      ></FlatList>
    </View>
  )
}