import { Box, Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { MenuHorizontal } from "../../shared/components"
import { InfoUser } from "../../shared/components/botoes/InfoUser"
import { useState } from "react"
import { MenuLateral } from "../../shared/components/menu-lateral/MenuLateral"
import { useUsuarioLogado } from "../../shared/context"
import { IUsuario, usuariosService } from "../../shared/services/api/usuarios/UsuariosService"
import { ApiException } from "../../shared/services/api/ApiException"
import { useNavigate } from "react-router-dom"

export const Perfil = () => {

    const navigate = useNavigate();

    const { user: loggedUser } = useUsuarioLogado();
    const userId = loggedUser?.id;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [jokey, setJokey] = useState('')
    const [email, setEmail] = useState(loggedUser?.email);
    const [name, setname] = useState(loggedUser?.name);
    const [password, setPassword] = useState(loggedUser?.password);
    const [password2, setPassword2] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [level, setLevel] = useState(loggedUser?.level);
    const [img, setImg] = useState(loggedUser?.img);

    const handleSave = () => {
        if (name && typeof (email) === 'string') {
            if (name.length < 4) return alert("O nome precisa ter no minimo 4 letras.")
            if (email.length < 5) return alert("O email é invalido.")
            if (password !== password2) return alert("As senhas são diferentes.")
            if (userId && level && name && email && img) {
                const newUsuario: IUsuario = { id: loggedUser?.id, email: email, name: name, password: password, level: level, img: img }
                usuariosService.updateById(userId, newUsuario).then((result) => {
                    if (result instanceof ApiException) {
                        alert(result.message);
                    } else {
                        console.log('alterado com sucesso')
                        navigate(`/perfil`)

                    }
                });
            }
        }
    };

    return (
        <>
            <MenuLateral />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection='column'
                minHeight="90vh"
                p={6}
                sx={{ bgcolor: "#f6f6f6" }}
            >

                <MenuHorizontal to="/listagem" />

                <TableContainer component={Paper} sx={{ maxWidth: 1500 }}>
                    <Box>
                        <Typography variant="h5" sx={{ m: 4, marginLeft: 7 }}>Informações</Typography>
                    </Box>
                    <Table sx={{ minWidth: 650, height: "70vh", marginTop: "-40px" }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ display: 'flex', flexWrap: 'wrap', gap: 7, m: 5 }}>
                                <TableCell align="left" sx={{ border: 'none' }}><InfoUser type="text" label="Nome" name={loggedUser?.name} value={name} onChange={setname} /></TableCell>
                                <TableCell align="left" sx={{ border: 'none' }}><InfoUser type="text" label="Email" name={loggedUser?.email} value={email} onChange={setEmail} /></TableCell>
                                <TableCell align="left" sx={{ border: 'none' }}><InfoUser type="text" label="Nivel de Acesso" name={String(loggedUser?.level)} onChange={setJokey} /></TableCell>
                                <TableCell align="left" sx={{ border: 'none' }}><InfoUser type="text" label="Foto de Perfil" name={loggedUser?.img} value={img} onChange={setImg} /></TableCell>
                                <TableCell align="left" sx={{ border: 'none' }}><InfoUser type="text" label="Senha" name={loggedUser?.password} value={password} onChange={setPassword} /></TableCell>
                                <TableCell align="left" sx={{ border: 'none' }}><InfoUser type="text" label="Confirmar senha" name={loggedUser?.password} value={password2} onChange={setPassword2} /></TableCell>

                            </TableRow>
                        </TableHead>
                        <Box display='flex' alignItems='end' justifyContent='end'>
                            <Button variant="contained" type="button" onClick={handleSave} sx={{width: '200px' ,marginTop: "50px", marginRight: "150px", marginBottom: "100px",bgcolor: '#006400'}}>Salvar</Button>    
                        </Box>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}