import { View, Text, FlatList, Image, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { doc, DocumentData, setDoc } from 'firebase/firestore'
import { imageAssets } from '@/constants/Option'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import Button from '../shared/button'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router'
import { UserDetailContext } from '@/app/context/userDetailContext'
import { db } from '@/config/firebaseConfig'

interface CoursesViewProps {
  course : DocumentData
  enroll?: boolean
}

export default function Intro({ course, enroll }: CoursesViewProps) {
    const router = useRouter()

    console.log(enroll)
    const [loading, setLoading] = React.useState(false)
    const {userDetail, setUserDetail} = useContext(UserDetailContext)
    console.log(userDetail)
    const onEnrollCourse = async () => {
        const docId = Date.now().toString();
        setLoading(true)
        const data = {
          ...course,  
          createdBy: userDetail?.email,
          createdAt: new Date(),
          enrolled : true
        }
        await setDoc(doc(db, 'Courses', docId), data)
        router.push({
          pathname: '/courseView',
          params: {
            courseParams: JSON.stringify(data),
            enroll: false
          }
        })
        setLoading(false)
    }

    return (
      <View>
        <FlatList 
          data={[course]}
          renderItem={({ item }) => (
            <View style={{display: 'flex', flexDirection: 'column'}}>
                <Image 
                source={imageAssets[item.banner_image]} 
                style={{ width: '100%', height: 280 }}
                />
                <Text style={{fontSize: 25, fontWeight: 'bold', margin: 10}}>{item.courseTitle}</Text>
                <View style={{display: 'flex', flexDirection:'row', alignItems:"center", marginLeft: 10, gap: 2}}>
                    <AntDesign name="book" size={24} color="black" />
                    <Text style={{fontSize: 20}}>{item?.chapters?.length} Chapters</Text>
                </View>
                <Text style={{fontSize: 20, fontWeight: 'bold', margin: 10}}>Descriptions:</Text>
                <Text style={{fontSize: 18, fontWeight: '500', margin: 10, color: Colors.GRAY, marginTop: 0}}>{item.description}</Text>
                <View style={{margin: 10, marginTop: 0}}>
                    {enroll == true ? <Button  text='Enroll Now' onPress={() => onEnrollCourse()} loading={false} ></Button> : <Button  text='Start Now' loading={false} ></Button>}
                </View>
                <Pressable style={{position: 'absolute', padding: 10}} onPress={() => router.back()}>
                    <FontAwesome name="arrow-left" size={30} color="black" />
                </Pressable>
            </View>
          )}
        />
      </View>
    );
  }
  