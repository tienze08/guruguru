import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import Button from '../component/shared/button'
import { Colors } from '@/constants/Colors'
import Prompt from '@/constants/Prompt'
import { GenerateCourseAIModel, GenerateTopicsAIModel } from '@/config/AIModel'
import { doc, setDoc } from 'firebase/firestore'
import { UserDetailContext } from '../context/userDetailContext'
import { db } from '@/config/firebaseConfig'
import { useRouter } from 'expo-router'

export default function AddCourse() {
  const [loading, setLoading] = useState(false)
  const {userDetail, setUserDetail} = useContext(UserDetailContext)
  const [userInput, setUserInput] = useState<any>('')
  const [listTopic, setListTopic] = useState([])
  const router = useRouter()
  const [selectTopic, setSelectTopic] = useState<string[]>([])
  const onGenerateTopic = async() => {
    setLoading(true)
    const PROMPT = userInput + Prompt.IDEA
    const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT)
    const topicIdea = JSON.parse(aiResp.response.text())
    console.log(topicIdea)
    setListTopic(topicIdea)
    setLoading(false)
  }

  const onTopicSelect = (topic: string) => {
    if (selectTopic.includes(topic)) {
      setSelectTopic(prev => prev.filter(item => item !== topic));
    } else {
      setSelectTopic(prev => [...prev, topic]);
    }
  };

  const isTopicSelected = (topic : string) => {
    const selection = selectTopic.find(item => item == topic)
    return selection?true:false
  }

  const onGenerateCourse = async () => {
    setLoading(true)
    const PROMPT = selectTopic + Prompt.COURSE
    try {
      const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT)
      const courses = JSON.parse(aiResp.response.text())
      console.log(courses)
      courses?.forEach(async (course : []) => {
        await setDoc(doc(db, 'Courses', Date.now().toString()), {
          ...course,
          createdOn: new Date(),
          createdBy: userDetail?.email
        })
      })
      router.push('/(menu)/home')
      setLoading(false)
   }
    catch(e) {
      setLoading(false)
    }
  }
  return (
    <ScrollView style = {{padding: 15 , backgroundColor: Colors.WHITE, flex: 1}}>
      <Text style = {{fontSize: 27, fontWeight: 'bold'}}>Create New Course</Text>
      <Text style = {{fontSize: 25, fontWeight: '500'}}>What you want to learn today?</Text>
      <Text style = {{fontSize: 17, fontWeight: '400', color: '#858585'}}>What course you want to create(ex.Learn Python, Digital Marketting, 10Th Science Chapters, etc...)</Text>
      <TextInput onChangeText={(value) => setUserInput(value)} style = {{borderWidth: 1, borderColor: '#858585', padding: 15, marginTop: 10, borderRadius: 10, fontSize: 14, paddingBottom: 40}} placeholder='(Ex. Learn Python, Learn 12th Chemistry)'></TextInput>
      <Button text={'Generate Topic'} type = 'outline' loading={loading} onPress={onGenerateTopic}></Button>
      <View style={{marginTop: 15}}>
        <Text style={{fontFamily: 'outfit', fontSize: 20}}>Select all topics which you want to add in the course</Text>
        <View style={{
          display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 6
        }}>
          {listTopic.map((item, index) => (
            <Pressable key={index} onPress = {() => onTopicSelect(item)}>
              <Text 
                style={{padding: 7, borderWidth: 0.4, borderRadius: 99, paddingHorizontal: 15, 
                backgroundColor: isTopicSelected(item)?Colors.PRIMARY:undefined,
                color: isTopicSelected(item)?Colors.WHITE:Colors.PRIMARY}}>
              {item}</Text>
            </Pressable>
          ))}
        </View>

        {listTopic.length > 0 ? <Button text={'Generate Course'} loading={loading} onPress={onGenerateCourse}></Button> : undefined}
      </View>
      
    </ScrollView>
  )
}