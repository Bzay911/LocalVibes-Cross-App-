import { View, Text, StyleSheet, ScrollView } from 'react-native';
import UserPost from '@/components/UserPost';



export default function Community() {
  return (
    <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>
      <UserPost />
    </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container:{
      padding:10,
      gap:25,
      backgroundColor:"#050608",
      flex:1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#050608",
  },
  
})