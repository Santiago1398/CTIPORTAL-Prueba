import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEnvStore } from '@/store/envSotre';

const DeviceListweb = () => {
    const getCurrentUrl = useEnvStore((state) => state.currentUrl);
    const [finalUrl, setFinalUrl] = useState("");

    useEffect(() => {
        const loadToken = async () => {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                const url = getCurrentUrl(token);
                setFinalUrl(url);
            }
        };
        loadToken();
    }, []);

    if (!finalUrl) return null;

    return (
        <SafeAreaView style={styles.container}>
            <WebView

                style={styles.webview}
                source={{ uri: finalUrl }}

                onMessage={(event) => {
                    console.log("Mensaje recibido desde la web:", event.nativeEvent.data);
                    console.log("url impirmida", finalUrl);
                }}
                injectedJavaScript={`("Hola2: ${finalUrl}"); true;`}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        padding: 0,
    },
    webview: {
        flex: 1,
        margin: 0,
        padding: 0,
    },
});

export default DeviceListweb;
