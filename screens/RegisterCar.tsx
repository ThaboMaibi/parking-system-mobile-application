import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import db from '../firebase';
import firebase from "firebase/compat";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Avatar, Button, Card, Title, Paragraph, Divider,List, Dialog, Portal, Colors, IconButton } from 'react-native-paper';


const LeftContent = (props:any) => <Avatar.Text size={50} label="T" />





export default function RegisterCar(props:any) {
  const [visible, setVisible] = React.useState(false);
  const [CarId, setCarId] = React.useState('');
  const user = localStorage.getItem('Parking_user');
  const data=props.info;
  const showDialog = (id: any) =>{ 
                          setVisible(true);
                          setCarId(id)
                        };
  const hideDialog = () => setVisible(false);
  const deleteCar=()=>{
    setVisible(false);
    db.collection('car').doc(CarId).delete().then(()=>{
      alert('successfully deleted a car');
    }).catch((error) => {
      console.error("Error removing document: ", error);
      });
  }
  function logout(){
    firebase.auth().signOut().catch(err=>{
     alert(err);
    });
 }
 const RightIcon = (props:any) => <IconButton icon="lock" size={20} 
onPress={()=>{logout()}}
/>
  return (
    <View>
    <Card>
      <Card.Title title={user} left={LeftContent} right={RightIcon}/>
      <Card.Content>
        <Divider style={{marginTop:10}}/>
        <Title style={{marginTop:10}}>List of registered cars</Title>
        {data?.map((car:any)=>{
          return(
            <List.Item
              key={car.data?.Licence_plate}
              title={car.data?.Licence_plate}
              description={car.data?.Model}
              left={props => <Avatar.Icon size={40}  icon="car" />}
              right={props => <IconButton icon="delete" size={20} color={Colors.red500} 
              onPress={()=>{showDialog(car.data)}}
              />}
            />
          )
        })}
      </Card.Content>
      <Card.Actions>
        <Button icon="plus-circle" mode="outlined" onPress={()=>props.showDialog()}>Add a car</Button>
      </Card.Actions>
    </Card>
      <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Remove this car?</Dialog.Title>
            <Dialog.Actions>
              <Button onPress={hideDialog} mode='outlined' style={{marginRight:5}}>cancel</Button>
              <Button onPress={deleteCar} mode='outlined'>yes</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
   </View>
  );
}

