'use strict';
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  TextInput,
  View,
  ScrollView,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
class UserSreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      fullName: '',
      address: '',
      phone: '',
      email: '',
    };
    this.eidt = this.eidt.bind(this);
  }
  componentDidMount() {
    this.loadData().done();
  }
  loadData = async () => {
    var values = await AsyncStorage.getItem('username');
    this.setState({username: values});
    var url = 'http://localhost:8888/api/user/' + this.state.username;
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
  eidt = () => {
    this.props.navigation.navigate('Edit');
  };
  change = () => {
    this.props.navigation.navigate('Change');
  };
  render() {
    console.log(this.props);
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header} />
          <Image
            style={styles.avatar}
            source={require('../../Image/profile.png')}
          />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.fullName}</Text>
              <Text style={styles.info}>@{this.state.username}</Text>
              <View style={styles.SectionStyle}>
                <Text style={styles.text}>Điện thoại:</Text>
                <Text style={styles.description}>{this.state.phone}</Text>
              </View>
              <View style={styles.SectionStyle}>
                <Text style={styles.text}>Địa chỉ:</Text>
                <Text style={styles.description}>{this.state.address}</Text>
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                activeOpacity={0.5}
                onPress={this.eidt}>
                <Text style={styles.buttonTextStyle}>Edit Profile </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                activeOpacity={0.5}
                onPress={this.change}>
                <Text style={styles.buttonTextStyle}>Change Password </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                activeOpacity={0.5}
                onPress={() => this.props.navigation.popToTop()}>
                <Text style={styles.buttonTextStyle}>Log out </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default UserSreen;
const styles = StyleSheet.create({
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
  SectionStyle: {
    flexDirection: 'row',
    height: 37,
    marginLeft: 20,
    marginBottom: 5,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  header: {
    backgroundColor: '#7DE24E',
    height: 180,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 80,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 0,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 27,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#7DE24E',
    marginTop: 0,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    flex: 2,
  },
  text: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#7DE24E',
  },
});
