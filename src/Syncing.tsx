import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Document } from './schemas';
import * as dataHandler from './data';

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
			body: JSON.stringify(dataHandler.getData())
		}).then(async (res: Response) => {
			let result: any = await res.json();

			updateResult(data);
		});
	};

	let initiatorData: Document[] = [];
	let uploadedChoice: string = ``;
	const updateResult = async (key: string) => {
		fetch(`https://servicearchive.herokuapp.com/sync/update?key=${key.substr(3)}`, {
			method: `POST`
		}).then(async (res: Response) => {
			let result: any = await res.json();

			uploadedChoice = result.choice;
			initiatorData = JSON.parse(JSON.stringify(result.initiatorData).replace(/(<([^>]+)>)/ig, ``).replace(/(&([^>]+);)/ig, ` `));

			if (uploadedChoice === ``) {
				setTimeout(() => updateResult(key), 500);
			} else {
				if (uploadedChoice === `desktopToMobile`) {
					dataHandler.setData(initiatorData);
				}
				
				navigation.navigate(`documents`);
			}
		});
	}

	if (hasPermission === null) {
		return (
			<View style={styles.container}></View>
		);
	}
	if (hasPermission === false) {
		navigation.navigate(`documents`);

		alert(`Jums vajag atļaut izmantot kameru lai sinhronizētu!`);

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
			<View style={styles.container}>
				<Text
					style={styles.text}>

					Izvēlieties uz datora vienu no opcijām - vai pārnest datus no telefona uz datoru vai otrādāk!
				</Text>
			</View>
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
	text: {
		margin: 15,
		color: `#ffffff`,
		textAlign: `center`
	}
});
