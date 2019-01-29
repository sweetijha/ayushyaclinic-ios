import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableHighlight,
  KeyboardAvoidingView,
  ScrollView,
  Animated,
  Keyboard,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Constants } from 'expo';
import { Header } from 'react-native-elements';
import { width, height, totalSize } from 'react-native-dimension';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';

import { createStackNavigator } from 'react-navigation';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Current_Token extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      allTokens: [],
      current_token: 'NA',
      noTokenFlag : false,
      noTokenMsg : 'dd',
      user_id:''
    };
    this.getCurrentToken();
    AsyncStorage.getItem("loginData").then((value) => {
      // alert(value)
        if(value == null){
           this.setState({
             loggedIn : false
           });
        }
        else{
          this.setState({
             loggedIn : true,
             user_id : JSON.parse(value).user_id
           });
        }
        this.getToken();
    }).done();
    
    
  }
  navigateToTokenform() {
    this.props.navigation.navigate('Token_form');
  }
  refreshToken(){
    this.getToken();
    this.getCurrentToken();
  }
  getToken() {
    // alert(this.state.phone)
    fetch('http://softbizz.in/Ayushya-clinic/api/public/getTokenDetailsBydate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          user_id: this.state.user_id
      }),
    })  
      .then(response => response.json())
      .then(responseJson => {
        // alert(JSON.stringify(responseJson))
        var allT = [];
        if(responseJson.error){
          this.setState({
            noTokenFlag : true,
            noTokenMsg : responseJson.data
          });
        }else{
          this.setState({
            noTokenFlag : false
          });
          for (let i = 0; i < responseJson.data.length; i++) {
          allT.push(
            <View style={styles.token}>
              <View style={{ flexDirection: 'row', width: 'auto' }}>
                <Text style={styles.text}>Token ID :</Text>
                <Text style={styles.id}>
                  #{responseJson.data[i].token_number}
                </Text>
              </View>
              <View
                style={{
                  alignSelf: 'flex-end',
                  width: 'auto',
                  position: 'absolute', 
                  right: 10,
                  top: 10,
                }}>
                <Text style={{ color: '#2782d2', fontSize: 22 }}>
                  {responseJson.data[i].start_time}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginTop: 2, marginLeft: 15 }}>
                  {responseJson.data[i].name}
                </Text>
              </View>
              <View
                style={{
                  alignSelf: 'flex-end',
                  width: 'auto',
                  position: 'absolute', 
                  right: 10,
                  bottom: 10,
                }}>
                <Text style={{ color: 'green'}}>
                  {responseJson.data[i].status=='Completed'?responseJson.data[i].status:''}
                </Text>
              </View>
            </View>
          );
        }
        }
        
        // alert(this.state.current_token);
        this.setState({ allTokens: allT });
      })
      .catch(error => {});
  }
  getCurrentToken() {
    // alert(this.state.phone)
    fetch('http://softbizz.in/Ayushya-clinic/api/public/GetAllToken', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })  
      .then(response => response.json())
      .then(responseJson => {
        
        if (responseJson.current.length > 0) {
          this.setState({
            current_token: responseJson.current[0].token_number,
          });
        } else {
          this.setState({
            current_token: 'NA',
          });
        }
        // alert(this.state.current_token);
      })
      .catch(error => {});
  }
  render() {
    return (
      <View
        style={{
          height: deviceHeight,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <View style={{ width: deviceWidth }}>
          <View>
            <Header
              backgroundColor="#2782d2"
              rightComponent={{
                icon: 'refresh',
                color: 'white',
                onPress: () => this.refreshToken(),
              }}
              leftComponent={{
                icon: 'keyboard-backspace',
                color: 'white',
                onPress: () => this.props.navigation.navigate('Home'),
              }}
              centerComponent={{
                text: 'Current Token',
                style: { color: '#ffffff', fontSize: 22 },
              }}
            />
          </View>
        </View>
        <View
          style={{
            borderRadius:
              Math.round(
                Dimensions.get('window').width + Dimensions.get('window').height
              ) / 2,
            width: Dimensions.get('window').width * 0.5,
            height: Dimensions.get('window').width * 0.5,
            backgroundColor: '#FF0000',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 50,
            marginTop: 40,
          }}>
          <Text style={{ fontSize: 40, color: 'white' }}>
            {this.state.current_token}
          </Text>
        </View>
        <ScrollView
          style={{
            position: 'relative',
            top: Dimensions.get('window').width * 0.5 + 30,
            height:
              Dimensions.get('window').height -
              Dimensions.get('window').width * 0.5 -
              50,
            width: Dimensions.get('window').width,
            paddingBottom: 200,
            backgroundColor: 'white',
          }}>
          {
            this.state.noTokenFlag?
            <View style={styles.noToken}>
              <Text style={{fontSize : 20}}>{this.state.noTokenMsg}</Text>
            </View>
            :
            <View>
            {this.state.allTokens}

            <View style={{ height: 220 }} />
          </View>
          }
          
        </ScrollView>
        <TouchableOpacity
          style={{
            padding: 10,
            alignItems: 'center',
            width: Dimensions.get('window').width,
            backgroundColor: '#2782d2',
            marginTop: 21,
          }}
          onPress={this.navigateToTokenform.bind(this)}>
          <Text style={{ fontSize: 18, color: 'white' }}>Take a Token</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  token: {
    width: deviceWidth - 20,
    marginLeft: 10,
    backgroundColor: '#efefef',
    marginTop: 15,
    height: 70,
    borderLeftWidth: 4,
    borderColor: '#2782d2',
  },
  text: {
    marginTop: 8,
    marginLeft: 10,
    fontSize: 24,
    color: '#2782d2',
  },
  id: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  noToken:{
    alignItems:'center',
    marginTop:50
  }
});
export default Current_Token;
