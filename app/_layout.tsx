import { Stack } from "expo-router";


export default function Layout(){
    return(
        <Stack
            screenOptions={{
                headerStyle:{
                    backgroundColor: 'blue',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}
        >

            <Stack.Screen 
                name="index"
                options={{ title: "Home" }}
             />
            <Stack.Screen 
                name="employee/view"
                options={{ title: "Empleado" }}
            />

        </Stack>
    )
}