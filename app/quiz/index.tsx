import { View, Text, Image, Pressable, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import * as Progress from 'react-native-progress';
import Button from '../component/shared/button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';


export default function Quiz() {
    const { courseParams } = useLocalSearchParams();
    const course = JSON.parse(Array.isArray(courseParams) ? courseParams[0] : courseParams)
    const router = useRouter()
    const quiz = course.quiz
    const [selectOption, setSelectOption] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(0)
    const [result, setResult] = useState<Record<number, any>>({});
    const [loading, setLoading] = useState(false)

    const GetProgress = (currentPage: number) => {
      const perc = (currentPage/quiz.length)
      return perc
    }

    const OnOptionSelect = (selectChoice: number) => {
      const selectedAnswer = quiz[currentPage].options[selectChoice]; 
    
      setResult(prev => ({
        ...prev,
        [currentPage]: {
          userChoice: selectedAnswer, 
          isCorrect: selectedAnswer === quiz[currentPage].correctAns, 
          question: quiz[currentPage].question,
          correctAns: quiz[currentPage].correctAns
        }
      }));

      console.log(result)
    };
    

    const OnQuizFinish = async () => {
      setLoading(true)
      try {
        await updateDoc(doc(db, 'Courses', course.docId), {
          quizResult: result
        })
        setLoading(false)
      } catch {
        setLoading(false)
      }

      router.replace({
        pathname: '/quiz/summaryQuiz',
        params : {
          quizResultParam: JSON.stringify(result)
        }
      })
    }

  return (
    <View>
      <Image source={require('../../assets/images/wave.png')} style={{height: 800, width: '100%'}}/>

      <View style={{position: 'absolute', padding: 25, width: '100%'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
              <Pressable onPress={() => router.back()}>
                <Ionicons name="arrow-back-outline" size={35} color={Colors.WHITE} />
              </Pressable>
              <Text style={{fontFamily: 'outfit-bold', fontSize: 25, color: Colors.WHITE}}>{currentPage + 1} of {quiz.length}</Text>
          </View>

          <View style={{marginTop: 30}}>
            <Progress.Bar progress={GetProgress(currentPage)} width={Dimensions.get('window').width - 50} color={Colors.WHITE} height={10}/>
          </View>
          
          <View style={{padding: 20, backgroundColor: Colors.WHITE, marginTop: 30, height: Dimensions.get('window').height*0.6, elevation: 1, borderRadius: 10}}>
            <Text style={{fontSize: 25, fontFamily: 'outfit-bold', textAlign: 'center'}}>{quiz[currentPage].question}</Text>

            {quiz[currentPage].options.map((item: any, index: number) => (
                <TouchableOpacity onPress={() => {setSelectOption(index); OnOptionSelect(index)}} key={index} style={{padding: 20, borderWidth: 0.3, borderRadius: 15, marginTop: 16, backgroundColor: selectOption == index ? Colors.LIGHT_GREEN : undefined, borderColor: selectOption == index ? Colors.GREEN : undefined}}>
                    <Text style={{fontFamily: 'outfit', fontSize: 20}}>{item}</Text>
                </TouchableOpacity>
            ))}
          </View>

          {(selectOption !== null && quiz.length - 1 > currentPage )&& (
            <Button 
              text={'Text'} 
              type='fill' 
              loading={false} 
              onPress={() => {
                setCurrentPage(currentPage + 1);
                setSelectOption(null);

              }} 
            />
          )}

          {(selectOption !== null && quiz.length - 1 === currentPage) && (
            <Button onPress={OnQuizFinish} text={'Finish'} type='fill' loading={loading} />
          )}
      </View>
    </View>
  )
}