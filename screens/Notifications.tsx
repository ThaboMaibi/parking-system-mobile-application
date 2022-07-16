import React from 'react';
import SearchBar from './SearchBar';
import { List, Paragraph } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import db from '../firebase';
import firebase from "firebase/compat";

function Notifications() {
  const [expanded, setExpanded] = React.useState(true);

  const [info , setInfo] = React.useState([{}]);
  
      React.useEffect(()=>{
        Fetchdata();
      },[])
      // Fetch the required data using the get() method
      const Fetchdata = ()=>{
          db.collection("Notifications").get().then((querySnapshot) => {
               const notifications: firebase.firestore.DocumentData[] = [];
              // Loop through the data and store
              // it in array to display
              querySnapshot.forEach(element => {
                  var data = element.data();
                  console.log("id of the doc "+element.id)
                  // setInfo(arr => [...arr , data]);
                  notifications.push(data);  
              });
              setInfo(notifications)
          })
      }
      console.log(info);
      

  const handlePress = () => setExpanded(!expanded)
  return (
    <View style={{backgroundColor:'#F7F7F7',height:'100%'}}>
      <SearchBar/>
      <ScrollView>
        {info?.map((notification:any)=>{
          return(
            <List.Section style={{backgroundColor:'white',margin:'2.5%',borderRadius:10}} key={notification.message}>
            <List.Accordion
                title={notification.message}
                style={{backgroundColor:'white'}}>
                <Paragraph style={{marginLeft:15}}>{notification.message}</Paragraph>
              </List.Accordion>
            </List.Section>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Notifications