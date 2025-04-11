import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../components/DrawerContent";
import LoginScreen from "./login";
import HomeScreen from "./HomeScreen";
import { useAuthStore } from "@/store/authStore";
import { ActivityIndicator, View } from "react-native";

const Drawer = createDrawerNavigator();

export default function Layout() {
    const { isAuthenticated, isHydrated } = useAuthStore();

    if (!isHydrated) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
                headerShown: true,
                drawerStyle: {
                    width: 250,
                },
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: "#fff",
                },
                headerTintColor: "#000",
            }}
            initialRouteName={isAuthenticated ? "HomeScreen" : "Login"}
        >
            {isAuthenticated ? (
                <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ headerTitle: "" }} />
            ) : (
                <Drawer.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerTitle: "Iniciar Sesión",
                        swipeEnabled: false,
                        drawerItemStyle: { display: "none" },
                    }}
                />
            )}
        </Drawer.Navigator>
    );
}
