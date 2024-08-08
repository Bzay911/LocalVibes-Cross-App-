import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList,Image } from "react-native";
import { collection, query, onSnapshot } from "firebase/firestore";
import { DbContext } from "@/contexts/DbContext";


export default function Suggestions(){
  const db = useContext(DbContext);
  const [events, setEvents] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      fetchData();
      setLoaded(true);
    }
  }, [loaded]);

  // Fetching data from firestore
const fetchData = () => {
  const q = query(collection(db, "organisers"));
  const unsub = onSnapshot(q, (querySnapshot) => {
    let items: any = [];
    querySnapshot.forEach((doc) => {
      let item = doc.data();
      item.id = doc.id;
      items.push(item);
    });
    setEvents(items);
  });

  return () => unsub();
};

type ItemProps = {
  organiserImage: string;
  organiserUsername: string;
  
};

const RenderItem = ({ organiserImage, organiserUsername}: ItemProps) => (
  <View style = {styles.itemContainer}>
  <Image 
  style ={styles.image}
  source={organiserImage}
  contentFit="cover"
  />
  <Text style = {styles.text}>{organiserUsername}</Text>
</View>
);

    return(
<View>
  <FlatList 
         data={events}
         horizontal={true}
         renderItem={({item} ) => (
           <RenderItem
           organiserImage={item.organiserImage}
           organiserUsername={item.organiserUsername}
            
           />
         )}
         keyExtractor={(item) => item.id}
       />  
</View>
    )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'column'
  },
    itemContainer: {
        flexDirection: 'column',
        padding: 5,
        alignItems:"center"
      },

      image: {
        width: 105,  
        height: 100, 
        marginRight: 10,
        borderRadius:5,
        borderColor: "#FFFFFF",
        borderWidth: 1
      },
      text:{
        color:"#FFFFFF",
      },
      
})