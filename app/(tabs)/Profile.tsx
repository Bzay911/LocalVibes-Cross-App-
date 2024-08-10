import {Image, Pressable, View, Text, StyleSheet, Modal,TextInput, ScrollView}from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import UpcomingEvents from "@/components/UpcomingEvents";
import { useState } from "react";
import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useEffect } from 'react'
import {signOut} from '@firebase/auth'
import { useRouter, Link } from 'expo-router'
import { Ionicons } from "@expo/vector-icons";
import { DbContext } from "@/contexts/DbContext";
import { updateDoc, doc, getDoc, onSnapshot } from 'firebase/firestore';

export default function Profile(props: any){

    const db = useContext(DbContext)
    const auth = useContext(AuthContext)
    const router = useRouter()
    const [showTickets, setShowTickets] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
    const[modalVisible, setModalVisible] = useState(false)
    const[image, setImage] = useState('') // implement image when creating user table
    const[address, setAddress] = useState('')
    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[userEmail, setUserEmail] = useState('')

    const SignOutUser = () => {
        signOut( auth )
        .then(() => {
            router.replace('/')
        })
        .catch((error) => {
            console.log(error.code, error.message)
        })
    }
   
    // Function to handle press of show tickets
    const handleShowTickets = () => {
        setShowTickets(true)
        setShowFollowing(false)
    }

    // Function to handle press of show following
    const handleShowFollowing = () => {
        setShowTickets(false)
        setShowFollowing(true)
    }

    useEffect(() => {
      setAddress('')
      setImage('')
      setFirstName('')
      setLastName('')
    },[modalVisible])
  
    // Updating user details 
    const addData = async () => {
      const data = {
        userImage: image,
        userFirstName: firstName,
        userLastName: lastName,
        userAddress: address
      }
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, data);
    }

    // Fetching user profile details
    useEffect(() => {
        if (auth.currentUser) {
            const userDocRef = doc(db, "users", auth.currentUser.uid)
            const unsubscribe = onSnapshot(userDocRef, (doc) => {
                if (doc.exists()) {
                    const data = doc.data()
                    setAddress(data.userAddress)
                    setImage(data.userImage)
                    setFirstName(data.userFirstName)
                    setLastName(data.userLastName)
                    setUserEmail(data.userEmail)
                }
            });
            return () => unsubscribe()
        }
    }, [auth, db]);


    return(
        <ScrollView>

        <View style={styles.container}>

        {/* Add button */}
        <Pressable 
      style={styles.plusBtn}
      onPress={() => setModalVisible(true)}>
        <Text style={styles.plusBtnText}>
          <Ionicons name="add" size={26}></Ionicons>
        </Text>
      </Pressable>

            <View style={styles.imageContainer}>
            <Image 
            style ={styles.image}
            source={{uri:image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}
            contentFit="cover"
            />
            </View>
            
            <View style={styles.textContainer}>
            <Text style={styles.mainText}>{firstName + " " +lastName}</Text>
            <Text style={styles.subText}>{userEmail}</Text>
            <Text style={styles.subText}>{address}</Text>
            </View>

            <View style={styles.tabContainer}>

                <Pressable onPress={handleShowTickets}>
                <Text style={styles.subText}>My Tickets</Text>
                </Pressable>

                <Pressable onPress={handleShowFollowing}>
                <Text style={styles.subText}>Following</Text>
                </Pressable>

            </View>

            <UpcomingEvents />
          

            <View style={styles.signOut}>

            <Pressable onPress={() => SignOutUser()}>
                <Text style={styles.signOutTxt}>Sign Out</Text>
            </Pressable>
            </View>

            <Modal
      animationType="fade"
      transparent={false}
      visible={modalVisible}
      >
        <View style={styles.modal}>

          <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Set up your user details</Text>
          <Text style={styles.inputHeadertxt}>Profile picture</Text>
          <TextInput 
          value={image} 
          onChangeText={(val) => setImage(val)}
          style={styles.input}
          />
          <Text style={styles.inputHeadertxt}>First name</Text>
          <TextInput 
          value={firstName} 
          onChangeText={(val) => setFirstName(val)}
          style={styles.input}
          />
          <Text style={styles.inputHeadertxt}>Last name</Text>
          <TextInput 
          value={lastName} 
          onChangeText={(val) => setLastName(val)}
          style={styles.input}
          />
          <Text style={styles.inputHeadertxt}>Address</Text>
          <TextInput 
          value={address} 
          onChangeText={(val) => setAddress(val)}
          style={styles.input}
          />
            <Pressable 
            style={styles.addPostBtn} 
            onPress={() => {
              addData()
              setModalVisible(false)
            }
              }>
              <Text style={styles.addPostBtnText}>Update Profile</Text>
            </Pressable>
          </View>

          <Pressable style={styles.modalClose} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalText}>Close</Text>
          </Pressable>

        </View>
      </Modal>

        </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#050608",
        flex:1
    },
    iconContainer:{
        alignItems:"center",
        marginTop: 50
    },
    mainText:{
        color:"#FFFFFF",
        fontSize: 18,
        fontWeight:"bold"
    },
    subText:{
        color:"#FFFFFF",
        fontSize: 14,
    },
    textContainer:{
        alignItems:"center",
        marginTop: 15
    }, 
    tabContainer:{
        flexDirection:"row",
        margin: 25,
        gap:200,
        
    },
    content: {
        width: '80%',
        padding: 20,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
      },
      signOut:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: "#FF64A5",
        padding:15,
        margin:20,
        borderRadius:7
      },
      signOutTxt: {
        color:"#FFFFFF",
        fontWeight:"bold",
        fontSize:18
      },
      plusBtn:{
        backgroundColor: "#D6578C",
        borderRadius: 7,
        padding:15,
        width:60,
        height:60,
        position:"absolute",
        justifyContent:"center",
        alignItems:"center",
        right:20,
        top:20, 
        zIndex:999,
      },
      plusBtnText:{
        color:"white",
        fontSize:20
      },
      modal:{
        padding:20,
        // backgroundColor:"#050608",
        flex:1
      },
      modalText:{
        // color:"white"
      },
      modalClose:{
        position:"absolute",
        right:20,
        top:20
      },
      modalContainer:{
        // color:"white", 
        flex:1,
        marginVertical:50
      },
      addPostBtn:{
        backgroundColor: "#D6578C",
        borderRadius: 7,
        padding:15,
        width:"50%",
        alignItems:"center",
        alignSelf:"center"
      },
      addPostBtnText:{
        color:"white",
        fontSize:20
      },
      input: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#cccccc",
        padding: 6,
        marginBottom: 20,
        backgroundColor: "#efefef",
        borderRadius: 6,
    },
    inputHeadertxt:{
      marginBottom: 10,
    },
    imageContainer:{
        alignItems:"center",
        marginTop:35
    },
    image: {
        width: 150,  
        height: 150, 
        marginRight: 10,
        borderRadius:80,
        borderColor: "#FFFFFF",
        borderWidth: 1
      },

})
