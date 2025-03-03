import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import Intro from '../component/courseView/intro';
import { Colors } from '@/constants/Colors';
import Chapter from '../component/courseView/chapter';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useEffect, useState } from 'react';

export default function CourseView() {
  const { courseParams, courseId, refresh } = useLocalSearchParams();
  const [course, setCourse] = useState<DocumentData>({}); 

  useEffect(() => {
    if (!courseParams) { 
        GetCourseById(); // Nếu không có courseParams, tải từ Firebase
    } else {
        setCourse(typeof courseParams === 'string' ? JSON.parse(courseParams) : courseParams);
    }
  }, [courseId]);

  const GetCourseById = async () => {
    if (!courseId || Array.isArray(courseId)) return;
    const docRef = doc(db, 'Courses', courseId);
    const docSnap = await getDoc(docRef);
    setCourse(docSnap.exists() ? docSnap.data() : {});
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      {Object.keys(course).length > 0 ? ( 
        <>
          <Intro course={course} />
          <Chapter course={course} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
}
