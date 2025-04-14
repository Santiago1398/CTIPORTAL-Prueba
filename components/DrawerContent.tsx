import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useAuthStore } from "../store/authStore";

export default function DrawerContent(props: DrawerContentComponentProps) {
    const { email: email, isActive, logout, isAuthenticated } = useAuthStore();
    const { navigation } = props;

    // Función para cerrar sesión y redirigir al Login
    const handleLogout = async () => {
        await logout(); // Limpia la sesión
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/Logo-CTI.png")}
                style={styles.logo}
            />
            <Text style={styles.portalText}>
                <Text style={styles.cti}>CTI</Text>
                <Text style={styles.portal}>PORTAL</Text>
            </Text>
            <View style={styles.userInfo}>
                <Text style={styles.email}>{email || ""}</Text>

            </View>

            {/* Botón para iniciar sesión si no está autenticado */}
            {!isAuthenticated && (
                <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={styles.loginButton}
                >


                    <Text style={styles.loginText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            )}

            {/* Botón para cerrar sesión si está autenticado */}
            {isAuthenticated && (
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    userInfo: {
        marginBottom: 20,
    },
    email: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    status: {
        fontSize: 16,
        marginTop: 5,
    },
    loginButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "blue",
        borderRadius: 8,
    },
    loginText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    logoutButton: {
        marginTop: 30,
        padding: 10,
        backgroundColor: "red",
        borderRadius: 8,
    },
    logoutText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    logo: {
        width: 180,
        height: 100,
        resizeMode: "contain",
        marginBottom: 20,
        alignSelf: "center",

    },
    cti: {
        color: "blue",
        fontWeight: "bold",
    },

    portal: {
        color: "green",
        fontWeight: "bold",
    },

    portalText: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
    },

});
