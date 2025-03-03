import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

import { useLocalSearchParams, useRouter } from 'expo-router'

import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Colors } from '@/constants/Colors'


export default function index() {
    const {courseParams} = useLocalSearchParams()
    const course = JSON.parse(Array.isArray(courseParams) ? courseParams[0] : courseParams)
    const qaList = course?.qa
    const [selectedQuestion, setSelectedQuestion] = useState<number | null>(0);
    console.log(course)
    const router = useRouter()

    const OnQuestionSelect = (index: number) => {
        if(selectedQuestion == index) {
            setSelectedQuestion(null)
        } else {
            setSelectedQuestion(index)
        }
    }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={require('../../assets/images/wave.png')} style={{height: 800, width: '100%'}}/>

        <View style={{position: 'absolute', padding: 25, width: '100%'}}>
            <View style={{flexDirection: 'row',gap: 10, alignItems: 'center'}}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back-outline" size={35} color={Colors.WHITE} />
                </Pressable>
                <Text style={{fontFamily: 'outfit', fontSize: 30, color: Colors.WHITE}}>Question & Anwsers</Text>
            </View>

            <Text style={{fontFamily: 'outfit-bold', fontSize: 25, color: Colors.WHITE, margin: 10}}>{course?.courseTitle}</Text>

            <FlatList 
                data = {qaList}
                renderItem = {({index, item}) => (
                    <Pressable style={styles.card} onPress={() => OnQuestionSelect(index)}>
                        <Text style={{fontFamily: 'outfit', fontSize: 20}}>{item?.question}</Text>
                        {selectedQuestion == index &&
                            <View style={{borderTopWidth: 0.4, marginVertical: 10}}>
                                <Text style={{fontFamily: 'outfit-bold', fontSize: 17, marginTop: 10, color: Colors.GREEN}}>{item?.answer}</Text>
                            </View>
                        }
                    </Pressable>
                )}>
                
            </FlatList>
        </View>

        
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        marginTop: 10
    }
})