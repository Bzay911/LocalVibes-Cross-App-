import {Text, View, StyleSheet, Pressable, Dimensions,ScrollView} from 'react-native'
import {Image} from 'expo-image'
import UpcomingEvents from '@/components/UpcomingEvents'
import Suggestions from '@/components/Suggestions'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useState , useEffect} from 'react'
import { Link } from 'expo-router'
import { DbContext } from '@/contexts/DbContext'
import { doc, getDoc } from 'firebase/firestore';


const {width} = Dimensions.get('window')

export default function Main(props: any){
  const auth = useContext( AuthContext )
  const db = useContext(DbContext);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (auth?.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFirstName(userData.userFirstName || "guest");
        }
      }
    };

    fetchUserDetails();
  }, [auth, db]);

    return(
      // <ScrollView contentContainerStyle = {styles.scrollContainer}>
      
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome {firstName},</Text>

            <View style={styles.titleAlignment}>
            <Text style={styles.mainTexts}>Featured Events</Text>
            <Text style={styles.viewText}>view all</Text>
            </View>

            <Image 
            style ={styles.image}
            source={"https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=800"}
            contentFit="cover"/>

            <View style={styles.titleAlignment}>
            <Text style={styles.mainTexts}>Upcoming Events</Text>
            <Link href="/upcoming">
            <Text style={styles.viewText}>view all</Text>
            </Link>
            </View>

        <UpcomingEvents />
    
          <View style={styles.titleAlignmentOrg}>
        <Text style={styles.mainTexts}>Suggested Organisers</Text>
        <Link href="/suggestedOrganisers">
            <Text style={styles.viewText}>view all</Text>
            </Link>
          </View>
        <View style={styles.organiserTab}>
          {/* <ScrollView horizontal={true}> */}
        <Suggestions isHorizontal={true}/>
               
        </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#050608",
        flex:1
    },
    image: {
        width: width,  
        height: width * 0.7 * 0.75, 
        marginRight: 2,
        borderRadius:5,
        borderColor: "#FFFFFF",
        borderWidth: 1, 
        marginBottom:12
      },

      mainTexts:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "#FFFFFF",
        margin: 12
      }, 
      
      welcomeText:{
        color:"#FF64A5",
        fontSize: 16,
        margin:12

      },
      viewText:{
        color: "#FF64A5",
        fontSize: 14
      },
      titleAlignment:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 190
      },
      titleAlignmentOrg:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 150
      },
      organiserTab:{
        flexDirection: "row",
        margin:5
      },
      scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#050608",
        paddingBottom: 20
      },
    
})