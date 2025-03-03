import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Button from '../shared/button'
import { useRouter } from 'expo-router'

export default function NoCourse() {
  const router = useRouter()

  return (
    <View style={{paddingTop: 40, alignItems: 'center'}}>
      <Image source={require('../../../assets/images/book.png')} style={{width: 200, height: 200}}></Image>
      <Text style={{fontSize: 20, fontFamily: 'outfit-bold'}}>You Don't Have Any Course</Text>
      <Button loading = {false} onPress={() => router.push('/addCourse')} text={'+ Create New Course'}></Button>
      <Button loading = {false} text={'Explore Existing Courses'} type='outline'></Button>
    </View>
  )
}