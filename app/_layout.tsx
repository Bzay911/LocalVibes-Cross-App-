import { Stack } from 'expo-router';
import { SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';
import { firebaseConfig } from '@/Config/config';
import {initializeApp } from '@firebase/app'
import { getAuth } from '@firebase/auth'
import { AuthContext } from '@/contexts/AuthContext';


export default function RootLayout() {

  // initialize firebase
  const FBapp = initializeApp(firebaseConfig)

  // initialize firebase auth
  const FBauth = getAuth(FBapp)

  return (
    <AuthContext.Provider value={FBauth}>
   <SafeAreaView style = {styles.container}>

      <Stack>
       <Stack  screenOptions={{headerShown: false}}/> 

      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
    </Stack>
   </SafeAreaView>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop: StatusBar.currentHeight,
  }
})
