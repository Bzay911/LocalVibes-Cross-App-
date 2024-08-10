import {FlatList, Dimensions, StyleSheet, Pressable, View, Image, Text} from 'react-native'
import { useNavigation, useLocalSearchParams } from 'expo-router'
import { useEffect, useState, useContext } from 'react'
import { DbContext } from '@/contexts/DbContext'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { AuthContext } from '@/contexts/AuthContext'
import { Ionicons } from "@expo/vector-icons";


const {width} = Dimensions.get('window')
export default function ItemDetail (props: any){
    const db = useContext(DbContext)
    const auth = useContext(AuthContext)
    const navigation = useNavigation()
    const params = useLocalSearchParams() // For receiveing data from upcomingEvents page
    const {id} = params

    const[events, setEvents] = useState([])
    
    useEffect(() => {
        if (id) {
          navigation.setOptions({ headerShown: true });
          getDocument(id);
        }
      }, [id, navigation]);

    type ItemProps = {
        id: string;
        eventTitle: string;
        eventVenue: string;
        eventDate: string;
        eventImage: string;
      };

    const getDocument = async (documentId: string) => {
        const docRef = doc(db, `events`, documentId)
        const docSnap = await getDoc(docRef)
        let items: any = [];
        let item = docSnap.data();
        items.push(item);
        setEvents(items)
    }

    const deleteDocument = async (documentId: string) =>{
      const docRef = doc(db, `events`, id)
      await deleteDoc(docRef)
      navigation.goBack()
    }

    const RenderItem = ({ id, eventTitle, eventVenue, eventDate, eventImage }: ItemProps) => (
        <View style={styles.container}>

          <View style={styles.icons}>

            <Pressable>
          <Ionicons name="create-outline" size={30} color="white"></Ionicons>
            </Pressable>

            <Pressable onPress={() => deleteDocument(id)}>
          <Ionicons name="trash-outline" size={30} color="red"></Ionicons>
            </Pressable>

          </View>
       

       <Image
          style={styles.image}
          source={{ uri: eventImage }}
          contentFit="cover"
        />

        <View style={styles.textContainer}>
        <Text style={styles.eventTitle}>{eventTitle}</Text>
        <Text style={styles.eventVenue}>{eventVenue}</Text>
        <Text style={styles.eventDate}>{eventDate}</Text>
        </View>

             <Pressable style={styles.button}>
                 <Text style={styles.buttonText}>Get Tickets</Text>
             </Pressable>
 
         </View>
      );

    return(


    <FlatList 
    data={events}
    renderItem={({item} ) => (
      <RenderItem
      eventTitle={item.eventTitle}
      eventVenue={item.eventVenue}
      eventDate={item.eventDate}
      eventImage={item.eventImage}
      />
    )}
    keyExtractor={(item) => item.id}
  /> 
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
      }
    
})