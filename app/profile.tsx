import { Pressable, View, Text, StyleSheet}from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import UpcomingEvents from "@/components/upcomingEvents";
import { useState } from "react";

export default function Profile(props: any){

    const [showTickets, setShowTickets] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
   
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

    return(
        <View style={styles.container}>

            <View style={styles.iconContainer}>
           <FontAwesome name="user" size={150} color="white"/>
            </View>
            
            <View style={styles.textContainer}>
            <Text style={styles.mainText}>John Doe</Text>
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
            <UpcomingEvents />

        </View>
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
    

})
