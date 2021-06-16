import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Syncing({ navigation }: any) {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const handleBarCodeScanned = ({ type, data }: any) => {
		setScanned(true);

		fetch(`https://servicearchive.herokuapp.com/sync/connect?key=${data.substr(3)}`, {
			method: `POST`,
			headers: { "Content-Type": `application/json` },
			mode: `no-cors`,
			body: JSON.stringify([{"hallo": "niigggaaa"}])
		}).then(async (res: Response) => {
			let result: any = await res.json();
		});
	};

	if (hasPermission === null) {
		return (
			<View style={styles.container}></View>
		);
	}
	if (hasPermission === false) {
		navigation.navigate(`documents`);

		return (
			<View style={styles.container}></View>
		);
	}

	if (!scanned) {
		return (
			<View style={styles.container}>
				<BarCodeScanner
					onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>
			</View>
		);
	} else {
		return (
			<Text>poopoo</Text>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: `column`,
		justifyContent: `center`,
		backgroundColor: `#000000`
	},
});
