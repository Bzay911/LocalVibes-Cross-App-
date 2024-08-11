import {FlatList, Dimensions, StyleSheet, Pressable, View, Image, Text, Modal, TextInput} from 'react-native'
import { useNavigation, useLocalSearchParams } from 'expo-router'
import { useEffect, useState, useContext } from 'react'
import { DbContext } from '@/contexts/DbContext'
import { doc, getDoc, deleteDoc, documentId, updateDoc } from 'firebase/firestore'
import { AuthContext } from '@/contexts/AuthContext'
import { Ionicons } from "@expo/vector-icons";


const {width} = Dimensions.get('window')
export default function ItemDetail (props: any){
    const db = useContext(DbContext)
    const[modalVisible, setModalVisible] = useState(false)
    const auth = useContext(AuthContext)
    const navigation = useNavigation()
    const params = useLocalSearchParams() // For receiveing data from upcomingEvents page
    const {id} = params
  console.log(params)


    const[image, setImage] = useState('')
    const[date, setDate] = useState('')
    const[title, setTitle] = useState('')
    const[venue, setVenue] = useState('')

    

    const[events, setEvents] = useState<any>({})

    
    useEffect(() => {
        if (id) {
          navigation.setOptions({ headerShown: true });
          getDocument(id);
        }
      }, [id, navigation]);


    const getDocument = async (documentId: string) => {
        const docRef = doc(db, `events`, documentId)
        const docSnap = await getDoc(docRef)
        let item = docSnap.data();
        setEvents(item)
        setImage(item?.eventImage);
        setDate(item?.eventDate);
        setTitle(item?.eventTitle);
        setVenue(item?.eventVenue);
    }

    const deleteDocument = async (documentId: string) =>{
      const docRef = doc(db, `events`, id)
      await deleteDoc(docRef)
      navigation.goBack()
    }

    const updateData = async () => {
      const data = {
        eventDate: date,
        eventImage: image,
        eventTitle: title,
        eventVenue: venue
      }
      const userDocRef = doc(db, "events",id)
      await updateDoc(userDocRef, data);

      setEvents((prevEvents: any) =>
        prevEvents.map((event) =>
            event.id === id ? { ...event, ...data } : event
        )
    );
    
    setModalVisible(false);
    }



    return(
      <>

      <View style={styles.container}>

          <View style={styles.icons}>

          <Pressable onPress={() => setModalVisible(true)}>
          <Ionicons name="create-outline" size={30} color="white"></Ionicons>
            </Pressable>

            <Pressable onPress={() => deleteDocument(id)}>
          <Ionicons name="trash-outline" size={30} color="red"></Ionicons>
            </Pressable>

          </View>
       

       <Image
          style={styles.image}
          source={{ uri: image}}
          contentFit="cover"
        />

        <View style={styles.textContainer}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventVenue}>{venue}</Text>
        <Text style={styles.eventDate}>{date}</Text>
        </View>

             <Pressable style={styles.button}>
                 <Text style={styles.buttonText}>Get Tickets</Text>
             </Pressable>

      <Modal
      animationType="fade"
      transparent={false}
      visible={modalVisible}
      >
        <View style={styles.modal}>

          <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Update your event details</Text>
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
              updateData()
              setModalVisible(false)
            }
              }>
              <Text style={styles.addEventBtnText}>Update Event</Text>
            </Pressable>
          </View>

          <Pressable style={styles.modalClose} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalText}>Close</Text>
          </Pressable>

        </View>
      </Modal>
 
         </View>
         </>

    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#050608",
        flex:1,
        height:800
    },
    textContainer:{
        padding:12,
        alignItems:"center"

    },
    image: {
        height: width * 0.7 * 0.75, 
        margin:12
      },
      scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#050608",
        paddingBottom: 20
      },
      eventTitle: {
        fontSize: 29,
        fontWeight: "bold",
        marginBottom: 8,
        color: "white",
      },
      eventVenue: {
        fontSize: 20,
        marginBottom: 4,
        color: "white",
      },
      eventDate: {
        fontSize: 16,
        color: "#999",
      },
      button:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: "#FF64A5",
        padding:15,
        margin:20,
        borderRadius:7
      },
      buttonText:{
        color:"white",
        fontWeight:"bold",
        fontSize:18
      }, 
      icons:{
        flexDirection:"row",
        justifyContent:"flex-end",
        padding:17,
        gap:5
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
    
})