import { View, Text, StyleSheet } from 'react-native';

export default function UserPost() {
  return (
    
      <View style={styles.textContainer}>
      <Text style={styles.mainText}>John Doe</Text>
      <Text style={styles.postText}>Townhall</Text>
      <Text style={styles.postText}>Lorem ipsum dolor sit amet consectetur adipisicinelit.Maxime mollitia,molestiae quas vel sint commodirepudiandaeconsequ
unturvoluptatum laborumnumquam blanditiis harum quisqua
meius sed odit fugiat iust</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  
  textContainer:{
    flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "#301A25",
        padding: 13,
        borderRadius: 7
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
