import { Link } from 'expo-router'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from "react-native"

const index = () =>{
    return(
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#F2F2F2' }}>
            <View style={{ height:'5%', flexDirection: 'row', alignItems:'center', margin:5 }}>
                <Text style={{fontSize:16, fontWeight: '600', marginStart: 10}} >
                    Empleados
                </Text>
            </View>
            <View style={{ height:'95%', flexDirection: 'column', backgroundColor: '#FFFFFF', margin: 10, borderRadius: 10, marginTop:0 }}>

                <View style={{
                    flexDirection:'row',
                    margin:10,
                    backgroundColor: '#F2F2F2',
                    height: 70,
                    alignItems:'center',
                    justifyContent: 'space-between',
                }}>

                    <Text style={{fontSize:16, fontWeight: '600', marginStart: 10 }} >
                        Juan Perez
                    </Text>

                    <TouchableOpacity style={{
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        backgroundColor: '#9AA4FF',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin:10
                    }}
                    //onPress={}
                    >
                        <Image source={require('../assets/images/hand.png')} style={{
                            width: 30,
                            height: 30,
                            resizeMode: 'contain'}} 
                        />
                    </TouchableOpacity>

                </View>
                    

            </View>
        </View>
    )
}


/*
    <Link
        href={{
            pathname: '/employee/view',
            params: { id: '1' }
        }}>
        View user
    </Link>
*/

export default index
