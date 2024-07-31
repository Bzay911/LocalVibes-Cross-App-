import { Pressable, View, Text, StyleSheet, TextInput} from "react-native";
import { useRouter } from 'expo-router'
import { DbContext } from "@/contexts/DbContext";
import { useContext, useState } from "react";
import {collection, addDoc} from 'firebase/firestore'
import { AuthContext } from "@/contexts/AuthContext";

export default function UserDetails(props: any){
    const auth = useContext(AuthContext)
    const router = useRouter()
    const db = useContext(DbContext)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')

    const addData = async () => {
        const data ={
           firstName,
           lastName,
           address
        }

        const path = `users/ ${ auth.currentUser.uid}/items`
        const docRef = await addDoc(collection(db, path), data)
        console.log(docRef.id)

    }
   

    return(
        <View style={styles.container}>
            <Text style= {styles.titleText}>Enter User Details</Text>

            <Text style= {styles.titleText}>First name</Text>
            <TextInput 
            style={styles.input}
            onChange={newFname => setFirstName(newFname.nativeEvent.text)}/>

            <Text style= {styles.titleText}>Last name</Text>
            <TextInput style={styles.input}
            onChange={newLname => setLastName(newLname.nativeEvent.text)}/>

            <Text style= {styles.titleText}>Address</Text>
            <TextInput style={styles.input}
            onChange={newadd => setAddress(newadd.nativeEvent.text)}/>

            <Pressable 
            style={styles.button}
            onPress={ () =>{
                addData(),
                router.replace('/Home')}
            }>
                <Text style= {styles.buttonText}>Continue</Text>
            </Pressable>

            <Text style= {styles.orText}>or</Text>

            <Pressable 
            style={styles.button}
            onPress={ () =>{
                router.replace('/organiserDetails')}
            }>
                <Text style= {styles.buttonText}>Continue as an organiser</Text>
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