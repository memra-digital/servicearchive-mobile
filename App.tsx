import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DocumentList from './src/DocumentList';
import Editor from './src/Editor';
import Syncing from './src/Syncing';
import AddDocument from './src/AddDocument';

const Stack = createStackNavigator();

export default class App extends Component {
	render() {
		return(
			<NavigationContainer>
				<Stack.Navigator initialRouteName="documents">
					<Stack.Screen
						name="documents"
						component={DocumentList}
						options={{
							headerShown: false
						}} />
					<Stack.Screen
						name="editor"
						component={Editor}
						options={{
							headerStyle: {
								backgroundColor: `#d8d8d8`,
								borderBottomWidth: 0
							},
							headerTintColor: `#000000`
						}} />
					<Stack.Screen
						name="syncing"
						component={Syncing}
						options={{
							title: `Sinhronizēšana`,
							headerStyle: {
								backgroundColor: `#000000`,
								borderBottomWidth: 0,
								shadowColor: `#000000`,
								shadowRadius: 10
							},
							headerTintColor: `#ffffff`
						}} />
					<Stack.Screen
						name="add"
						component={AddDocument}
						options={{
							title: `Pievienot dokumentu`,
							headerStyle: {
								backgroundColor: `#32323b`,
								borderBottomWidth: 0
							},
							headerTintColor: `#ffffff`
						}} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}