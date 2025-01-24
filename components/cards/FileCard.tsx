import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet, Modal, Button } from "react-native"


const FileCard = ({ name, p_uri }) => {

    const router = useRouter();

    const [modalVisible, setModalVisible] = useState(false);

    // Función para abrir el modal con la foto
    const openModal = () => {
        setModalVisible(true);
        console.log("Mostrar Foto")
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 16, fontWeight: '600', marginStart: 10 }} >
                {name}
            </Text>

            <TouchableOpacity style={styles.button} onPress={openModal}>
                <Image source={require('../../assets/images/eye.png')} style={styles.icon}/>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                onRequestClose={closeModal}
                transparent={true}
                animationType="fade"
            >
                <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                }}>
                <View style={{
                    width: '80%',
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 10,
                }}>
                    <Image source={{ uri: p_uri }} style={{ width: '100%', height: 300 }} />
                    <Button title="Cerrar" onPress={closeModal} />
                </View>
                </View>
            </Modal>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#F2F2F2',
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#9AA4FF',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    }
});

export default FileCard;