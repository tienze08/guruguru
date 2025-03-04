import { Colors } from '@/constants/Colors';
import { CourseCategory } from '@/constants/Option';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import CourseListByCategory from '../component/explore/courseListByCategory';

export default function Explore() {

  return (
    <FlatList renderItem={() => null} style={{flex: 1, backgroundColor: Colors.WHITE}} data={[]} 
      ListHeaderComponent={
        <View style={{flex: 1, backgroundColor: Colors.WHITE, padding: 20}}>
          <Text style={{fontSize: 30, fontFamily:'outfit'}}>Explore More Courses</Text>
          {CourseCategory.map((item, index) => (
            <View style={{marginTop: 10}} key={index}>
              <CourseListByCategory category={item}/>
            </View>
          ))}
        </View>
      }
    ></FlatList>
  );
}



