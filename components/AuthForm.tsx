import {Text, TextInput, StyleSheet, View, Pressable} from 'react-native'
import { useState, useEffect } from 'react'
import { parseSync } from '@babel/core'

export function AuthForm( props: any ){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)

    useEffect(() => {
       if(email.indexOf('@') > 0 && email.length >= 6 ){
        // Valid Email
        setValidEmail(true)
       }
       else{
        setValidEmail(false)
       }
    }, [email])

    useEffect(() => {
       if(password.length >= 8 ){
        // Valid Password
        setValidPassword(true)
       }
       else{
        setValidPassword(false)
       }
    }, [password])

    return(
        <View style = {styles.container}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.semiTitle}>{props.semiTitle}</Text>
            <Text style={styles.inputHeadertxt}>Email</Text>
            <TextInput 
                style={styles.input} 
                value={email} 
                onChangeText={(text) => setEmail(text)}/>
            <Text style= {styles.inputHeadertxt}>Password</Text>
            <TextInput 
                secureTextEntry= {true} 
                style={styles.input} 
                value={password} 
                onChangeText={(text) => setPassword(text)}/>  
            <Pressable 
                onPress={() => props.action( email, password )} 
                style={ (validEmail && validPassword) ? styles.button : styles.buttonDisabled}
                disabled= {(validEmail && validPassword) ? false : true}>
                <Text style = {styles.buttonText}>{props.actionText}</Text>
            </Pressable>
        </View>
    )

}
const styles = StyleSheet.create({
    title:{
        fontSize:32,
        fontWeight:"bold",
        textAlign: "center",
        marginBottom: 10,
        color:"#FFFFFF"
    },
    semiTitle:{
        fontSize:18,
        textAlign: "center",
        marginBottom:20,
        color:"#FFFFFF"
    },

    inputHeadertxt:{
        marginBottom: 10,
        color: "#FFFFFF"
    },

    container: {
        marginHorizontal: 20,
        marginTop: 100,
        padding: 20,
        backgroundColor: "#050608",
    },
    input: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#cccccc",
        padding: 6,
        marginBottom: 20,
        backgroundColor: "#efefef",
        borderRadius: 6,
        height:50
    },
    button: {
        backgroundColor: "#D6578C",
        borderRadius: 4,
        marginTop: 10
    },
    buttonText: {
        color: "#efefef",
        textAlign: "center",
        padding: 15,
        fontSize:20,
        fontWeight: "bold",
        height: 60,
    },

    buttonDisabled: {
        backgroundColor: "#888888",
        borderRadius: 4,
        marginTop: 10
    },
    buttonTextDisabled: {
        color: "#666666",
        textAlign: "center",
        padding: 8,
    },




})