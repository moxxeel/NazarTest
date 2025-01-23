import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View, Text } from "react-native"

const view = () =>{

    const params = useLocalSearchParams()
    return(
        <View>
            <Text>employee</Text>
            <Text>{params.id}</Text>
        </View>
    )
}

export default view