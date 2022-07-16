import { FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button, Divider, Title } from "react-native-paper";
import { auth } from '../firebase';
 
export default function SignUp(props:any) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (usermail: any,password: any)=>{
    console.log(usermail+' heer '+password)
    if(usermail.trim()!=="" &&    password.trim()!==""){
      auth.createUserWithEmailAndPassword(usermail,password).then((userCredentials: { user: any; }) =>{
       const user = userCredentials.user;
       console.log(user.email); 
      }).catch((error: { message: any; })=>alert(error.message))
    }else{
      alert('please fill in the form first')
    }
    props.hideDialog();
   }

  return (
    <View style={styles.container}>
     <Title style={{margin:20}}><FontAwesome5 name='user' size={20}/> Sign Up</Title>
       <Divider/>
      <StatusBar style="auto" />

      {/* <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Surname"
          placeholderTextColor="#003f5c"
          onChangeText={(surname) => setSurname(surname)}
        />
      </View> */}

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
        <Button onPress={()=>handleSignUp(email,password)} mode="outlined">SIGNUP</Button>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin:10
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