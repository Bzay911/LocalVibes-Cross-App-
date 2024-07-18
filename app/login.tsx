import { AuthForm } from '@/components/AuthForm'
import { View, Text, Pressable, StyleSheet, StatusBar} from 'react-native'
import {Link} from 'expo-router'

export default function Login(){
    return (
        <View>
            <AuthForm title="Log in to your account" actionText="Log in"/>
            <View style = {styles.container}>
            <Text>Don't have an account?</Text>
                <Link href="/">
                <Text style={styles.link}>Go to Sign Up</Text>
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 15
    }, 
    
    link: {
        color: "#b8111e",
        marginLeft: 5,
    }
})