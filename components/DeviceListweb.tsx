import { View, StyleSheet } from 'react-native'
import React from 'react'

import { WebView } from 'react-native-webview'

const DeviceListweb = () => {
    return (

        <View style={styles.container}>
            <WebView
                source={{ uri: 'https://ctiportal.cticontrol.com/' }}

                onMessage={(event) => {
                    console.log("Mensaje recibido desde la web:", event.nativeEvent.data);
                }}
                injectedJavaScript={`window.postMessage("Hola desde la web", "*");`}
            />
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default DeviceListweb