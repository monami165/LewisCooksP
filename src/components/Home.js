import React, {Component} from 'react';
import { Text, View } from 'react-native';
import {verifyCookie} from '../functions/verifyLogin'

export default class Home extends React.Component {

    state =  {
        isLoggedIn: false
    }

    render() {
        
        return (<View>
                <Text>WELCOME BB</Text>
        </View>);
    }
}