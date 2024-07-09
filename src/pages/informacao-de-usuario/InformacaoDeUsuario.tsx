import { Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { MenuHorizontal } from "../../shared/components"
import { InfoUser } from "../../shared/components/botoes/InfoUser"
import { useEffect, useState } from "react"
import { IUsuario, usuariosService } from "../../shared/services/api/usuarios/UsuariosService"
import { useParams } from "react-router-dom"
import { ApiException } from "../../shared/services/api/ApiException"

export const InformacaoDeUsuario = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [jokey, setJokey] = useState('')
    const [user, setUser] = useState<IUsuario | null>(null)

    const { id } = useParams<{ id: string }>();

    const userId = Number(id)

    useEffect(() => {
        usuariosService.getById(userId).then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);
            } else {
                setUser(result);
            }
        })
    }, [userId]);

    return (
        <>

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
                                <TableCell align="left" sx={{border: 'none'}}><InfoUser type="text" label="Nome" name={user?.name} onChange={setJokey} /></TableCell>
                                <TableCell align="left" sx={{border: 'none'}}><InfoUser type="text" label="Email" name={user?.email} onChange={setJokey} /></TableCell>
                                <TableCell align="left" sx={{border: 'none'}}><InfoUser type="text" label="Nivel de Acesso" name={String(user?.level)} onChange={setJokey} /></TableCell>
                                <TableCell align="left" sx={{border: 'none', height: '1px'}}><InfoUser type="hidden" noTypography noTextfield onChange={setJokey} /></TableCell>
                                <TableCell align="left" sx={{border: 'none'}}><InfoUser type="text" label="Senha" name={user?.password} onChange={setJokey} /></TableCell>
                                <TableCell align="left" sx={{border: 'none'}}><InfoUser type="text" label="Confirmar senha" name={user?.password} onChange={setJokey} /></TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}