'use strict';
import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Component} from 'react';
import { StackNavigator } from 'react-navigation';
class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.mainBody}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{marginTop: 100}}>
            <KeyboardAvoidingView enabled>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={require('../Image/99coffee.png')}
                  style={styles.img}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  value={this.state.username}
                  onChangeText={(username) =>
                    this.setState({username: username})
                  }
                  placeholder=" Enter Username"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  value={this.state.password}
                  onChangeText={(password) =>
                    this.setState({password: password})
                  }
                  secureTextEntry={true}
                  underlineColorAndroid="#FFFFFF"
                  placeholder="Enter Password"
                  keyboardType="default"
                />
              </View>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={this.test}>
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>this.props.navigation.navigate("Register")}>
                <Text style={styles.registerTextStyle}>
                  New Here ? Register
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      username: 'sa',
      password: 'sa',
    };
    this.test = this.test.bind(this);
  }
  test = () => {
    console.log(this.state.username);
    fetch('http://localhost:8888/api/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((res1) => {
        console.log(res1);
        if (res1.status === 1) {
          var username = res1.message;

          AsyncStorage.setItem('username', username);

		  this.props.navigation.navigate("User1");
        } else {
          alert(res1.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
}
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'black',
  },
  registerTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  img: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
    margin: 30,
  },
});
