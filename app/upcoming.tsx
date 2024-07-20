import { Pressable, View, Text, StyleSheet} from "react-native";
import UpcomingEvents from '@/components/upcomingEvents'

export default function SavedEvents(props: any){
   

    return(
        <View style={styles.container}>
            <UpcomingEvents />
            <UpcomingEvents />
            <UpcomingEvents />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#050608", 
        flex:1
    },

    
})