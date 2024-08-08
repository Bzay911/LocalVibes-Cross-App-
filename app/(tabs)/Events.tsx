import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import UpcomingEvents from '@/components/upcomingEvents'

export default function Events(props: any) {
 
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Events Page</Text>
    <UpcomingEvents />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
