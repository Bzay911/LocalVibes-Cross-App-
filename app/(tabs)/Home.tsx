import {Text, View, StyleSheet, Pressable, Dimensions} from 'react-native'
import {Image} from 'expo-image'
import UpcomingEvents from '@/components/upcomingEvents'
import Suggestions from '@/components/suggestions'
import { DbContext } from '@/contexts/DbContext'

const {width} = Dimensions.get('window')

export default function Main(props: any){
   
    return(
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Hi John,</Text>

            <View style={styles.titleAlignment}>
            <Text style={styles.mainTexts}>Featured Events</Text>
            <Text style={styles.viewText}>view all</Text>
            </View>

            <Image 
            style ={styles.image}
            source={"https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
            contentFit="cover"/>

            <View style={styles.titleAlignment}>
            <Text style={styles.mainTexts}>Upcoming Events</Text>
            <Text style={styles.viewText}>view all</Text>
            </View>

        <UpcomingEvents />
        <UpcomingEvents />

        <Text style={styles.mainTexts}>Suggested Organisers</Text>

        <View style={styles.organiserTab}>
        <Suggestions organiserName="@underground"/>
        <Suggestions organiserName="@kukuchurro"/>
        <Suggestions organiserName="@slackers"/>
        </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#050608",
        flex:1
    },
    image: {
        width: width * 1,  
        height: width * 0.7 * 0.75, 
        marginRight: 2,
        borderRadius:5,
        borderColor: "#FFFFFF",
        borderWidth: 1
      },

      mainTexts:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "#FFFFFF",
        margin: 12
      }, 
      
      welcomeText:{
        color:"#FF64A5",
        fontSize: 16,
        margin:12

      },
      viewText:{
        color: "#FF64A5",
        fontSize: 14
      },
      titleAlignment:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 198
      },
      organiserTab:{
        flexDirection: "row",
        margin:5
      }
    
})