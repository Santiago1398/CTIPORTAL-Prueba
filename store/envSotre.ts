import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import zustandStorage from './zustandStorage'; // Asegúrate de usar la ruta correcta

type EnvState = {
    devMode: boolean;
    toggleMode: () => void;
    currentUrl: (token?: string) => string;
    getApiUrl: () => string;
};

export const useEnvStore = create<EnvState>()(
    persist(
        (set, get) => ({
            devMode: false,
            toggleMode: () => set((state) => ({ devMode: !state.devMode })),
            currentUrl: (token = "") =>
                get().devMode
                    ? `https://ctiportaltest.cticontrol.com/login.xhtml?tokenMovil=${token}`
                    : `https://ctiportal.cticontrol.com/login.xhtml?tokenMovil=${token}`,
            getApiUrl: () =>
                get().devMode
                    ? 'https://api.ctiportaltest.cticontrol.com'
                    : 'https://api.ctiportal.cticontrol.com',
        }),
        {
            name: "env-storage",
            storage: zustandStorage,
        }
    )
);
