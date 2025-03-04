import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useContext } from 'react';
import { ProfileMenu } from '@/constants/Option';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth, signOut } from 'firebase/auth';
import { Colors } from '@/constants/Colors';
import { UserDetailContext } from '../context/userDetailContext';

export default function ProfileScreen() {
  const router = useRouter();
  const auth = getAuth();

  const { userDetail } = useContext(UserDetailContext);

  const handlePress = async (path: string | undefined, name: string) => {
    if (name === 'Logout') {
      try {
        await signOut(auth);
        router.replace('/auth/signIn'); 
      } catch (error) {
        console.error('Logout failed:', error);
      }
    } else if (path) {
      router.push(path as any);  
    }
  };

  
  

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Profile</Text>
        <Image style={styles.image} source={require('../../assets/images/logo.png')} />
        <Text style={styles.userInfo}>{userDetail?.name}</Text>
        <Text style={styles.userInfo}>{userDetail?.email}</Text>

        <FlatList
          data={ProfileMenu}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handlePress(item.path, item.name)}
              activeOpacity={0.7} 
            >
              <View style={styles.iconContainer}>
                <Ionicons name={item.icon} size={24} color={Colors.PRIMARY} />
              </View>
              <Text style={styles.menuText}>{item.name}</Text>
              <Ionicons name="chevron-forward-outline" size={24} color={Colors.GRAY} />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  profileContainer: {
    margin: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  image: {
    width: 180,
    height: 180,
  },
  userInfo: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
  },
  menuContainer: {
    marginTop: 30,
    gap: 40,
    alignItems: 'flex-start',
    width: "100%",
    paddingLeft: 20, 
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12, 
    marginBottom: 10, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    flex: 1, 
  },
  separator: {
    height: 10, 
  },
});