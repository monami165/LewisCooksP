import React, {Component} from 'react';
import {Platform, 
    Image,
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity} from 'react-native';


export default class LoginOptions extends React.Component{
  render() {
    var values = [
    "Sometimes, Rocket Subs just doesn't cut it", 
    "Bringing back cups that are bigger than the ones in Rand",
    "The taste of Nashville just got a lot better",
    "Relax... you don't have to guess what's in the Pub Special anymore",
    "Now every day can be Tortellini Tuesday",
    "For when you realize Commons is for commoners"];


    return (
      <View style={[styles.debug, styles.container]}> 
        <View style={[styles.debug, styles.loginchoice]}>

        <View style={[styles.debug, styles.logobox]}>
          <Image 
          style={{width:"100%", height:"100%", resizeMode: 'contain'}}
          source={require('../../resources/images/logo.png')} />
        </View>


        <Text style={[styles.quotebox, styles.debug]}> {values[Math.floor(Math.random()*values.length)]} </Text>

          <View style={[styles.btnpadding, styles.debug]}> 
            <TouchableOpacity  style={[styles.btnstyle, styles.debug, {backgroundColor: "#ED4337"}]} onPress={()=>{this.props.navigation.navigate('AccountCreate')}}> 
            <Text style={[styles.btntxt, styles.debug, {color: "#FFFFFF"}]}>SIGN UP FOR FREE</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.btnpadding, styles.debug]}>
            <TouchableOpacity style={[styles.btnstyle, styles.debug, {backgroundColor: "#3C5A99"}]}>
            <Text  style={[styles.btntxt, styles.debug, {color: "#FFFFFF"}]}>SIGN IN WITH FACEBOOK</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.btnpadding, styles.debug]}> 
            <TouchableOpacity style={[styles.btnstyle, styles.debug, {backgroundColor: "#FFFFFF"}]}>
            <Text style={[styles.btntxt, styles.debug, {color: "#000000"}]}>LOG IN</Text>
            </TouchableOpacity>
          </View>
      
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginchoice: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logobox: {
    height: 80,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 90, // bizarre behavior with percentages here
  },
  quotebox: {
    flex: 0,
    flexDirection: 'column',
    height: 40,
    textAlign:'center',
    marginBottom: "35%",
  },
  btnpadding: {
    flex: 0,
    width: "100%",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 4,
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
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  debug: {
    // borderWidth:1,
    // borderColor:'rgba(0,0,0,1)'
  }
});