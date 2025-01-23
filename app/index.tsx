import { Link } from 'expo-router'
import React from 'react'
import { View, Text } from "react-native"

const index = () =>{
    return(
        <View>
            <Text>Hola</Text>
            <Link
                href={{
                    pathname: '/employee/view',
                    params: { id: '1' }
                }}>
                View user
            </Link>
        </View>
    )
}

export default index
