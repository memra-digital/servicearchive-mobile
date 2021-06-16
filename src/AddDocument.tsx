import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import * as data from './data';

export default function AddDocument({ navigation }: any) {
	let newDocumentTitle: string = ``;

	return (
		<View
			style={styles.container}>

			<Text  
				style={styles.text}>

				Jaunā dokumenta nosaukums:
			</Text>

			<TextInput
				style={styles.input}
				multiline={true}
				onChangeText={text => newDocumentTitle = text}
				textAlignVertical={`top`} />


			<TouchableOpacity
				style={styles.button}
				activeOpacity={0.5}
				onPress={() => {
					data.addDocument(newDocumentTitle);
					navigation.navigate(`documents`, { refresh: true });
				}}>
				
				<Text style={styles.buttonText}>Pievienot</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: `#1a1a1f`,
		minHeight: `100%`,
		padding: 10
	},
	text: {
		color: `#ffffff`,
		fontSize: 15
	},

	input: {
		backgroundColor: `#32323b`,
		color: `#ffffff`,
		padding: 10,
		paddingLeft: 15,
		borderRadius: 50,
		fontSize: 18,
		marginTop: 15
	},
	
	button: {
		alignItems: `center`,
		backgroundColor: `#32323b`,
		padding: 10,
		borderRadius: 50,
		marginTop: 15
	},
	buttonText: {
		color: `#ffffff`,
		fontSize: 20
	},
});