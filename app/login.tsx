import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '@/components/AuthForm'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useState } from 'react'
import { useRouter } from 'expo-router'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Image } from 'expo-image'

export default function Login(props: any){
    const auth = useContext( AuthContext )
    const router = useRouter()
    const [ error, setError ] = useState('')



    const LogIn = ( email:string, password:string ) => {
        signInWithEmailAndPassword( auth, email, password )
        .then((userCredential) => {
            router.replace('/home')
        })
        .catch(( error) => {
            setError( error.code )
        })
    }

    return (
        <View style = {styles.backgroundColor}>
              <Image 
            style ={styles.image}
             source={require('../assets/images/loginImage.png')} 

            // source={"https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
            contentFit="cover"
            />

            <AuthForm title="Hello Again!" semiTitle = "Welcome back you've been missed" actionText="Log in" action= {LogIn}/>
            <View style = {styles.container}>
            <Text style={styles.textColor}>Don't have an account?</Text>
                <Link href="/">
                <Text style={styles.link}>Go to Sign Up</Text>
                </Link>
            </View>
            <ErrorMessage error = {error} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 15
    }, 

    backgroundColor: {
        backgroundColor: "#050608",
        flex:1
    },

    textColor:{
        color: "#FFFFFF",
    },


    link: {
        color: "#FFFFFF",
        marginLeft: 5,
        fontWeight:"bold"
    },
    image: {
        width: 370,  
        height: 150, 
        marginRight: 10,
        
      },
})