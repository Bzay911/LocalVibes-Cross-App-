import { FontAwesome } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

export default function UserPost() {
  return (
  
    <View style={styles.container}>

      <View style={styles.headContainer}>
      <FontAwesome name="user"  color="#FFFFFF" size={30}/>
      <View style={styles.userDetailsContainer}>
      <Text style={styles.mainText}>John Doe</Text>
      <Text style={styles.postText}>Townhall</Text>
      </View>
      </View>

      <View style={styles.textContainer}>
   
      <Text style={styles.postText}>Lorem ipsum dolor sit amet consectetur adipisicinelit.Maxime mollitia,molestiae quas vel sint commodirepudiandaeconsequ
unturvoluptatum laborumnumquam blanditiis harum quisqua
meius sed odit fugiat iust</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container:{
    backgroundColor: "#301A25",
    padding: 13,
    borderRadius: 7
  },
headContainer:{
  flexDirection:"row",
  gap:15
},
userDetailsContainer:{
  gap:0
},
  textContainer:{
    flexDirection: 'column',
    justifyContent: 'center',
  }, 
  mainText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "#FFFFFF"
  },
  postText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#FFFFFF"
  },
});
