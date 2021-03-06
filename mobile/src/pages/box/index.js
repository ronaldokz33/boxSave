import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import api from '../../services/api';

import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';

import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import socket from 'socket.io-client';

import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

export default class Box extends Component {
    state = { box: {} };
    async componentDidMount() {
        const box = await AsyncStorage.getItem('@BoxSave:box');

        this.subscribeToNewFiles(box);

        const response = await api.get(`boxes/${box}`);

        this.setState({ box: response.data });
    }
    
    subscribeToNewFiles = (box) => {
        const io = socket('http://192.168.1.104:3366');
        io.emit('connectRoom', box);

        io.on('file', data => {
            this.setState({ box: { ...this.state.box, files: [data, ...this.state.box.files] } });
        });
    }

    OpenFile = async (file) => {
        try {
            const filePath = `${RNFS.DocumentDirectoryPath}/${file.title}`;
            await RNFS.downloadFile({
                fromUrl: file.url,
                toFile: filePath
            });

            await FileViewer.open(filePath);
        } catch (err) {
            console.log(err);
        }
    }
    renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => this.OpenFile(item)}
            style={styles.file}
        >
            <View style={styles.fileInfo}>
                <Icon name="insert-drive-file" color="#A5CFFF" size={24} />
                <Text style={styles.fileTitle}>{item.title}</Text>
            </View>

            <Text style={styles.fileDate}>há {" "} {distanceInWords(item.createdAt, new Date(), { locale: pt })}</Text>
        </TouchableOpacity>
    );

    handleUpload = () => {
        ImagePicker.launchImageLibrary({}, async upload => {
            if (upload.error) {
                console.log(upload.error);
            } else if (upload.didCancel) {
                console.log('cancelado pelo usuário');
            } else {
                const data = new FormData();

                const [prefix, suffix] = upload.fileName.split('.');
                const ext = suffix.toLowerCase() === 'heic' ? 'jpg' : suffix;

                data.append('file', {
                    uri: upload.uri,
                    type: upload.type,
                    name: `${prefix}.${ext}`
                });

                api.post(`boxes/${this.state.box._id}/files`, data);
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.boxTitle}>{this.state.box.title}</Text>
                <FlatList
                    style={styles.list}
                    keyExtractor={file => file._id}
                    data={this.state.box.files}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    renderItem={this.renderItem}
                />

                <TouchableOpacity style={styles.fab} onPress={this.handleUpload}>
                    <Icon name="cloud-upload" size={24} color="#FFF" />
                </TouchableOpacity>

            </View>
        );
    }
}
