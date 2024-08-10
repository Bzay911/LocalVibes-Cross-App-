import { Pressable, View, Text, StyleSheet, Modal,TextInput, ScrollView}from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import UpcomingEvents from "@/components/UpcomingEvents";
import { useState } from "react";
import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useEffect } from 'react'
import {signOut} from '@firebase/auth'
import { useRouter, Link } from 'expo-router'
import { Ionicons } from "@expo/vector-icons";
import { DbContext } from "@/contexts/DbContext";
import { addDoc, collection } from 'firebase/firestore';

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

    useEffect(() => {
        if (auth){
            console.log(auth.currentUser)
        }
    })

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
  
    const addData = async () => {
      const data = {
        userImage: image,
        userFirstName: firstName,
        userLastName: lastName,
        userAddress: address
      }
      const docRef = await addDoc(collection(db, "users"), data)
    }

    return(
        <ScrollView>

        <View style={styles.container}>

        <Pressable 
      style={styles.plusBtn}
      onPress={() => setModalVisible(true)}
      >
        <Text style={styles.plusBtnText}>
          <Ionicons name="add" size={26}></Ionicons>
        </Text>
      </Pressable>

            <View style={styles.iconContainer}>
           <FontAwesome name="user" size={150} color="white"/>
            </View>
            
            <View style={styles.textContainer}>
            <Text style={styles.mainText}>{firstName}</Text>
            <Text style={styles.subText}>doejohn32@gmail.com</Text>
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
              <Text style={styles.addPostBtnText}>Save Profile</Text>
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
    

})
