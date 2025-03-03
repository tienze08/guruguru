import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'

import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '../component/shared/button';
import { Colors } from '@/constants/Colors';

type QuizResultType = {
    [key: string]: {
      isCorrect: boolean;
      question: string;
      correctAns: string
    };
  };

export default function SummanyQuiz() {
    const { quizResultParam } = useLocalSearchParams();
    const quizResult: QuizResultType = JSON.parse(
        Array.isArray(quizResultParam) ? quizResultParam[0] : quizResultParam
    );
    const [correctAns, setCorrectAns] = useState(0)
    const [totalQuestion, setTotalQuestion] = useState(0)
    const router = useRouter()

    useEffect(() => {
        CalculateResult()
    }, [quizResult])

    const CalculateResult = () => {
        if(quizResult !== undefined) {
            const correctAns_ = Object.entries(quizResult)?.filter(([key, value]) => value?.isCorrect == true)

            const totalQues_ = Object.keys(quizResult).length

            setCorrectAns(correctAns_.length)
            setTotalQuestion(totalQues_)
        }
    }

    const GetPercMark = () => {
        return ((correctAns/totalQuestion) * 100).toFixed(0)
    }

    console.log(quizResult)
    console.log(GetPercMark())
  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View>
          <Image style={{width:'100%', height: 700}} source={require('./../../assets/images/wave.png')}></Image>
          <View style={{position: 'absolute', width: '100%', padding: 35}}>
            <Text style={{fontWeight: 700, fontSize: 30, color: Colors.WHITE,textAlign: 'center', alignItems: 'center', marginBottom: 30}}>Quiz Summary</Text>
            <View style={{backgroundColor: Colors.WHITE, padding: 20, borderRadius: 20, marginTop: 30, alignItems: 'center'}}>
                <Image source={require('./../../assets/images/trophy.png')} style={{width: 100, height: 100, marginTop: -60}}></Image>
                <Text style={{fontSize: 26, fontFamily: 'outfit-bold', fontWeight: '600'}}>{Number(GetPercMark()) > 60 ? 'Congratulations' : 'Try Again!'}</Text>
                <Text style={{fontSize: 17, fontFamily: 'outfit', fontWeight: '500', color: Colors.GRAY, paddingTop: 5}}>Your gave {GetPercMark()}% correct Answer</Text>
                
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultText}>Q {totalQuestion}</Text>
                </View>
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultText}><AntDesign name="check" size={24} color={Colors.GREEN} /> {correctAns}</Text>
                </View>
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultText}><AntDesign name="close" size={24} color={Colors.RED} /> {totalQuestion - correctAns}</Text>
                </View>
              </View>
            </View>
            
            <Button onPress={() => router.replace('/(menu)/home')} text={'Back To Home'} type={'fill'} loading={false}></Button>
            <View style={{marginTop: 25, flex: 1}}>
              <Text style={{fontFamily: 'outfit-bold', fontWeight: 'bold', fontSize: 25}}>Summery:</Text>
              <FlatList data={Object.entries(quizResult)}
                renderItem={({item, index}) => {
                  const quizItem = item[1];
                  return (
                    <View style={{padding: 15, borderWidth: 1, marginTop: 5, borderRadius: 15,
                      backgroundColor: quizItem?.isCorrect == true ? Colors.LIGHT_GREEN : Colors.LIGHT_RED,
                      borderColor: quizItem?.isCorrect == true ? Colors.LIGHT_GREEN : Colors.LIGHT_RED,
                    }}>
                      <Text style={{fontFamily: 'outfit-bold', fontSize: 20}}>{quizItem.question}</Text>
                      <Text style={{fontFamily: 'outfit-bold', fontSize: 15}}>Ans: {quizItem.correctAns}</Text>
                    </View>
                  )
                }}>       
              </FlatList>
            </View>
          </View>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  resultTextContainer: {
    padding: 15, 
    backgroundColor: Colors.WHITE,
    elevation: 1,
    marginRight: 10,
    borderWidth: 0.1,
    borderRadius: 10
  },
  resultText: {
    fontFamily: 'outfit',
    fontSize: 20
  }
})