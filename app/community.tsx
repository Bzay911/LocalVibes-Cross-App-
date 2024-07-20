import { View, Text, StyleSheet } from 'react-native';
import UserPost from '../components/userPost';

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
      paddingBottom:10,
      margin: 10,
      gap:25
  }
})