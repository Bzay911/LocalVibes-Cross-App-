import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const TabsLayout = () => {
    return <Tabs screenOptions={{ tabBarActiveTintColor: "#FF64A5" }}>
        <Tabs.Screen name="Home" options={{
            headerShown: false,    
            tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),}}/>

        <Tabs.Screen name="Events" options={{
            tabBarIcon: ({ color }) => (
            <FontAwesome name="calendar" size={24} color={color} />
          ),}}/>

        <Tabs.Screen name="Community" options={{
            tabBarIcon: ({ color }) => (
            <FontAwesome name="group" size={24} color={color} />
          ),}}/>

        <Tabs.Screen name="Profile" options={{
            tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),}}/>

        
    </Tabs>
}

export default TabsLayout;