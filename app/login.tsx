import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ImageBackground,
    Pressable
} from "react-native";
import { useAuthStore } from "../store/authStore";
import { Feather } from "@expo/vector-icons";
import { useEnvStore } from "@/store/envSotre";
import { checkTokenValidity } from "@/store/ckeckTokenValiity";

export default function LoginScreen({ navigation }: any) {
    const { email: savedEmail, password: savedPassword, login } = useAuthStore();
    const [email, setEmail] = useState(savedEmail || "");
    const [password, setPassword] = useState(savedPassword || "");

    const { devMode, toggleMode } = useEnvStore();
    const [tapCount, setTapCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    const handleDevTap = () => {
        const next = tapCount + 1;
        setTapCount(next);
        if (next >= 5) {
            toggleMode();
            Alert.alert("Modo cambiado", devMode ? "Modo producción" : "Modo desarrollo");
            setTapCount(0);
        }
    };

    useEffect(() => {
        const validate = async () => {
            const isValid = await checkTokenValidity();
            if (isValid) {
                navigation.replace("HomeScreen");
            } else {
                setIsLoading(false); // Solo mostramos el Login si no es válido
            }
        };
        validate();
    }, []);

    const handleLogin = async () => {
        try {
            const success = await login(email, password);
            if (success) {
                navigation.navigate("HomeScreen");
            } else {
                console.log("Correo electrónico o contraseña incorrectos");
                Alert.alert("Correo electrónico o contraseña incorrectos");
            }
        } catch (error) {
            throw new Error("Algo salió mal");
        }
    };
    if (isLoading) { return null; }
    return (
        <View style={styles.container}>

            <ImageBackground
                source={require("assets/images/imagenTecnologicaLogin.jpg")}

                style={styles.backgroundImage}
                resizeMode="cover"
            >

                <View style={styles.overlay}>
                    <Pressable onPress={handleDevTap} style={{ width: "100%", alignItems: "center" }}>
                        <View>
                            <Text style={styles.title}>Login </Text>
                            <Text style={styles.subtitle}>Please log in to continue</Text>
                            {devMode && <Text style={styles.devText}> Modo desarrollo</Text>}

                        </View>
                    </Pressable>
                    <View style={styles.inputContainer}>
                        <Feather name="mail" size={20} color="#666" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Feather name="lock" size={20} color="#666" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login in</Text>
                        <Feather name="arrow-right" size={20} color="#fff" style={styles.buttonIcon} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
    },
    overlay: {

        backgroundColor: "rgba(255, 255, 255, 0.8)",
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 20,
        alignItems: "center",

    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#000",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 24,
        textAlign: "center"
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 16,
        width: "100%",
        backgroundColor: "#fff",
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#000",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#007bff",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 16,
        width: "100%",
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonIcon: {
        marginLeft: 8,
    },
    // loginBox: {
    //     backgroundColor: "#fff",
    //     padding: 20,
    //     borderRadius: 12
    // },
    devText: {
        color: "red",
        fontWeight: "bold",
        textAlign: "center"
    },


});
