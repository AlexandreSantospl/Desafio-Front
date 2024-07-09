import { createContext, useContext, useState } from "react";
import { IUsuario } from "../services/api/usuarios/UsuariosService";

interface IUsuarioLogadoContext {
    user: IUsuario | null;
    setUser: React.Dispatch<React.SetStateAction<IUsuario | null>>;
}

const UsuarioLogadoContext = createContext<IUsuarioLogadoContext>({
    user: null,
    setUser: () => {},
});

export const UsuarioLogadoProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<IUsuario | null>(null);

    return (
        <UsuarioLogadoContext.Provider value={{ user, setUser }}>
            {children}
        </UsuarioLogadoContext.Provider>
    );
};

export const useUsuarioLogado = () => {
    return useContext(UsuarioLogadoContext);
};
