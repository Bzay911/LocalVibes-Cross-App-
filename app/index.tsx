import { View, Text, Pressable, StyleSheet, StatusBar,TextInput} from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '@/components/AuthForm'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import{createUserWithEmailAndPassword, onAuthStateChanged} from '@firebase/auth'
import { useRouter} from 'expo-router'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

export default function Signup(props: any){
    const auth = useContext(AuthContext)
    const router = useRouter()
    const firestore = getFirestore()

    const createAccount = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Add the user to Firestore with their UID as the document ID
            await setDoc(doc(firestore, "users", user.uid), {
                userEmail: user.email,
                userFirstName: "",
                userLastName: "",
                userAddress: "",
                userImage: ""
               
            });

            // Redirect to login
            router.replace("/Home");
        } catch (error: any) {
            console.log(error.code, error.message);
        }
    };

   onAuthStateChanged( auth, (user) => {
        if(user){
            // user is authenticated
            // redirect user to homet
            router.replace('/Home')
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