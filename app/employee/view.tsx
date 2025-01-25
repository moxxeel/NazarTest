import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import React, { useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import FileCard from '../../components/cards/FileCard';
import GetFileName from '../../functions/GetFileName'

const view = () => {

    const params = useLocalSearchParams()

    const [flatListItems, setFlatListItems] = React.useState<
        { id: number; name: string; imageUri:string}[]
    >([]);

    const database = useSQLiteContext();
    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const loadData = async () => {
        try {
            const result = await database.getAllAsync<{
                id: number;
                name: string;
                imageUri: string
            }>(`SELECT * FROM file where fk_employee=${params.id}`);
            setFlatListItems(result);
        } catch (error) {
            console.log('Error'+ error);
        }
    };

    
    const takePhoto = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status === 'granted') {
                const result = await ImagePicker.launchCameraAsync({
                    allowsEditing: false,
                    aspect: [4, 3],
                    quality: 1,
                });
    
                if (!result.canceled) {
                    const uri = result.assets[0].uri;
                    const filename = GetFileName()
                    console.log("url: " + uri)
                    await database.execAsync(
                        `
                        INSERT INTO file (name, imageUri, fk_employee) VALUES ('${filename}','${uri}', ${params.id});
                        `
                    )
                    console.log("Imagen Guardada")
                    loadData()
                }
            } else {
                alert('Permiso de cámara denegado');
            }
        } catch (error) {
            console.log('Error'+ error);
        }
    };

    const renderItem = ({ item }) => (
        <FileCard name={item.name} p_uri={item.imageUri} />
    );

    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#F2F2F2' }}>
            <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', margin: 5, justifyContent: 'space-between', }}>

                <View style={{ height: 'auto', flexDirection: 'column', alignItems: 'center', margin: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'left' }} >
                        Archivos
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '600', marginStart: 15 }} >
                        {params.name}
                    </Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                    <Text style={styles.buttonText}>Subir Archivo +</Text>
                </TouchableOpacity>

            </View>
            <View style={{ height: '95%', flexDirection: 'column', backgroundColor: '#FFFFFF', margin: 10, borderRadius: 10, marginTop: 0 }}>
                <Text style={{ fontWeight: '500', marginStart: 10, marginTop: 10, fontSize: 12 }}>Total: {flatListItems.length}</Text>
                {flatListItems.length == 0 ? (
                    <Text style={styles.emptyText}>No hay elementos para mostrar</Text>
                ) : (

                    <FlatList
                        data={flatListItems}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        onEndReachedThreshold={0.01}
                        keyboardDismissMode={'none'}
                        removeClippedSubviews={false}
                    />
                )}
            </View>
            <Text>{params.id}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#708BBA',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default view