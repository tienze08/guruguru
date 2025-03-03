import { auth, db } from '@/config/firebaseConfig';
import { Colors } from '@/constants/Colors';
import { router, useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserDetailContext } from '../context/userDetailContext';

export default function HomeScreen() {
  const router = useRouter()
  const {userDetail, setUserDetail} = useContext(UserDetailContext)

  onAuthStateChanged(auth, async(user) => {
    if(user) {
      console.log(user)
      if (user?.email) {
        const result = await getDoc(doc(db, 'users', user.email));
        setUserDetail(result.data());
        router.replace('/(menu)/home');
      }
    }
  })

  return (
    <View style = {styles.container}>
      <Image source={require('../../assets/images/landing.png')} style = {styles.image}/>
      
      <View style = {styles.context}>
        <Text style = {{color: Colors.WHITE, fontSize: 35, fontFamily: 'outfit', marginTop: 20, textAlign: 'center'}}>Welcome to Coaching Guru</Text>
        <Text style = {{color: Colors.WHITE, fontSize: 20, fontFamily: 'outfit-bold', marginTop: 20, textAlign: 'center'}}>Transform your ideas into engaging educational content, effortlessly with AI! 📚🤖</Text>

        <TouchableOpacity style = {styles.button} onPress={() => router.push('/auth/signIn')}>
          <Text style = {[styles.buttonText, {color: Colors.PRIMARY}]}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {[styles.button , {backgroundColor: Colors.PRIMARY}] } onPress={() => router.push('/auth/signUp')}>
          <Text style = {[styles.buttonText]}>Already have an Account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.WHITE
    },
    image: {
      width: '100%' , 
      height: 300,
      marginTop: 100
    },
    context: {
      flex: 1,
      backgroundColor: Colors.PRIMARY,
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      paddingHorizontal: 10
    },
    button: {
      padding: 15,
      backgroundColor: Colors.WHITE,
      borderRadius: 20,
      marginTop: 30,
      borderWidth: 1,
      borderColor: Colors.WHITE
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 20,
      color: Colors.WHITE
    }
  },
);
