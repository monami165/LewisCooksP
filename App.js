// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

import React, {Component} from 'react';
import LoginOptions from "./src/components/Login";
import AccountCreationPage from "./src/components/AccountCreate";
import HomeScreen from "./src/components/Home"
import {Platform, StyleSheet, Text, View} from 'react-native';

import {createStackNavigator,
  createAppContainer} from 'react-navigation';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

const AppNavigator = createStackNavigator(
    {
     Login: {
       screen: LoginOptions,
      navigationOptions: {
        header: null,
      }
    },
     AccountCreate: {
       screen: AccountCreationPage,
       navigationOptions: {
        header: null,
      },
      },
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          header: null,
        },
      },
    },
    {
      initialRouteName: "Login"
    }
  );

    const AppContainer = createAppContainer(AppNavigator);

  export default class App extends React.Component {
    render() {
      return <AppContainer/>;
    }
  }
