import {Text, View, StyleSheet, Pressable} from 'react-native'
import {Image} from 'expo-image'

export default function UpcomingEvents(props: any){
   

    return(
        <View style = {styles.container}>
            <Image 
            style ={styles.image}
            source={"https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
            contentFit="cover"
            />

         <View style = {styles.textContainer}>
             <Text style={styles.mainText}>The Elements and Rock Revival</Text>
             <Text style={styles.middleText}>Townhall, Sydney</Text>
             <Text style={styles.lastText}>Happening on 26th August, 2024</Text>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
      },
      image: {
        width: 100,  
        height: 100, 
        marginRight: 10,
        borderRadius:5,
        borderColor: "#FFFFFF",
        borderWidth: 1
      },
      textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "#301A25",
        padding: 13,
        borderRadius: 7
      },
      mainText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "#FFFFFF"
      },
      middleText: {
        fontSize: 16,
        marginBottom: 5,
        color: "#FFFFFF"
      },
      lastText: {
        fontSize: 14,
        color: "#FFFFFF"
      },
    
    
})