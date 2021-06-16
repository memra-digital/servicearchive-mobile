import React from 'react';
import { VirtualizedList, Text, TouchableOpacity, StyleSheet, View, TextInput } from 'react-native';
import Svg, { Path } from 'react-native-svg'
import * as data from './data';

const getItem = (value: string, index: number) => {
	return data.getData()[index];
};
const getItemCount = () => data.getData().length;

export default function ArticleList({ navigation }: any) {
	// Add the syncing button to the navbar
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (

				<TextInput
					style={styles.input}
					multiline={true}
					onChangeText={text => alert(text)}
					textAlignVertical={`top`}
					placeholder={`Meklēt...`}
					placeholderTextColor={`#63637a`} />
			),
			headerRight: () => (
				<View style={styles.headerButtonContainer}>
					<TouchableOpacity
						style={styles.headerButton}
						activeOpacity={0.5}
						onPress={() => navigation.navigate(`syncing`)}>
						
						<Svg width="32" height="32" fill="#ffffff" viewBox="0 0 16 16">
							<Path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75c.167-.333.25-.833.25-1.5H2s-2 0-2-2V4zm1.398-.855a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145z"/>
						</Svg>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.headerButton}
						activeOpacity={0.5}
						onPress={() => navigation.navigate(`add`)}>
						
						<Svg width="32" height="32" fill="#ffffff" viewBox="0 0 16 16">
							<Path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
						</Svg>
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	const Item = ({ title, id }: any) => (
		<TouchableOpacity
			style={styles.button}
			activeOpacity={0.5}
			onPress={() => { navigation.navigate(`editor`, { id }) }}>
			
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
	
	return (
		<View
			style={styles.container}>

			<VirtualizedList
				data={data}
				initialNumToRender={4}
				renderItem={({ item }) => <Item title={item.title} id={item.id} />}
				keyExtractor={item => item.title}
				getItemCount={getItemCount}
				getItem={getItem}>
			</VirtualizedList>

		</View>
	);
}


const styles = StyleSheet.create({
	container: {
	  backgroundColor: `#1a1a1f`,
	  minHeight: `100%`
	},

	input: {
		backgroundColor: `#1a1a1f`,
		color: `#ffffff`,
		padding: 10,
		paddingLeft: 15,
		borderRadius: 50,
		fontSize: 18
	},

	button: {
		alignItems: `center`,
		backgroundColor: `#1a1a1f`,
		padding: 30
	},
	buttonText: {
		color: `#ffffff`,
		fontSize: 20
	},

	headerButtonContainer: {
		flex: 2.5
	},
	headerButton: {
		alignItems: `center`,
		backgroundColor: `#32323b`,
		paddingRight: 16,
		flex: 1
	},
	headerButtonText: {
		color: `#ffffff`,
		fontSize: 20
	}
});