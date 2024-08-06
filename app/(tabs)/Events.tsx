import { Pressable, View, Text, StyleSheet} from "react-native";
import { Link } from "expo-router";

export default function Events(props: any){

    return(
        <View style = {styles.tabContainer}>
          <Link href="/upcoming">
          <Text style ={styles.links}>Upcoming Events</Text>
          </Link> 
        </View>
    )
}

const styles = StyleSheet.create({
    links:{
        fontWeight:"500",
        fontSize: 18,
        color:"#FFFFFF"
    },
    tabContainer:{
        flexDirection:"row",
        gap:120,
        backgroundColor:"#050608",
        flex:1,
        padding:15
        
    },
})
