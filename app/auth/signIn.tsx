import { auth, db } from '@/config/firebaseConfig';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { ActivityIndicator, Alert, Image, Platform, Pressable, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { UserDetailContext } from '../context/userDetailContext';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {userDetail, setUserDetail} = useContext(UserDetailContext)
  const [loading, setLoading] = useState(false)

  const onSignInClick = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(async(resp) => {
        const user = resp.user;
        console.log(user);
        await getUserDetail()
        setLoading(false)
        router.replace('/(menu)/home');
      })
      .catch(e => {
        console.log(e);
        if (Platform.OS === 'android') {
          ToastAndroid.show('Incorrect Email & Password', ToastAndroid.SHORT);
        } else {
          Alert.alert('Error', 'Incorrect Email & Password');
        }
      });
  };

  const getUserDetail = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', email));
  
      if (userDoc.exists()) {
        console.log("User Data:", userDoc.data());
        setUserDetail(userDoc.data()); 
      } else {
        console.log("No user data found!");
        setUserDetail(null); 
        if (Platform.OS === 'android') {
          ToastAndroid.show("User data not found!", ToastAndroid.SHORT);
        } else {
          Alert.alert("Error", "User data not found!");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (Platform.OS === 'android') {
        ToastAndroid.show("Failed to get user details", ToastAndroid.SHORT);
      } else {
        Alert.alert("Error", "Failed to get user details");
      }
    }
  };

    return (
        <View style = {styles.container}>
          <Image style = {styles.Image} source={require('../../assets/images/logo.png')}></Image>
          <Text style = {{fontWeight: 'bold', fontSize: 25}}>Create New Account</Text>
  
          <TextInput placeholder='Email' style = {styles.input} onChangeText={(value) => setEmail(value)}></TextInput>
          <TextInput placeholder='Password' style = {styles.input} onChangeText={(value) => setPassword(value)} secureTextEntry={true}></TextInput>
  
          <TouchableOpacity disabled={loading} style = {styles.button} onPress={onSignInClick}>
            {!loading? <Text style={{ color: Colors.WHITE, fontSize: 18, fontWeight: '500', textAlign: 'center' }}>
              Sign In
            </Text> : <ActivityIndicator size={'large'} color={Colors.WHITE}/>}
          </TouchableOpacity>
          <View style={styles.signIn}>
            <Text style={{fontFamily: 'outfit'}}>Don't have an account?</Text>
            <Pressable >
              <Text style={{fontFamily: 'outfit-bold' , color: Colors.PRIMARY}} onPress={() => router.push('/auth/signUp')}>Create New Here</Text>
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
