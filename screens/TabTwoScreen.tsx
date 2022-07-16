import { ScrollView, StyleSheet } from 'react-native';
import { useState,useEffect } from 'react';
import db from '../firebase';
import firebase from "firebase/compat";
import { Button, Card, Paragraph, Title,Avatar, Divider, IconButton,Colors } from 'react-native-paper';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import SearchBar from './SearchBar';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';

const LeftContent = (props:any) => <FontAwesome name="automobile" size={33}/>
const rightContent = (props:any) => <EvilIcons name="location" size={30} style={{marginRight:'5%'}}/>

export default function TabTwoScreen() {
  const [info , setInfo] = useState([{}]);
  
  useEffect(()=>{
        Fetchdata();
      },[])
      // Fetch the required data using the get() method
      const Fetchdata = ()=>{
          db.collection("parkinglots").get().then((querySnapshot) => {
               const cars: firebase.firestore.DocumentData[] = [];
              // Loop through the data and store
              // it in array to display
              querySnapshot.forEach(element => {
                  var data = element.data();
                  // setInfo(arr => [...arr , data]);
                  cars.push(data);  
              });
              setInfo(cars)
          })
      }
  return (
    <View style={{backgroundColor:'#F7F7F7',height:'100%'}}>
      <SearchBar/>
      <ScrollView>
        {info?.map((lot:any)=>{
          return(
            <Card style={{margin:5}} key={lot.name}>
             <Card.Title title={lot.name}  subtitle="09:00-17:00" left={LeftContent} right={rightContent} />
             <Card.Content style={{marginLeft:10}}>
               <Paragraph>Total Slots: {lot.totalSlots} </Paragraph>
               <Paragraph>Free Slots: {lot.freeSlots} </Paragraph>
             </Card.Content>
             <Divider/>
             <Card.Actions>
              <IconButton icon="phone" size={20} />
              <IconButton icon="chat" size={20} />
              <IconButton icon="email" size={20} />
             </Card.Actions>
           </Card>
          )
        })}
    </ScrollView>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
