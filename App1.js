'use strict';

import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigator,createStackNavigator} from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator({
  Home: {
    Screen: HomeScreen,
  },
  Details: {
    Screen: DetailsScreen,
  },
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
