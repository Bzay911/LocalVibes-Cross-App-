import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList,Image } from "react-native";
import { collection, query, onSnapshot } from "firebase/firestore";
import { DbContext } from "@/contexts/DbContext";

type SuggestionsProps = {
  isHorizontal?: boolean;
};

export default function Suggestions({ isHorizontal = false }: SuggestionsProps){
  const db = useContext(DbContext);
  const [organisers, setOrganisers] = useState([]);
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
    setOrganisers(items);
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
  source={{uri:organiserImage}}
  contentFit="cover"
  />
  <Text style = {styles.text}>{organiserUsername}</Text>
</View>
);

    return(

  <FlatList 
         data={organisers}
         horizontal={isHorizontal}
         renderItem={({item} ) => (
           <RenderItem
           organiserImage={item.organiserImage}
           organiserUsername={item.organiserUsername}
            
           />
         )}
         keyExtractor={(item) => item.id}
       />  

    )

}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 15,
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