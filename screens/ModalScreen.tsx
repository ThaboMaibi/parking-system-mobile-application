import React, { useEffect, useState } from "react";
import { ScrollView, View,TextInput,StyleSheet } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import RegisterCar from './RegisterCar';
import db from '../firebase';
import firebase from "firebase/compat";
function ModalScreen(props:any) {
    const user = localStorage.getItem('Parking_user');
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState(user);
    const [licencePlate, setlicencePlatee] = useState("");
    const [model, setModel] = useState("");
    const [info , setInfo] = useState([{},{}]);

    useEffect(()=>{
      Fetchdata();
    },[])

    const showDialog = () => setVisible(true);

    window.addEventListener('load', () => {
      Fetchdata();
    });
    // Fetch the required data using the get() method
    const Fetchdata = ()=>{
      
        db.collection("car").get().then((querySnapshot) => {
             const cars: firebase.firestore.DocumentData[] = [];
            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var data = element.data();
                var object ={
                  'data':data,
                  'id': element.id
                }
                if(data.Email===user){
                  cars.push(object); 
                }
                // setInfo(arr => [...arr , data]);
                 
            });
            setInfo(cars)
        })
    }
    const sub = () => {
        
      // Add data to the store
      db.collection("car").add({
          Email: email,
          Model: model,
          Licence_plate: licencePlate
      })
      .then((docRef) => {
          alert("Data Successfully Submitted");
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    setVisible(false);
    Fetchdata();
  }    
  
    const hideDialog = () => setVisible(false);
  return (
    <ScrollView>
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={{textAlign:'center'}}>Register a car</Dialog.Title>
          <Dialog.Content>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Licence plate"
          placeholderTextColor="#003f5c"
          onChangeText={(number) => setlicencePlatee(number)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Car Model"
          placeholderTextColor="#003f5c"
          onChangeText={(model) => setModel(model)}
        />
      </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} mode='outlined' style={{marginRight:5}}>Cancel</Button>
            <Button onPress={sub} mode='outlined'>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
      <RegisterCar showDialog={showDialog} info={info}/>
    </ScrollView>
  )
}

const styles =StyleSheet.create({
  inputView: {
    backgroundColor: "lightgray",
    width: "100%",
    height: 45,
    marginBottom: 20,
    borderRadius:10,
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginTop: 5,
  },
})
export default ModalScreen