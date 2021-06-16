import * as FileSystem from 'expo-file-system';
import { Document } from './schemas';

let data: Document[] = [];

const loadData = async () => {
	if (!(await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}data.json`)).exists) {
		FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}data.json`, `[]`);
	}
	data = JSON.parse(await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}data.json`));
}
loadData();

export const documentExists = (title: string) => {
	for (let i: number = 0; i < data.length; i++) {
		if (data[i].title == title) {
			return true;
		}
	}

	return false;
}

export const getData = () => {
	return data;
}
export const getDocument = (id: number) => {
	for (let i: number = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i];
		}
	}
}
export const getDocumentTitle = (id: number) => {
	for (let i: number = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i].title;
		}
	}
}
export const getDocumentContent = (id: number) => {
	for (let i: number = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i].content;
		}
	}
}
export const findDocuments = (term: string) => {
	let results: Document[] = [];
	for (let i: number = 0; i < data.length; i++) {
		if (data[i].title.includes(term)) {
			results.push(data[i]);
		}		
	}
	return results;
}

export const setData = (newData: Document[]) => {
	data = [...newData];
	save();
}
export const addDocument = (title: string) => {
	if (documentExists(title)) {
		return;
	}

	if (title === ``) {
		return;
	}

	let newId: number = 0;
	if (data.length > 0) {
		newId = data[data.length - 1].id + 1;
	}

	data.push({
		id: newId,
		title,
		content: ``,
		modified: Date.now(),
		created: Date.now()
	});

	save();
}
export const setDocumentContent = (id: number, content: string) => {
	for (let i: number = 0; i < data.length; i++) {
		if (data[i].id == id) {
			data[i].content = content;
			data[i].modified = Date.now();
			return true;
		}
	}
	return false;
}

const save = async () => {
	FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}data.json`, JSON.stringify(getData()));
}
setTimeout(() => save(), 60000);