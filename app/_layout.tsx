import { Stack } from "expo-router";
import * as SQLite from 'expo-sqlite';
import { Image } from "react-native";

export default function Layout() {

    const initialEmployees = [
        { name: 'Juan Perez'},
        { name: 'Pedro Lopez'},
        { name: 'Luis Nazar'},
        { name: 'Camilo Perez'},
        { name: 'Miguel Gonzalez'},
      ];

    const createDB = async (db: SQLite.SQLiteDatabase) => {

        try {
            console.log("Create Database")
            const response = await db.execAsync("CREATE TABLE IF NOT EXISTS employee (id INTEGER PRIMARY KEY AUTOINCREMENT, name Text);");
            console.log("Database created", response);

            await db.execAsync("CREATE TABLE IF NOT EXISTS file (id INTEGER PRIMARY KEY AUTOINCREMENT, name Text, imageUri TEXT, fk_employee INTEGER NOT NULL, FOREIGN KEY (fk_employee) REFERENCES employee(id) ON DELETE CASCADE);");

            //Verificar si empleados iniciales están creados
            await db.withTransactionAsync(async () => {
                initialEmployees.forEach(async (employee) => {
                    const result = await db.getFirstAsync(`SELECT COUNT(*) FROM employee WHERE name = '${employee.name}'`);
                    if(result['COUNT(*)']==0){
                        await db.execAsync(
                            `
                            INSERT INTO employee (name) VALUES ('${employee.name}');
                            `
                        )
                        console.log('Empleado creado'+ employee.name);
                    }
                });
            });
        } catch (error) {
            console.log('Error'+ error);
        }

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