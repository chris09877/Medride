import React, {Component} from 'react';
import {Platform, Button, StyleSheet, Text, View, FlatList, ProgressBarAndroidComponent} from 'react-native';

export default class Trips extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource:[]
     };
   }
 
  componentDidMount(){
    fetch("https://api.npoint.io/d39a1aae91959ed13fa1")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       dataSource: responseJson
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
    }
 
    render(){
     return(
      <View style={styles.container}>
      <FlatList
         data={this.state.dataSource}
         renderItem={({item}) => 
         <View style={styles.items}>
          <View style={styles.itemtext}>
            <Text style={styles.text}>{item.firstName} {item.lastName}</Text> 
            <Text style={styles.text}>{item.adres} om {item.uur}</Text>
          </View>
          <Button
              title='Route'
              color={'#0ACF83'}
              />
         </View>
        }
       />
      
     </View>
     )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  items: {
    justifyContent: 'center',
    marginTop: 35,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'grey',
  },
  itemtext: {
    paddingBottom: 20,
  },
  text: {
    fontSize: 16,
  }
});