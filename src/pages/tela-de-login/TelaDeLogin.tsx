import { useCallback, useRef, useState } from "react";
import { InputLogin } from "../../shared/components/botoes/InputLogin";
import { ButtonLogin } from "../../shared/components/botoes/ButtonLogin";
import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { usuariosService } from "../../shared/services/api/usuarios/UsuariosService";
import { useNavigate } from "react-router-dom";
import { useUsuarioLogado } from "../../shared/context/UsuarioLogadoContext";
import { ApiException } from "../../shared/services/api/ApiException";

export const TelaDeLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();
    
    const { setUser } = useUsuarioLogado();
    
    const handleEntrar = useCallback(async () => {
        try {
            const userLogado = await usuariosService.login(email, password);
            if (userLogado instanceof ApiException) {
                alert('Credenciais invalidas');
            } else {
                console.log('Usuário logado:', userLogado.name);
                setUser(userLogado);
                navigate('/listagem');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    }, [email, password, navigate, setUser]);

    const theme = useTheme();
    
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    
    const lgDown = useMediaQuery(theme.breakpoints.down('lg'))
    
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    
    return (
        <>
            <Box bgcolor='#006400' sx={{
                backgroundImage: "url(https://i.pinimg.com/originals/d4/7f/6a/d47f6abfb83674d9bdd89d3a647adbd8.png)",

                width: "100%"
            }}>
                <Box sx={{
                    marginLeft: (smDown ? "0%" : mdDown ? "15%" : lgDown ? "30%" : "50%"),
                    bgcolor: '#f6f6f6',
                    width: (smDown ? "100%" : mdDown ? "85%" : lgDown ? "70%" : "50%"),
                    height: "100vh"
                }}>
                    <form action="" style={{
                        backgroundColor: '#f6f6f6',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        minWidth: 600
                    }}>

                        <Typography variant="h4" sx={{ marginBottom: "4vh", fontWeight: 'bold' }}>Bem Vindo</Typography>

                        <InputLogin
                            label="Email"
                            value={email}
                            onChange={newValue => setEmail(newValue)}
                            onPressEnter={() => inputPasswordRef.current?.focus()} />

                        <Divider sx={{ padding: 2, border: 'none' }} />

                        <InputLogin
                            label="Senha"
                            value={password}
                            ref={inputPasswordRef}
                            type="password"
                            onChange={newValue => setPassword(newValue)} />

                        <ButtonLogin type="button" onClick={handleEntrar}>Login</ButtonLogin>

                    </form>
                </Box >
            </Box>

        </>
    );
}