import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../components/DrawerContent";
import LoginScreen from "./login";
import HomeScreen from "./HomeScreen";

const Drawer = createDrawerNavigator();

export default function Layout() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
                headerShown: true, // Muestra el encabezado
                headerTitleAlign: "center", // Alinea el título en el centro
                headerStyle: {
                    backgroundColor: "#fff",
                },
                headerTintColor: "#000", // Color del texto del encabezado
            }}
        >
            {/*  Ruta para HomeScreen */}
            <Drawer.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerTitle: "" }}
            />

            <Drawer.Screen name="Login" component={LoginScreen} options={{ headerTitle: "Iniciar Sesión" }} />
        </Drawer.Navigator>



    );
}










