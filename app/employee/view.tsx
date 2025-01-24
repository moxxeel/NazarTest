import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import React, { useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const view = () => {

    const params = useLocalSearchParams()

    const [flatListItems, setFlatListItems] = React.useState<
        { id: number; name: string;}[]
    >([]);

    const database = useSQLiteContext();
    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const loadData = async () => {
        const result = await database.getAllAsync<{
          id: number;
          name: string;
        }>(`SELECT * FROM file where fk_employee=${params.id}`);
        setFlatListItems(result);
      };

      

    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#F2F2F2' }}>
            <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', margin: 5, justifyContent: 'space-between',   }}>

                <View style={{ height: 'auto', flexDirection: 'column', alignItems: 'center', margin: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'left' }} >
                        Archivos
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '600', marginStart: 15 }} >
                        Juan Perez
                    </Text>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Subir Archivo +</Text>
                </TouchableOpacity>

            </View>
            <View style={{ height: '95%', flexDirection: 'column', backgroundColor: '#FFFFFF', margin: 10, borderRadius: 10, marginTop: 0 }}>
                <Text style={{ fontWeight: '500', marginStart: 10, marginTop: 10, fontSize: 12 }}>Total: 0</Text>
                {flatListItems.length == 0 ? (
                    <Text style={styles.emptyText}>No hay elementos para mostrar</Text>
                ) : (
                    <Text style={styles.emptyText}>Si hay elementos para mostrar</Text>
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