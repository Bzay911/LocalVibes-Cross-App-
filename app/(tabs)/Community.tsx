import { View, Text, StyleSheet } from 'react-native';
import UserPost from '@/components/userPost';

export default function Community() {
  return (
    <View style={styles.container}>
      <UserPost />
      <UserPost />
      <UserPost />
    </View>
  );

}

const styles = StyleSheet.create({
  container:{
      padding:10,
      gap:25,
      backgroundColor:"#050608",
      flex:1,
  },
  
})