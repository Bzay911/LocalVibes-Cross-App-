import {Text, View, StyleSheet, Pressable} from 'react-native'
import {Image} from 'expo-image'

export default function Suggestions(props: any){
   

    return(
        <View style = {styles.container}>
            <Image 
            style ={styles.image}
            source={"https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
            contentFit="cover"
            />
            <Text style = {styles.text}>{props.organiserName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 5,
        alignItems:"center"
      },

      image: {
        width: 105,  
        height: 100, 
        marginRight: 10,
        borderRadius:5,
        borderColor: "#FFFFFF",
        borderWidth: 1
      },
      text:{
        color:"#FFFFFF",
      }
})