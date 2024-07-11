import { Routes, Route, Navigate } from 'react-router-dom'
import { TelaDeLogin } from '../pages/tela-de-login/TelaDeLogin'
import { ListagemDeUsuario } from '../pages/listagem-de-usuario/ListagemDeUsuario'
import { InformacaoDeUsuario } from '../pages/informacao-de-usuario/InformacaoDeUsuario'
import { UsuarioLogadoProvider } from '../shared/context/UsuarioLogadoContext'
import PrivateRoute from '../shared/components/private-route/PrivateRoute'
import { useDrawerContext } from '../shared/context'
import { useEffect } from 'react'
import { Perfil } from '../pages/perfil/Perfil'

export const AppRoutes = () => {

    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                label: 'Perfil',
                icon: 'people',
                path: '/perfil',
            },
            {
                label: 'Usuários',
                icon: 'home',
                path: '/listagem',
            }
        ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <UsuarioLogadoProvider>
            <Routes>


                <Route path="/login" element={<TelaDeLogin />} />



                <Route element={<PrivateRoute requiredLevel={1} />}>
                    <Route path="/listagem" element={<ListagemDeUsuario />} />
                </Route>
                
                <Route element={<PrivateRoute requiredLevel={1} />}>
                    <Route path="/perfil" element={<Perfil />} />
                </Route>

                <Route element={<PrivateRoute requiredLevel={4} />}>
                    <Route path="/usuario/:id" element={<InformacaoDeUsuario />} />
                </Route>

                <Route path="*" element={<Navigate to="/listagem" />} />


            </Routes>
        </UsuarioLogadoProvider>
    )
}