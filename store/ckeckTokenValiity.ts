import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEnvStore } from "@/store/envSotre";

export const checkTokenValidity = async (): Promise<boolean> => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return false;

        const apiUrl = useEnvStore.getState().getApiUrl();
        const res = await axios.post(`${apiUrl}/api/v1/loginMovil/validarToken`, { token });

        return res.status === 200;
    } catch (error) {
        console.error("Token no válido:", error);
        return false;
    }
};
