import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as Progress from 'react-native-progress';
import { Colors } from '@/constants/Colors';
import Button from '../component/shared/button';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

export default function ChapterView() {
    const {chapterParams, docId, chapterIndex} = useLocalSearchParams()
    const chapters = typeof chapterParams === "string" ? JSON.parse(chapterParams) : chapterParams

    console.log(docId)
    
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    
    const GetProgress = (currentPage: number) => {
        const perc = (currentPage / chapters?.content?.length)
        return perc
    }

    const onChapterFinish = async () => {
        setLoading(true);
        try {
            await updateDoc(doc(db, 'Courses', docId.toString()), {
                completedChapter: arrayUnion(chapterIndex)
            });
            setLoading(false);
            router.replace({
                pathname: '/courseView',
                params: { courseId: docId }
            });
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

  return (
    <View style={{padding: 25}}>
      <Progress.Bar progress={GetProgress(currentPage)} width={Dimensions.get('screen').width*0.85} />
      <View style={{marginTop: 20}}>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>{chapters?.content?.[currentPage]?.topic}</Text>
        <Text style={{fontFamily: 'bold', fontSize: 20, marginTop: 7}}>{chapters?.content?.[currentPage]?.explain}</Text>

        {chapters?.content?.[currentPage]?.code && (
            <Text style={[styles.codeExampleText, { backgroundColor: Colors.BLACK, color: Colors.WHITE }]}>
                {chapters?.content?.[currentPage]?.code}
            </Text>
        )}
        {chapters?.content?.[currentPage]?.example && (
            <Text style={styles.codeExampleText}>
                {chapters?.content?.[currentPage]?.example}
            </Text>
        )}
      </View>

      <View>
        {chapters?.content?.length-1 != currentPage ? <Button loading={false} text={'Next'} onPress={() => setCurrentPage(currentPage+1)}></Button> : <Button loading={false} text={'Finish'} onPress={() => onChapterFinish()}></Button>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    codeExampleText : {
        padding: 15,
        backgroundColor: Colors.BG_GRAY,
        borderRadius: 15,
        fontFamily: 'outfit',
        fontSize: 18,
        marginTop: 15
    }
})