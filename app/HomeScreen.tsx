import React from "react";
import { View, Text, StyleSheet, ImageBackground, } from "react-native";
import DeviceListweb from "@/components/DeviceListweb";



export default function HomeScreen() {
    return (
        <ImageBackground
            source={require("assets/images/pigs.png")}
            style={styles.background}
            resizeMode="contain"
        >
            <View style={styles.overlay}>
                <View style={styles.ctiContainer}>
                    <Text style={styles.headerText}>
                        <Text style={styles.cti}>CTI</Text>
                        <Text style={styles.Portal}>Portal</Text>
                    </Text>
                </View>
                <DeviceListweb />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,

    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.7)", // Fondo semitransparente
        padding: 12,
    },
    ctiContainer: {
        alignItems: "center",
        marginBottom: 16,
    },
    headerText: {
        fontSize: 36,
        fontWeight: "bold",
    },
    cti: {
        color: "blue",
    },
    Portal: {
        color: "green",
    },
});
