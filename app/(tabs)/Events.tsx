import React, { useContext, useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import UpcomingEvents from '@/components/upcomingEvents'

export default function Events(props: any) {
 
  return (
    <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.header}>Events Page</Text>
    <UpcomingEvents />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      flexGrow: 1,
      padding: 16,
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
    },
    scrollContainer: {
      flex: 1,
      backgroundColor: "#050608",
    },
  });
