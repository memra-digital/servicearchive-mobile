import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import * as data from './data';

let currentDocumentID: number = -1;

function onChangeText(text: string): void {
	data.setDocumentContent(currentDocumentID, text);
}

export default function Editor({ route, navigation }: any) {
	const { id } = route.params;
	currentDocumentID = id;

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: data.getDocumentTitle(id)
		});
	}, [navigation]);

	return(
		<View>
			<TextInput
				style={styles.input}
				multiline={true}
				onChangeText={text => onChangeText(text)}
				textAlignVertical={`top`}
				defaultValue={data.getDocumentContent(currentDocumentID)} />
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		borderWidth: 0,
		height: `100%`,
		padding: 10,
		fontSize: 18,
		backgroundColor: `#ffffff`,
		color: `#000000`
	}
});