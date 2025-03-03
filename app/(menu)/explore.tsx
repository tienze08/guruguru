import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';

export default function Explore() {
  const allCourses = [
    { id: '1', title: 'React Native Basics', image: require('../../assets/images/banner1.png') },
    { id: '2', title: 'Advanced React Native', image: require('../../assets/images/banner2.png') },
    { id: '3', title: 'State Management with Redux', image: require('../../assets/images/banner3.png') },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(allCourses);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filteredData = allCourses.filter((course) =>
        course.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCourses(filteredData);
    } else {
      setFilteredCourses(allCourses);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Courses</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search courses..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.courseItem}>
            <Image source={item.image} style={styles.courseImage} />
            <Text style={styles.courseTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
  },
  courseItem: {
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: 150,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 10,
    textAlign: 'center',
  },
});
