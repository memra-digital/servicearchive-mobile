import * as FileSystem from 'expo-file-system';
import { Document } from './schemas';

let data: Document[] = [];

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

export const addDocument = (title: string) => {
	if (documentExists(title)) {
		return;
	}

	if (title === ``) {
		return;
	}

	data.push({
		id: data[data.length - 1].id + 1,
		title,
		content: ``,
		modified: 0,
		created: 0
	});
}
export const setDocumentContent = (id: number, content: string) => {
	for (let i: number = 0; i < data.length; i++) {
		if (data[i].id == id) {
			data[i].content = content;
			return true;
		}
	}
	return false;
}

const autosave = () => {
	
}
setTimeout(() => autosave(), 60000);