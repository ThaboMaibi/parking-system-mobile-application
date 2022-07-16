import { StyleSheet,Image, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Card, Button,Paragraph,Title, Headline, Divider, List, IconButton } from 'react-native-paper';
import SearchBar from './SearchBar';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  // const [loggedIn,setLoggedIn] = useState(false)
  return (
    <View style={{height:'100%'}} >
    <SearchBar/>
       <Divider/>
        <Headline style={{margin:'1%',padding:10,borderColor:'lightgray',fontFamily:'Roboto'}}>Welcome to smart parking app</Headline>
      <Divider/>
      <ScrollView >
    <Card style={{margin:'4%',backgroundColor:'#F7F7F7'}} mode='elevated'>
      <Card.Content>
        <Title>What is smart parking system?</Title>
        <Divider/>
        <Paragraph style={{marginTop:'3%',padding:'2%',textAlign:'center',fontSize:15}}>It is a mobile application designed for 
        both Android and iOS. It contains a raft of features designed to help direct
         motorists to available parking spaces, 
        advise of car park conditions and tariffs, and 
        utilise contactless payment</Paragraph>
      </Card.Content>
    </Card>
    
    <Card style={{margin:'4%'}} mode='outlined'>
      <Card.Content>
        <Title style={{textAlign:'center'}}>Benefits of using this system</Title>
        <Divider/>
        <List.Item
        title="Time"
          description="Save time taken in a random search of a free parking slot"
          left={props => <FontAwesome5 {...props} name="clock" size={25}  />}
        />
        <List.Item
        title="Fuel"
          description="Reduce the amout of fuel waisted while searching for a slot"
          left={props => <FontAwesome5 {...props} name="gas-pump" size={25} />}
        />
        <List.Item
        title="Trafic"
          description="Avoid being stuck in traffic"
          left={props => <FontAwesome5 {...props} name="car" size={25} />}
        />
        <List.Item
        title="Safety"
          description="Your car is safer under the camera survilliances"
          left={props => <FontAwesome5 {...props} name="lock" size={25} />}
        />
      </Card.Content>
    </Card>
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
