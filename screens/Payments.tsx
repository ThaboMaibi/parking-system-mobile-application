import React from 'react';
import SearchBar from './SearchBar';
import { BottomNavigation, Dialog, Portal, TextInput, Button, Card, Title, Paragraph, List, Headline } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { addListener } from 'expo-updates';
import { FontAwesome, EvilIcons } from '@expo/vector-icons';
import db from '../firebase';
import firebase from "firebase/compat";



const AlbumsRoute = () => {
  return(
    <ScrollView>
      <Paragraph style={{textAlign:'center',margin:10,padding:10,backgroundColor:'white',fontSize:15}}>
         Dear customer,note that only the following methods of payment are supported
        </Paragraph>
        <Card style={{margin:'2%',borderRadius:10}}>
          <Card.Title title="Mpesa" />
        </Card>
        <Card style={{margin:'2%',borderRadius:10}}>
          <Card.Title title="Ecocash" />
        </Card>
        <Card style={{margin:'2%',borderRadius:10}}>
          <Card.Title title="Cpay" />
        </Card>
        <Card style={{margin:'2%',borderRadius:10}}>
          <Card.Title title="STD bank" />
        </Card>
        <Card style={{margin:'2%',borderRadius:10}}>
          <Card.Title title="FNB" />
        </Card>
</ScrollView>
  )
};

const right = (props:any)=><List.Icon icon="delete"/>;

const RecentsRoute = () => {
  return(
    <ScrollView>
  <Card style={{margin:'2%',borderRadius:10}} >
    <Card.Title title="NUL parking" subtitle="29-03-2022" right={right}/>
    <Card.Content >
      <Paragraph>payed : M30</Paragraph>
    </Card.Content>
  </Card>
  <Card style={{margin:'2%',borderRadius:10}} >
    <Card.Title title="NUL parking" subtitle="29-03-2022" right={right}/>
    <Card.Content >
      <Paragraph>payed : M30</Paragraph>
    </Card.Content>
  </Card>
  <Card style={{margin:'2%',borderRadius:10}} >
    <Card.Title title="NUL parking" subtitle="29-03-2022" right={right}/>
    <Card.Content >
      <Paragraph>payed : M30</Paragraph>
    </Card.Content>
  </Card>
</ScrollView>
  )
};

function Payments() {
  const [visible, setVisible] = React.useState(false);
  const [info , setInfo] = React.useState([{}]);
  
      React.useEffect(()=>{
        Fetchdata();
      },[])
      // Fetch the required data using the get() method
      const Fetchdata = ()=>{
          db.collection("Payments").get().then((querySnapshot) => {
               const payments: firebase.firestore.DocumentData[] = [];
              // Loop through the data and store
              // it in array to display
              querySnapshot.forEach(element => {
                  var data = element.data();
                  console.log("id of the doc "+element.id)
                  // setInfo(arr => [...arr , data]);
                  payments.push(data);  
              });
              setInfo(payments)
          })
      }
      
  
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Pending', title: 'Pending', icon: 'help' },
    { key: 'methods', title: 'Methods', icon: 'credit-card' },
    { key: 'history', title: 'History', icon: 'history' },
  ]);

  const MusicRoute = () => {
    return(
      <ScrollView>
        {
          info?.map((session:any)=>{
            return(
            <Card style={{margin:'2%',borderRadius:10}} key={session.parkingName}>
            <Card.Content>
              <Title>{session.parkingName}</Title>
              <Paragraph>Duration : {session.duration}</Paragraph>
              <Paragraph>Amount : R{session.amount}</Paragraph>
             </Card.Content>
             <Card.Actions>
              <Button icon='credit-card' mode="contained" onPress={showDialog}>Pay</Button>
              </Card.Actions>
              </Card>
            ) 
          })
        }
      </ScrollView>
        )
  };
  const renderScene = BottomNavigation.SceneMap({
    Pending: MusicRoute,
    methods: AlbumsRoute,
    history: RecentsRoute,
  });
  return (
    <View style={{backgroundColor:'#F7F7F7',height:'100%'}}>
      <SearchBar/>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title style={{textAlign:'center'}}>Choose the payment method</Dialog.Title>
            <Dialog.Content>
            <Card style={{margin:10,borderRadius:10,backgroundColor:'#F7F7F7'}}>
              <Card.Title title="Mpesa" />
            </Card>
            <Card style={{margin:10,borderRadius:10,backgroundColor:'#F7F7F7'}}>
              <Card.Title title="Ecocash" />
            </Card>
            <Card style={{margin:10,borderRadius:10,backgroundColor:'#F7F7F7'}}>
              <Card.Title title="Cpay" />
            </Card>
            <Card style={{margin:10,borderRadius:10,backgroundColor:'#F7F7F7'}}>
              <Card.Title title="STD bank" />
            </Card>
            <Card style={{margin:10,borderRadius:10,backgroundColor:'#F7F7F7'}}>
              <Card.Title title="FNB" />
            </Card>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog} mode='outlined' style={{marginRight:5}}>Cancel</Button>
              <Button onPress={hideDialog} mode='outlined'>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
     </View>
  )
}

export default Payments