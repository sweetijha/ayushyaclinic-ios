import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import AppNavigator from './AppNavigator';
import { MaterialIcons } from '@expo/vector-icons';
import { Font, AppLoading, Permissions, Notifications } from 'expo';

import {
  createStackNavigator,
} from 'react-navigation';


export default class App extends React.Component {
  constructor(props){
    super(props);
  }
  async registerForPushNotifications() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
    }
  
    const token = await Notifications.getExpoPushTokenAsync();
  
    this.subscription = Notifications.addListener(this.handleNotification);
  
    this.setState({
      token,
    });
  }
  async componentWillMount() {
    await Font.loadAsync({'MaterialIcons': require('@expo/vector-icons/fonts/MaterialIcons.ttf')})
  }
  render() {
    StatusBar.setBarStyle('dark-content', true);
    return <AppNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
