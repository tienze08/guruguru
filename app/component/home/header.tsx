import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { UserDetailContext } from '@/app/context/userDetailContext'

export default function Header() {
  const {userDetail, setUserDetail} = useContext(UserDetailContext)
  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <View>
        <Text style={{fontFamily: 'outfit-bold', fontSize: 25}}>Hello, {userDetail?.name}</Text>
        <Text style={{fontFamily: 'outfit', fontSize: 17}}>Let's Get Started!</Text>
      </View>
      <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}>
        <Ionicons name="settings-outline" size={35} color="black" />
      </TouchableOpacity>
    </View>
  )
}