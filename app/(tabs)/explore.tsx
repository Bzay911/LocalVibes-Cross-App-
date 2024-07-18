import { StyleSheet, Image, Platform, SafeAreaView, Text } from 'react-native';
import { Link } from 'expo-router';

export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <Text>this is explore </Text>
      <Link href="/">
      <Text>Go to home</Text>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
