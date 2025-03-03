import { Colors } from '@/constants/Colors'
import { router, useRouter } from 'expo-router'
import React, { useContext, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {createUserWithEmailAndPassword, User} from 'firebase/auth'
import {auth, db} from '../../config/firebaseConfig'
import { setDoc, doc } from 'firebase/firestore'
import { UserDetailContext } from '../context/userDetailContext'

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const {userDetail, setUserDetail} = useContext(UserDetailContext)

  const CreateNewAccount = () => {
    if (!email.includes('@')) {
      console.log('Invalid email format');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then(async(resp) => {
      const user = resp.user
      console.log(user)
      await SaveUser(user)
    })
    .catch(e => {
      console.log(e.message)
    })
  }

  const SaveUser = async(user: User) => {
    const data = {
      name: fullName,
      email: email,
      member: false,
      uid: user?.uid
    }

    await setDoc(doc(db, 'users', email), data)

    setUserDetail(data)
  }

  return (
      <View style = {styles.container}>
        <Image style = {styles.Image} source={require('../../assets/images/logo.png')}></Image>
        <Text style = {{fontWeight: 'bold', fontSize: 25}}>Create New Account</Text>

        <TextInput placeholder='Full Name' style = {styles.input} onChangeText={(value) => setFullName(value)}></TextInput>
        <TextInput placeholder='Email'onChangeText={(value) => setEmail(value)} style = {styles.input} ></TextInput>
        <TextInput placeholder='Password'onChangeText={(value) => setPassword(value)} style = {styles.input} secureTextEntry={true}></TextInput>

        <TouchableOpacity onPress={CreateNewAccount} style={styles.button}>
          <Text style={{ color: Colors.WHITE, fontSize: 18, fontWeight: '500', textAlign: 'center' }}>
            Create Account
          </Text>
        </TouchableOpacity>
        <View style={styles.signIn}>
          <Text style={{fontFamily: 'outfit'}}>Already have an account?</Text>
          <Pressable >
            <Text style={{fontFamily: 'outfit-bold' , color: Colors.PRIMARY}} onPress={() => router.push('/auth/signIn')}>Sign In Here</Text>
          </Pressable>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  Image: {
    width: 180,
    height: 180
  },
  container: {
    display : 'flex',
    alignItems: 'center',
    paddingTop: 50,
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 15
  },
  input: {
    borderWidth: 1,
    width: '100%',
    marginTop: 10,
    fontSize: 18,
    padding: 15,
    borderRadius: 10
  },
  button: {
    padding: 15,
    width: '100%',
    fontSize: 18,
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    textAlign: 'center',
    margin: 20,
    fontWeight: '500'
  },
  signIn: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  }
})
