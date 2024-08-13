import { View, Text, StyleSheet, ScrollView, Modal, Pressable, TextInput } from 'react-native';
import UserPost from '@/components/UserPost';
import { useState, useContext, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { addDoc, collection, documentId } from 'firebase/firestore';
import { DbContext } from '@/contexts/DbContext';

export default function Community() {

  const db = useContext(DbContext)
  const[modalVisible, setModalVisible] = useState(false)
  const[image, setImage] = useState('')
  const[details, setDetails] = useState('')
  const[fullName, setFullName] = useState('')
  const[address, setAddress] = useState('')

  useEffect(() => {
    setAddress('')
    setDetails('')
    setFullName('')
    setImage('')
  },[modalVisible])

  const addData = async () => {
    const data = {
      postDetails: details,
      postImage: image,
      posterFullName: fullName,
      posterAddress: address
    }
    const docRef = await addDoc(collection(db, "community"), data)
  }


  return (
    // <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>

      <Pressable 
      style={styles.plusBtn}
      onPress={() => setModalVisible(true)}
      >
        <Text style={styles.plusBtnText}>
          <Ionicons name="add" size={26}></Ionicons>
        </Text>
      </Pressable>

      <UserPost />
      <Modal
      animationType="fade"
      transparent={false}
      visible={modalVisible}
      >
        <View style={styles.modal}>

          <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Enter your event details</Text>
          <Text style={styles.inputHeadertxt}>Post Image</Text>
          <TextInput 
          value={image} 
          onChangeText={(val) => setImage(val)}
          style={styles.input}
          />
          <Text style={styles.inputHeadertxt}>Post Details</Text>
          <TextInput 
          value={details} 
          onChangeText={(val) => setDetails(val)}
          style={styles.input}
          />
          <Text style={styles.inputHeadertxt}>Poster Fullname</Text>
          <TextInput 
          value={fullName} 
          onChangeText={(val) => setFullName(val)}
          style={styles.input}
          />
          <Text style={styles.inputHeadertxt}>Poster Address</Text>
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
              <Text style={styles.addPostBtnText}>Add Post</Text>
            </Pressable>
          </View>

          <Pressable style={styles.modalClose} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalText}>Close</Text>
          </Pressable>

        </View>
      </Modal>
    </View>
    // </ScrollView>
  );

}

const styles = StyleSheet.create({
  container:{
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