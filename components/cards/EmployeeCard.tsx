import { Link, useRouter } from "expo-router";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native"


const EmployeeCard = ({ id, name }) => {

    const router = useRouter();

    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 16, fontWeight: '600', marginStart: 10 }} >
                {name}
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => router.push(`/employee/view?id=${id}`)}>
                <Image source={require('../../assets/images/hand.png')} style={styles.icon}/>
            </TouchableOpacity>

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

export default EmployeeCard;