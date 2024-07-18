import { Image, StyleSheet, View, SafeAreaView, Text, Pressable } from 'react-native';
import {Link, useRouter} from 'expo-router'
import { useState, useEffect } from 'react';


export default function HomeScreen() {
  const [auth, setAuth] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if(auth){
      router.navigate('/explore')
    }
  }, [auth])

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Pressable onPress={() => setAuth(true)}>
        <Text>Login</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
