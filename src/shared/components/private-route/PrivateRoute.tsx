import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUsuarioLogado } from '../../context/UsuarioLogadoContext';

interface PrivateRouteProps {
    requiredLevel: number;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ requiredLevel }) => {
    const { user } = useUsuarioLogado();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.level < requiredLevel) {
        return <Navigate to="/listagem" />;
    }

    // Renderiza os componentes filhos se o usuário tiver o nível necessário
    return <Outlet />;
};

export default PrivateRoute;
