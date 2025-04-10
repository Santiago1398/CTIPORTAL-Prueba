import { create } from "zustand";
import { persist } from "zustand/middleware";
import zustandStorage from "./zustandStorage";
import { post, postxxx } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEnvStore } from "./envSotre";

interface AuthState {
    email: string | null;
    password: string | null;
    token: string | null;
    userId: number | null;
    isAuthenticated: boolean;
    isActive: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    reslogin: string;

}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            email: null,
            password: null,
            token: null,
            userId: null,
            isAuthenticated: false,
            isActive: false,
            reslogin: "",
            login: async (email, password) => {
                try {
                    const response = await post("/api/v1/loginMovil", { email, password });

                    const { email: backendEmail, token } = response.data;

                    if (!token) throw new Error("Token no recibido");

                    await AsyncStorage.setItem("token", token);
                    console.log("Token guardado en AsyncStorage:", token);

                    set({
                        email: backendEmail,
                        token,
                        userId: null,
                        isAuthenticated: true,
                        isActive: true,
                    });

                    return true;
                } catch (error) {
                    console.error("Error en el inicio de sesión:", error);
                    return false;
                }
            },



            logout: async () => {
                try {
                    await AsyncStorage.removeItem("token");
                    await AsyncStorage.removeItem("userId");

                    set({
                        email: null,
                        password: null,
                        token: null,
                        userId: null,
                        isAuthenticated: false,
                        isActive: false,
                    });
                } catch (error) {
                    console.error("Error durante el logout:", error);
                }
            },

        }),
        {
            name: "auth-storage",
            storage: zustandStorage,
        }
    )
);

