import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { collection, query, onSnapshot } from "firebase/firestore";
import { DbContext } from "@/contexts/DbContext";

export default function Events(props: any) {
  const db = useContext(DbContext);

  const [events, setEvents] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      fetchData();
      setLoaded(true);
    }
  }, [loaded]);

  const fetchData = () => {
    const q = query(collection(db, "events"));
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
    eventTitle: string;
    eventVenue: string;
    eventDate: string;
    eventImage: string
  };

  const RenderItem = ({ eventTitle, eventVenue, eventDate, eventImage }: ItemProps) => (
    <View style={styles.eventContainer}>

    <View>
      <Image 
  style ={styles.image}
  source={{uri: eventImage}}
  contentFit="cover"
  />
    </View>

    <View style={styles.itemContainer}>
      <Text style={styles.eventTitle}>{eventTitle}</Text>
      <Text style={styles.eventVenue}>{eventVenue}</Text>
      <Text style={styles.eventDate}>{eventDate}</Text>
    </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <RenderItem
            eventTitle={item.eventTitle}
            eventVenue={item.eventVenue}
            eventDate={item.eventDate}
            eventImage={item.eventImage}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#050608", 
  },
  eventContainer:{
    flexDirection:"row",
    alignItems:"center",
  },

  listContent: {
    paddingVertical: 16, 
  },

  itemContainer: {
    backgroundColor: "#301A25",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 8,
    flex:1
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  eventVenue: {
    fontSize: 16,
    marginBottom: 4,
    color: "white",
  },
  eventDate: {
    fontSize: 14,
    color: "#999",
  },
  image: {
    width: 105,  
    height: 100, 
    margin: 12,
    borderRadius:5,
    borderColor: "#FFFFFF",
    borderWidth: 1
  },
});
