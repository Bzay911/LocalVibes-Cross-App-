import { Pressable, View, Text, StyleSheet, TextInput} from "react-native";
import { useRouter } from 'expo-router'

export default function UserDetails(props: any){
    const router = useRouter()
   

    return(
        <View style={styles.container}>
            <Text style= {styles.titleText}>Enter Organiser Details</Text>

            <Text style= {styles.titleText}>Username</Text>
            <TextInput style={styles.input}/>

            <Text style= {styles.titleText}>Address</Text>
            <TextInput style={styles.input}/>

            <Pressable 
            style={styles.button}
            onPress={ () =>{
                router.replace('/Home')}
            }>
                <Text style= {styles.buttonText}>Continue</Text>
            </Pressable>

            <Text style= {styles.orText}>or</Text>

            <Pressable style={styles.button}>
                <Text style= {styles.buttonText}>Continue as a normal user</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#050608", 
        flex:1,
        padding:15
    },
    titleText:{
        color: "white",
        marginTop:15
    },
    buttonText:{
        color: "white",
        textAlign:"center"
    },
    orText:{
        color: "white",
        textAlign:"center",
        margin:10
    },
    input: {
        borderStyle: "solid",
        borderWidth: 4,
        borderColor: "#cccccc",
        padding: 6,
        marginBottom: 20,
        backgroundColor: "#efefef",
        borderRadius: 6,
    },
    button: {
        backgroundColor: "#D6578C",
        borderRadius: 4,
        marginTop: 10, 
        padding:20,
        
    },

    
})