import React, {Component} from 'react';
import {Dimensions, findNodeHandle} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { sha512 } from 'react-native-sha512';
import AsyncStorage from '@react-native-community/async-storage';

import {Platform, 
    ActivityIndicator,
    StyleSheet, 
    Text,
    View,
    TextInput,
    TouchableOpacity} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class AccountForm extends React.Component {

    state = {
        email: '',
        username: '',
        password: '',
        response: 'hi',
        loading: false
     }

     handleEmail = (text) => {
        this.setState({ email: text })
     }

     handleUsername = (text) => {
        this.setState({ username: text })
     }

     handlePassword = (text) => {
        sha512(text).then(hash => {
            this.setState({ password: hash })
        }); 
     }

    register(email, username, password) {

        if (!email || !username ||!password) {
            return;
        }

        this.setState({loading: true});                                                                                  
        accountPromise = fetch('https://warm-meadow-74730.herokuapp.com/new-credentials', { //new-credentials
            method: 'GET',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'username':username,
            'passhash':password,
            'email': email
            },
        }).then((promise) => { return promise.json();})
        .then((res) => {
            console.log(res);

            if(res['issue']) {
                this.setState({response: res['issue']});
            }

            if(res['mcookie'] && res['username'] && res['email']) {

                storeData = async () => {
                    try {
                      console.log("HELLO?");
                      await AsyncStorage.setItem('@cookie', res['mcookie']);
                      await AsyncStorage.setItem('@username', res['username']);
                      await AsyncStorage.setItem('@email', res['email']);

                      this.setState({loading: false});
                      this.props.navigation.navigate('Home');
                    } catch (e) {
                      console.log("OOPS");
                    }
                  };

                  storeData();

                return;
            }
            else {
                this.setState({loading: false});
            }

        }).catch((error) => {
            console.log("error : " + error);
        })
        .done();


    }

    render() {
        return <KeyboardAwareScrollView
         scrollEnabled={true}
         enableOnAndroid={true}
         extraHeight={20}
         >

         <View style = {[styles.container, styles.debug]}> 

                <Text style={[styles.title, styles.debug]}>
                    Create Your Account
                </Text>

                <View style={[styles.inputbox, styles.debug]}> 
                    <View style={[styles.subtitlebox, styles.debug]}>
                        <Text style={[styles.subtitle, styles.debug]}>
                            Username
                        </Text>
                    </View>

                    <TextInput style={[styles.debug, styles.entryfield]} adjustsFontSizeToFit={true}
                    placeholder="nickyz"
                    onChangeText = {this.handleUsername}
                    />
                </View>


                <View style={[styles.inputbox, styles.debug]}> 
                    <View style={[styles.subtitlebox, styles.debug]}>
                        <Text style={[styles.subtitle, styles.debug]}>
                            Email
                        </Text>
                    </View>

                    <TextInput style={[styles.debug, styles.entryfield]} adjustsFontSizeToFit={true}
                    placeholder="nicholas.zeppos@gmail.com"
                    onChangeText = {this.handleEmail}/>
                </View>


                <View style={[styles.inputbox, styles.debug]}> 
                    <View style={[styles.subtitlebox, styles.debug]}>
                        <Text style={[styles.subtitle, styles.debug]}>
                            Password
                        </Text>
                    </View>

                    <TextInput style={[styles.debug, styles.entryfield]} secureTextEntry={true} adjustsFontSizeToFit={true}
                    placeholder="password"
                    onChangeText = {this.handlePassword} 
                    />
                </View>

                <View style={[styles.debug, styles.inputbox]}> 
                    <Text style={[styles.debug, {fontSize: 10, fontStyle: 'italic'}]}> {this.state.response} </Text>
                </View>

                {/* to display the loading bar*/}
                {(() => {
                    if (this.state.loading) {
                        return (
                            <View style={[styles.container, styles.overlay]}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        )
                    }
                })()}

                <View style={[styles.inputbox, styles.debug]}> 
                    <TouchableOpacity style={[styles.btnstyle, styles.debug, {backgroundColor: "#ED4337"}]} onPress={() => this.register(this.state.email, this.state.username, this.state.password)} >
                        <Text style={[styles.btntxt, styles.debug, {color: "#FFFFFF"}]}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </KeyboardAwareScrollView>
    }
} 

const styles = StyleSheet.create({
    title : {
        marginBottom: "10%",
        marginTop: "16%",
        alignSelf: 'stretch',
        textAlign: 'center',
        fontFamily: "Roboto",
        fontWeight: "bold",
    },
    subtitle: {
        marginLeft: 10,
        fontSize: 10,
        fontWeight: "bold",
    },
    inputbox: {
        flex: 0,
        width: "100%",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        marginBottom: 25,
        maxHeight: 40,
        height: "5%",
    
      },
      subtitlebox: {
        flex: 0,
        width: "100%",
        flexDirection: 'column',
        justifyContent:'center',
        marginBottom: 10,
        maxHeight: 40,
        height: "5%",
      },
      btnstyle: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        textAlign:'center',
        height: "100%",
        width: "88%",
        borderRadius:30,
      },
      btntxt: {
        fontSize: 8,
        alignSelf: 'stretch',
        textAlign: 'center',
        fontFamily: "Roboto",
        fontWeight: "bold"
      },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
        width: width,
        height: height,
        paddingLeft: 20,
        paddingRight: 20,
      },
      overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
    debug: {
        // borderWidth:1,
        // borderColor:'rgba(0,0,0,1)'
    },
    entryfield: {
        borderWidth: 0.5,
        borderColor:'rgba(0,0,0,0.2)',
        borderRadius: 5,
        width: "94%",
        paddingBottom: 0,
        paddingTop: 0,
        paddingLeft: 10,
        paddingRight: 2,
        height: 25,
        fontSize: 12,
        color: "#000000"
    },
    });