import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
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
  };

  const RenderItem = ({ eventTitle, eventVenue, eventDate }: ItemProps) => (
    <View style={styles.itemContainer}>
      <Text style={styles.eventTitle}>{eventTitle}</Text>
      <Text style={styles.eventVenue}>{eventVenue}</Text>
      <Text style={styles.eventDate}>{eventDate}</Text>
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
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#050608",
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  eventVenue: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: "#999",
  },
});
