import React, { useContext, useState, useEffect} from "react";
import { View, Text, StyleSheet,ScrollView, Pressable, Modal, TextInput } from "react-native";
import UpcomingEvents from '@/components/UpcomingEvents'
import { Ionicons } from "@expo/vector-icons";
import { addDoc, collection } from 'firebase/firestore';
import { DbContext } from '@/contexts/DbContext';

export default function Events(props: any) {
 
  const db = useContext(DbContext)
  const[modalVisible, setModalVisible] = useState(false)
  const[image, setImage] = useState('')
  const[date, setDate] = useState('')
  const[title, setTitle] = useState('')
  const[venue, setVenue] = useState('')

  useEffect(() => {
    setDate('')
    setImage('')
    setTitle('')
    setVenue('')
  },[modalVisible])

  const addData = async () => {
    const data = {
      eventTitle: title,
      eventImage: image,
      eventDate: date,
      eventVenue: venue
    }
    const docRef = await addDoc(collection(db, "events"), data)
  }

  return (
    <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>

    <Pressable 
      style={styles.plusBtn}
      onPress={() => setModalVisible(true)}
      >
        <Text style={styles.plusBtnText}>
          <Ionicons name="add" size={26}></Ionicons>
        </Text>
      </Pressable>

    <UpcomingEvents />

    <Modal
      animationType="fade"
      transparent={false}
      visible={modalVisible}
      >
        <View style={styles.modal}>

          <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Enter your event details</Text>
          <Text style={styles.inputHeadertxt}>Event Image</Text>
          <TextInput 
          value={image} 
          onChangeText={(val) => setImage(val)}
          style={styles.input}
          />
          <Text style={styles.inputHeadertxt}>Event Title</Text>
          <TextInput 
          value={title} 
          onChangeText={(val) => setTitle(val)}
          style={styles.input}
          />
          <Text style={styles.inputHeadertxt}>Event Date</Text>
          <TextInput 
          value={date} 
          onChangeText={(val) => setDate(val)}
          style={styles.input}
          />
          <Text style={styles.inputHeadertxt}>Event Venue</Text>
          <TextInput 
          value={venue} 
          onChangeText={(val) => setVenue(val)}
          style={styles.input}
          />
            <Pressable 
            style={styles.addEventBtn} 
            onPress={() => {
              addData()
              setModalVisible(false)
            }
              }>
              <Text style={styles.addEventBtnText}>Add Event</Text>
            </Pressable>
          </View>

          <Pressable style={styles.modalClose} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalText}>Close</Text>
          </Pressable>

        </View>
      </Modal>

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      padding:10,
      gap:25,
      backgroundColor:"#050608",
      flex:1,
    },
    scrollContainer: {
      flex: 1,
      backgroundColor: "#050608",
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
      bottom:20, 
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
    addEventBtn:{
      backgroundColor: "#D6578C",
      borderRadius: 7,
      padding:15,
      width:"50%",
      alignItems:"center",
      alignSelf:"center"
    },
    addEventBtnText:{
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
  });
