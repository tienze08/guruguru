import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Colors } from '@/constants/Colors'
import { UserDetailContext } from '@/app/context/userDetailContext'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';

export default function Profile() {

  const router = useRouter()

  const menuItems = [
    { title: "Add Course", icon: "plus", routers: "addCourse" },
    { title: "My Courses", icon: "book-open", routers: "home" },
    { title: "Course Progress", icon: "chart-line", routers: "progress" },
    { title: "My Subscription", icon: "life-ring", routers: "" },
    { title: "Logout", icon: "right-from-bracket", routers: "" },
  ];


  const { userDetail } = useContext(UserDetailContext);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Profile</Text>
        <Image style={styles.image} source={require('../../assets/images/logo.png')} />
        <Text style={styles.userInfo}>{userDetail?.name}</Text>
        <Text style={styles.userInfo}>{userDetail?.email}</Text>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={() => router.push(item.routers)}>
              <View style={styles.iconContainer}>
                <FontAwesome6 name={item.icon} size={24} color="blue" />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>
    </View>
  )
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
    gap: 20,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: Colors.BG_GRAY,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
  },
});
