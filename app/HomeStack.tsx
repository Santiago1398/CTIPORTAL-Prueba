import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import DeviceListweb from "@/components/DeviceListweb";

export type RootStackParamList = {
    Home: undefined; // HomeScreen no necesita parámetros
    DeviceListweb: undefined;
    // DeviceDetails: { mac: number, farmName: string, siteName: string }; // DeviceDetailsScreen espera  parámetro 
    //BottonMaster: { mac: number }; // Bottton Master  espera un parámetro `mac`
};


const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (

        <Stack.Navigator >

            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DeviceListweb"
                component={DeviceListweb}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>

    );
}
