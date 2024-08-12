import { FontAwesome } from '@expo/vector-icons';
import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList,Image, Dimensions, Pressable, Modal, TextInput} from "react-native";
import { collection, query, onSnapshot, documentId, updateDoc } from "firebase/firestore";
import { DbContext } from "@/contexts/DbContext";
import { Ionicons } from '@expo/vector-icons';
import { doc, deleteDoc } from 'firebase/firestore'
import { useNavigation } from 'expo-router';


const {width} = Dimensions.get('window')
export default function UserPost() {
  const db = useContext(DbContext);
  const navigation = useNavigation()
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const[modalVisible, setModalVisible] = useState(false)

  const[postImage, setPostImage] = useState('')
  const[postDetails, setPostDetails] = useState('')
  const[posterFullName, setPosterFullName] = useState('')
  const[posterAddress, setPosterAddress] = useState('')
  const [currentPostId, setCurrentPostId] = useState(null);

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

const updateData = async (documentId: string) => {
  const data = {
    postImage: postImage,
    postDetails: postDetails,
    posterFullName: posterFullName,
    posterAddress: posterAddress
  }
  const userDocRef = doc(db, "community",documentId)
  await updateDoc(userDocRef, data);

  setPosts(posts.map(post => post.id === documentId ? { ...post, ...data } : post));
setModalVisible(false);
}

type ItemProps = {
  id:string
  postDetails: string;
  postImage: string;
  posterAddress: string;
  posterFullName: string;
};

const deleteDocument = async (documentId: string) =>{
  const docRef = doc(db, `community`, documentId)
  await deleteDoc(docRef)
  // navigation.goBack()
}

const RenderItem = ({ id, postDetails, postImage, posterAddress, posterFullName}: ItemProps) => (
  <View style={styles.container}>

  <View style={styles.headContainer}>
  <FontAwesome name="user"  color="#FFFFFF" size={30}/>
  <View>
  <Text style={styles.mainText}>{posterFullName}</Text>
  <Text style={styles.postText}>{posterAddress}</Text>
  </View>

  <View style={styles.icons}>
<Pressable onPress={() => {
   setCurrentPostId(id); 
   setPostDetails(postDetails)
   setPostImage(postImage)
   setPosterFullName(posterFullName)
   setPosterAddress(posterAddress)
  setModalVisible(true)}}>
<Ionicons name="create-outline" size={30} color="white"></Ionicons>
</Pressable>

<Pressable onPress={() => deleteDocument(id)}>
<Ionicons name="trash-outline" size={30} color="red"></Ionicons>
</Pressable>
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
    
    <View>

      <FlatList 
      data={posts}
      renderItem={({item} ) => (
        <RenderItem
        id={item.id}
        postImage={item.postImage}
        postDetails={item.postDetails}
        posterFullName={item.posterFullName}
        posterAddress={item.posterAddress}
        />
      )}
      keyExtractor={(item) => item.id}
    /> 


<Modal
      animationType="fade"
      transparent={false}
      visible={modalVisible}
      >
        <View style={styles.modal}>

          <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Update your community post</Text>
          <Text style={styles.inputHeadertxt}>Post Image</Text>
          <TextInput 
          value={postImage} 
          onChangeText={(val) => setPostImage(val)}
          style={styles.input}
          />
          <Text style={styles.inputHeadertxt}>Post Details</Text>
          <TextInput 
          value={postDetails} 
          onChangeText={(val) => setPostDetails(val)}
          style={styles.input}
          />
          <Text style={styles.inputHeadertxt}>Poster Fullname</Text>
          <TextInput 
          value={posterFullName} 
          onChangeText={(val) => setPosterFullName(val)}
          style={styles.input}
          />
          <Text style={styles.inputHeadertxt}>Poster Address</Text>
          <TextInput 
          value={posterAddress} 
          onChangeText={(val) => setPosterAddress(val)}
          style={styles.input}
          />
            <Pressable 
            style={styles.addEventBtn} 
            onPress={() => {
              if (currentPostId) {
                updateData(currentPostId);
              }
              setModalVisible(false);
            }
              }>
              <Text style={styles.addEventBtnText}>Update Event</Text>
            </Pressable>
          </View>

          <Pressable style={styles.modalClose} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalText}>Close</Text>
          </Pressable>

        </View>
      </Modal>


    </View>
  
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
    gap:20,
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
  icons:{
    flexDirection:"row",
    position:"absolute",
    padding:10,
    gap:8,
    right:1,
    top:0
  },
  modal:{
    padding:20,
    // backgroundColor:"#050608",
    flex:1
  },
  modalText:{
    // color:"white"
  },
  modalClose:{
    position:"absolute",
    right:20,
    top:20
  },
  modalContainer:{
    // color:"white", 
    flex:1,
    marginVertical:50
  },
  addEventBtn:{
    backgroundColor: "#D6578C",
    borderRadius: 7,
    padding:15,
    width:"50%",
    alignItems:"center",
    alignSelf:"center"
  },
  addEventBtnText:{
    color:"white",
    fontSize:20
  },
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 6,
    marginBottom: 20,
    backgroundColor: "#efefef",
    borderRadius: 6,
},
inputHeadertxt:{
  marginBottom: 10,
},
});