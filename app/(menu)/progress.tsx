import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import React from 'react';

export default function Progress() {
  const courses = [
    { id: '1', title: 'React Native Basics', progress: 0.8, image: require('../../assets/images/banner1.png') },
    { id: '2', title: 'Advanced React Native', progress: 0.5, image: require('../../assets/images/banner2.png') },
    { id: '3', title: 'State Management with Redux', progress: 0.3, image: require('../../assets/images/banner3.png') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 Course Progress</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Image source={item.image} style={styles.courseImage} />
            <Text style={styles.courseTitle}>{item.title}</Text>
            <View style={styles.progressContainer}>
              <ProgressBar progress={item.progress} color={item.progress > 0.7 ? '#4CAF50' : item.progress > 0.4 ? '#FFC107' : '#F44336'} style={styles.progressBar} />
              <Text style={[styles.progressText, { color: item.progress > 0.7 ? '#4CAF50' : item.progress > 0.4 ? '#FFC107' : '#F44336' }]}>
                {Math.round(item.progress * 100)}% Completed
              </Text>
            </View>
          </View>
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#007BFF',
  },
  courseItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  courseImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ddd',
  },
  progressText: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
