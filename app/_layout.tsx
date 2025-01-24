import { Stack } from "expo-router";
import * as SQLite from 'expo-sqlite';
import { Image } from "react-native";

export default function Layout() {
    
    const db = SQLite.openDatabaseSync('nazar.db');

    const createDB = async () => {

        const initialEmployees = [
            { name: 'Juan Perez'},
            { name: 'Pedro Lopez'},
            { name: 'Luis Nazar'},
            { name: 'Camilo Perez'},
            { name: 'Miguel Gonzalez'},
          ];

          db.execAsync(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Employee (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    name Text
                );

                CREATE TABLE IF NOT EXISTS File (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name Text, 
                data BLOB
                );`,
                [],
                () => {
                    console.log('Tablas Creadas');
                    tx.executeSql(
                        initialEmployees.forEach(employee => {
                            tx.executeSql(
                              `INSERT INTO employee (name) VALUES (?);`,
                              [employee.name],
                              () => console.log(`Empleado ${employee.name} insertado correctamente.`),
                              (_, error) => console.log(`Error al insertar a ${employee.name}:`, error)
                            );
                        })
                    )
                }
            )
        })

    }

    return (
        <SQLite.SQLiteProvider databaseName="nazar.db" onInit={createDB}>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#2B0EBE',
                    },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: '500'
                    },
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Home",
                        headerRight: () => (
                            <Image
                                source={require('../assets/images/logo.png')}
                                style={{ height: 30, width: 50 }}
                                resizeMode="contain"
                            />
                        ),
                    }}
                />
                <Stack.Screen
                    name="employee/view"
                    options={{
                        title: "Empleado",
                        headerRight: () => (
                            <Image
                                source={require('../assets/images/logo.png')}
                                style={{ height: 30, width: 50 }}
                                resizeMode="contain"
                            />
                        ),
                    }}
                />

            </Stack>
        </SQLite.SQLiteProvider>


    )
}