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
        // backgroundColor: "rgba(255, 255, 255, 0.7)", // Fondo semitransparente
        // padding: 12,
    },

});
