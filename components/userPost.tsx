import { FontAwesome } from '@expo/vector-icons';
import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList,Image, Dimensions } from "react-native";
import { collection, query, onSnapshot } from "firebase/firestore";
import { DbContext } from "@/contexts/DbContext";

const {width} = Dimensions.get('window')
export default function UserPost() {
  const db = useContext(DbContext);
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      fetchData();
      setLoaded(true);
    }
  }, [loaded]);

    // Fetching data from firestore
const fetchData = () => {
  const q = query(collection(db, "community"));
  const unsub = onSnapshot(q, (querySnapshot) => {
    let items: any = [];
    querySnapshot.forEach((doc) => {
      let item = doc.data();
      item.id = doc.id;
      items.push(item);
    });
    setPosts(items);
  });

  return () => unsub();
};

type ItemProps = {
  postDetails: string;
  postImage: string;
  posterAddress: string;
  posterFullName: string;
};

const RenderItem = ({ postDetails, postImage, posterAddress, posterFullName}: ItemProps) => (
  <View style={styles.container}>

  <View style={styles.headContainer}>
  <FontAwesome name="user"  color="#FFFFFF" size={30}/>
  <View>
  <Text style={styles.mainText}>{posterFullName}</Text>
  <Text style={styles.postText}>{posterAddress}</Text>
  </View>
  </View>

<View> 
<Image 
  style ={styles.image}
  source={{uri: postImage}}
  contentFit="cover"
  />
</View>
  <View style={styles.textContainer}>

  <Text style={styles.postText}>{postDetails}</Text>
  </View>
</View>
);

  return (
    <FlatList 
    data={posts}
    renderItem={({item} ) => (
      <RenderItem
      postImage={item.postImage}
      postDetails={item.postDetails}
      posterFullName={item.posterFullName}
      posterAddress={item.posterAddress}
      />
    )}
    keyExtractor={(item) => item.id}
  /> 
  
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#301A25",
    padding: 20,
    marginVertical: 30,
  },

  image: {
    // width: '100%', 
    height: width * 0.7 * 0.75,
    marginBottom: 18,
    // borderColor: "#FFFFFF",
  },

  headContainer: {
    flexDirection: "row",
    gap:15,
    marginBottom: 20,
  },

  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  mainText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "#FFFFFF",
  },

  postText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#FFFFFF",
    textAlign:"justify"
  },
});