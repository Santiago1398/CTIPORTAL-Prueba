import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import zustandStorage from "./zustandStorage";
import { post } from "@/services/api";

interface AuthState {
    email: string | null;
    password: string | null;
    token: string | null;
    userId: number | null;
    isAuthenticated: boolean;
    isActive: boolean;
    isHydrated: boolean; // ✅ NUEVO

    reslogin: string;

    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            email: null,
            password: null,
            token: null,
            userId: null,
            isAuthenticated: false,
            isActive: false,
            isHydrated: false, // ✅ al principio es false
            reslogin: "",


            login: async (email, password) => {
                try {
                    const response = await post("/api/v1/loginMovil", { email, password });
                    const { email: backendEmail, token } = response.data;

                    if (!token) throw new Error("Token no recibido");
                    await AsyncStorage.setItem("token", token);

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
            },
        }),
        {
            name: "auth-storage",
            storage: zustandStorage,
            onRehydrateStorage: (persistedState) => {
                // esta función es llamada al iniciar
                return (state) => {
                    // este `state` es el mismo objeto que manejamos en el store
                    if (state) {
                        state.isHydrated = true;
                    }
                };
            },
        }
    )
);