import { Link } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from "react-native"
import EmployeeCard from '../components/cards/EmployeeCard'


type Item = {
    id: number;
    name: string;
};

const index = () => {

    const lista = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
    ];

    const renderItem = ({ item }) => (
        <EmployeeCard id = {item.id} name = {item.name} />
    );

    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#F2F2F2' }}>
            <View style={{ height: '5%', flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginStart: 10 }} >
                    Empleados
                </Text>
            </View>
            <View style={{ height: '95%', flexDirection: 'column', backgroundColor: '#FFFFFF', margin: 10, borderRadius: 10, marginTop: 0 }}>
                <Text style={{ fontWeight: '500', marginStart: 10, marginTop: 10, fontSize: 12 }}>Total: {lista.length}</Text>

                {lista.length==0 ? ( 
                    <Text style={styles.emptyText}>No hay elementos para mostrar</Text>
                ) : ( 
                    <FlatList
                        data={lista}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        onEndReachedThreshold={0.01}
                        keyboardDismissMode={'none'}
                        removeClippedSubviews={false}
                    />
                )}
                
            </View>
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
  });

export default index
