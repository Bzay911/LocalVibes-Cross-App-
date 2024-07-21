import { View, Text, Pressable, StyleSheet, StatusBar,TextInput} from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '@/components/AuthForm'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import{createUserWithEmailAndPassword, onAuthStateChanged} from '@firebase/auth'
import { useRouter} from 'expo-router'

export default function Signup(props: any){
    const auth = useContext(AuthContext)
    const router = useRouter()

    const createAccount = (email: string, password: string) => {
        createUserWithEmailAndPassword( auth, email, password)
        .then((userCredential) => {
            console.log(userCredential.user)
            router.replace("/home")
        })
        .catch((error) => {
            console.log(error.code, error.message)
        })

    }

   onAuthStateChanged( auth, (user) => {
        if(user){
            // user is authenticated
            // redirect user to home
            router.replace('/home')
        }
        else{
            // user is not authenticated
        }
   })

    return (
        <View style ={styles.backgroundColor}>
            <AuthForm title="New to Local Vibes?" semiTitle= "Sign up and enjoy locally" actionText="Sign Up" action={createAccount}/>
            <View style= {styles.container}>
                <Text style = {styles.textColor}>Already have an account?</Text>
                <Link href="/login">
                <Text style={styles.link}>Go to Login</Text>
                </Link>
            </View>
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: "center",
      marginVertical: 15,
      gap:5

      
    },

    backgroundColor: {
        backgroundColor: "#050608",
        flex: 1
    },

    textColor:{
        color: "#FFFFFF",
    },

    link:{
        color: "#FFFFFF",
        marginLeft: 15,
        fontWeight: "bold",
    }
  });