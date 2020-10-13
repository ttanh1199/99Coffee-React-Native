/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
'use strict';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import UserSreen from './Screen/Main/UserSreen';
import HomeSreen from './Screen/Main/HomeSreen';
import ProductSreen from './Screen/Main/ProductSreen';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Component} from 'react';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
class tab extends Component{
	render(){
		return(
			<Tab.Navigator initialRouteName="User">
				<Tab.Screen name="Home" component={HomeSreen}/>
				<Tab.Screen name="Product" component={ProductSreen}/>
				<Tab.Screen name="User" component={UserSreen}/>
			</Tab.Navigator>
		);
	}
}

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
		  <Stack.Screen name="User1" component={tab} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default App;
