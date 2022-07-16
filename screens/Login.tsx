import { FontAwesome5 } from "@expo/vector-icons";
import { Link,useNavigation } from "@react-navigation/native";
// import {  useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button, Dialog, Divider, Portal, Title } from "react-native-paper";
import { auth } from '../firebase';
import Navigation from "../navigation";
import { RootStackScreenProps } from '../types';
import SignUp from "./SignUp";


export default function Login(props:any,{navigation}:RootStackScreenProps<'Login'>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleLogIn = ()=>{
    console.log(email,password);
    
    auth.signInWithEmailAndPassword(email,password).then((userCredentials: { user: any; }) =>{
     const user = userCredentials.user;
     console.log(user.email); 
    }).catch((error: { message: any; })=>alert(error.message))
  }

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        const email = user.email;
        localStorage.setItem("Parking_user",JSON.stringify(email));
        props.changeState();
      }
    })
  },[])
 
  return (
    <View style={styles.container}>
     <Title style={{margin:20}}><FontAwesome5 name='user' size={20}/> Login</Title>
       <Divider/>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
        <Button onPress={handleLogIn} mode="outlined">LOGIN</Button>
 
      <TouchableOpacity>
        <Button style={{margin:10}} onPress={showDialog} mode="outlined">Sign Up</Button>
      </TouchableOpacity>
      <Portal>
          <Dialog visible={visible} style={{height:'100%',width:'100%',marginRight:'10%'}} onDismiss={hideDialog}>
            <Dialog.Content>
              <SignUp hideDialog={hideDialog}/>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog} mode="outlined" style={{marginRight:"30%"}}>Back To Login</Button>
            </Dialog.Actions>
          </Dialog>
      </Portal>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  inputView: {
    backgroundColor: "lightgray",
    width: "60%",
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
 
  loginBtn: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF1493",
  },
});