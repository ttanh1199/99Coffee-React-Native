'use strict';
import React from 'react';
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
} from 'react-native';
import {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      fullName: '',
      address: '',
      phone: '',
      email: '',
      old: '',
      new1: '',
      new2: '',
    };
    this.update = this.update.bind(this);
  }
  componentDidMount() {
    this.loadData().done();
  }
  loadData = async () => {
    var values = await AsyncStorage.getItem('username');
    var url = 'http://localhost:8888/api/user/' + values;
    console.log(url);
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res1) => {
        console.log(res1);
        this.setState({
          username: res1.username,
          password: res1.password,
          phone: res1.phone,
          fullName: res1.fullName,
          address: res1.adress,
        });
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  update = () => {
    if (this.state.old === this.state.password) {
      if (this.state.new1 === this.state.new2) {
        var url = 'http://localhost:8888/api/user/' + this.state.username;
        console.log(url);
        fetch(url, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: this.state.new2,
            adress: this.state.address,
            email: this.state.email,
            phone: this.state.phone,
            fullName: this.state.fullName,
          }),
        })
          .then((res) => res.json())
          .then((res1) => {
            console.log(res1);
            if (res1.status === 1) {
              alert('Đổi mật khẩu thành công');
              this.props.navigation.popToTop();
            } else {
              alert('Đổi mật khẩu thất bại');
            }
          })
          .catch((err) => {
            console.log(err);
            alert(err);
          });
      } else {
        alert('Mật khẩu không khớp !!!');
      }
    } else {
      alert('Nhập sai mật khẩu !!!');
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../Image/99coffee.png')}
              style={styles.img}
            />
            <Text style={styles.name}>Change Password</Text>
          </View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={this.state.old}
                onChangeText={(password) => this.setState({old: password})}
                secureTextEntry={true}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter Password"
                keyboardType="default"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={this.state.new1}
                onChangeText={(password) => this.setState({new1: password})}
                secureTextEntry={true}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter Password"
                keyboardType="default"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={this.state.new2}
                onChangeText={(password) => this.setState({new2: password})}
                secureTextEntry={true}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter Password"
                keyboardType="default"
              />
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={this.update}>
              <Text style={styles.buttonTextStyle}>Change Password</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
export default ChangePassword;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: 'black',
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
    color: 'white',
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  img: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
    margin: 25,
  },
});
