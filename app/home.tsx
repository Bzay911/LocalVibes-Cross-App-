import {Text, View, StyleSheet, Pressable} from 'react-native'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useEffect } from 'react'
import {signOut} from '@firebase/auth'
import { useRouter, Link } from 'expo-router'

export default function Home(props: any){
    const auth = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (auth){
            console.log(auth.currentUser)
        }
    })

    const SignOutUser = () => {
        signOut( auth )
        .then(() => {
            router.replace('/')
        })
        .catch((error) => {
            console.log(error.code, error.message)
        })
    }

    return(
        <View>

            {/* Navigate user to home screen */}
            <Link href="/main">
            <Text style ={styles.links}>Home</Text>  
            </Link>

            {/* Navigate user to events screen */}
            <Link href="/events">
            <Text style ={styles.links}>Events</Text>  
            </Link>

            {/* Navigate user to community screen */}
            <Link href="/community">
            <Text style ={styles.links}>Community</Text>  
            </Link>

            {/* Navigate user to profile screen */}
            <Link href="/profile">
            <Text style ={styles.links}>Profile</Text>  
            </Link>

            <Pressable onPress={() => SignOutUser()}>
                <Text style ={styles.links}>Sign Out</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    links:{
        fontWeight: "bold",
        fontSize: 28
    }
})