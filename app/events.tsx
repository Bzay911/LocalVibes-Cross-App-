import { Pressable, View, Text, StyleSheet} from "react-native";
import { Link } from "expo-router";

export default function Events(props: any){

    return(
        <View >
          <Link href="/savedEvents">
          <Text style ={styles.links}>Saved Events</Text>
          </Link> 

          <Link href="/upcoming">
          <Text style ={styles.links}>Upcoming Events</Text>
          </Link> 
        </View>
    )
}

const styles = StyleSheet.create({
    links:{
        fontWeight: "bold",
        fontSize: 28
    }
})
