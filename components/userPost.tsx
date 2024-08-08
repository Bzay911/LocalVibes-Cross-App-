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
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    width: '100%', // Ensure container takes up full width of its parent
  },
  image: {
    width: '100%', // Image width will be 100% of its parent container
    height: width * 0.7 * 0.75,
    marginBottom: 12,
    borderRadius: 5,
    borderColor: "#FFFFFF",
    borderWidth: 1,
  },
  headContainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginBottom: 10, // Add margin to separate from the image
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
  },
});