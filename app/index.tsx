import { View, Text, StyleSheet, StatusBar, Dimensions,ScrollView } from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '@/components/AuthForm'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useState } from 'react'
import { useRouter } from 'expo-router'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Image } from 'expo-image'

const win = Dimensions.get('window')
const ratio = win.width/541; //541 is actual image width

export default function Login(props: any){
    const auth = useContext( AuthContext )
    const router = useRouter()
    const [error, setError] = useState('')
    const[isLoggedIn, setIsLoggedIn] = useState(false)


    const LogIn = ( email:string, password:string ) => {
        signInWithEmailAndPassword( auth, email, password )
        .then((userCredential) => {
            console.log(userCredential)
            router.replace('/Home')
        })
        .catch(( error) => {
            setError( error.code )
        })
        setIsLoggedIn(true)
    }

    

    return (
        <ScrollView style = {styles.backgroundColor}>

        <View >
            <View style={styles.loginView}>

              <Image 
            style ={styles.image}
             source={require('../assets/images/loginImage.png')} 
            contentFit="cover"
            />

            <AuthForm title="Hello Again!" semiTitle = "Welcome back you've been missed" actionText="Log in" action= {LogIn}/>
            <View style = {styles.container}>
            <Text style={styles.textColor}>Don't have an account?</Text>
                <Link href="signup">
                <Text style={styles.link}>Go to Sign Up</Text>
                </Link>
            </View>
            <ErrorMessage error = {error} />
        </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        gap:5
        // marginVertical: 15
    }, 

    loginView:{

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
        width: win.width,
        height: 250 * ratio,
        marginTop:20
        
      },
})