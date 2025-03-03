import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions, NativeSyntheticEvent, NativeScrollEvent, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import FlipCard from 'react-native-flip-card'
import * as Progress from 'react-native-progress';
import { Colors } from '@/constants/Colors';


export default function Flashcards() {
  const {courseParams} = useLocalSearchParams()
  const course = JSON.parse(Array.isArray(courseParams) ? courseParams[0] : courseParams)
  const flashcards = course.flashcards
  const [currentPage, setCurrentPage] = useState(0)
  const router = useRouter()
  const { width } = Dimensions.get('window');

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round((event?.nativeEvent.contentOffset.x) / Dimensions.get('window').width)
    setCurrentPage(index)
  }

  const GetProgress = (currentPage: number) => {
    const perc = (currentPage/flashcards.length)
    return perc
  }

  return (
    <View>
      <Image source={require('../../assets/images/wave.png')} style={{height: 800, width: '100%'}}/>

      <View style={{position: 'absolute', padding: 25, width: '100%'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Pressable onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={35} color={Colors.WHITE} />
          </Pressable>
          <Text style={{fontFamily: 'outfit-bold', fontSize: 25, color: Colors.WHITE}}>{currentPage + 1} of {flashcards.length}</Text>
        </View>

        <View style={{marginTop: 30}}>
          <Progress.Bar progress={GetProgress(currentPage)} width={Dimensions.get('window').width - 50} color={Colors.WHITE} height={10}/>
        </View>

        <FlatList 
          data={flashcards}
          horizontal = {true}
          pagingEnabled
          onScroll={onScroll}
          showsHorizontalScrollIndicator = {false}
          renderItem={({index, item}) => (
            <View key={index} style={{height: 500, marginTop: 100}}>
              <FlipCard style={styles.flipCard}>
                {/* Face Side */}
                <View style={styles.face}>
                  <Text style={{fontFamily: 'outfit', padding: 20, fontSize: 28,}}>{item.front}</Text>
                </View>
                {/* Back Side */}
                <View style={styles.back}>
                  <Text style={{width: Dimensions.get('screen').width * 0.78, fontFamily: 'outfit', padding: 20, fontSize: 28, textAlign: 'center', color: Colors.WHITE}}>
                    {item.back}
                  </Text>
                </View>
              </FlipCard>
            </View>
          )}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flipCard: {
    width: Dimensions.get('screen').width * 0.78,
    height: 400,
    backgroundColor: Colors.WHITE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: Dimensions.get('screen').width * 0.05
  }, 
  face : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }, 
  back: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20
  }
});
