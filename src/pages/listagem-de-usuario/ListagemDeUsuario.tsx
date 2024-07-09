import { Box, Button, Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { MenuHorizontal } from "../../shared/components"
import { useCallback, useEffect, useState } from "react"
import { IUsuario, usuariosService } from "../../shared/services/api/usuarios/UsuariosService"
import { ApiException } from "../../shared/services/api/ApiException"
import { ModalUpdate } from "../../shared/components/modal-update/ModalUpdate"
import { useUsuarioLogado } from "../../shared/context/UsuarioLogadoContext"

export const ListagemDeUsuario = () => {

    const [rows, setRows] = useState<IUsuario[]>([])
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const { user: usuarioLogado } = useUsuarioLogado()

    useEffect(() => {
        usuariosService.getAll().then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);
            } else {
                setRows(result);
            }
        })
    }, [rows]);

    const handleDelete = useCallback((id: number) => {
        if (usuarioLogado?.level === 4 || usuarioLogado?.level === 5) {
            usuariosService.deleteById(id).then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    alert("Excluido com sucesso")
                }
            })
        } else {
            alert("Você não tem permissão para excluir usúarios")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleUpdate = useCallback((id: number) => {
        if (usuarioLogado?.level === 4 || usuarioLogado?.level === 5) {
            setSelectedUserId(id);
        } else {
            alert("Você não tem permissão para editar usúarios")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCloseModal = () => {
        setSelectedUserId(null);
    };


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection='column'
            minHeight="85vh"
            p={6}
            sx={{ bgcolor: "#f6f6f6" }}
        >

            <MenuHorizontal dialog to="#" user />

            <TableContainer component={Paper} sx={{ maxWidth: 1500 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ bgcolor: "#f6f6f6" }}>
                        <TableRow>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Nivel de Acesso</TableCell>
                            <TableCell align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {rows.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell align="left">{user.name}</TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">{user.level}</TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => { handleUpdate(user.id) }} sx={{ height: "30px", width: "10px" }}>
                                        <Icon sx={{ color: '#006400' }}>create</Icon>
                                    </Button>
                                    <Button sx={{ height: "30px", width: "10px" }}>
                                        <Icon onClick={() => { handleDelete(user.id) }} sx={{ color: 'red' }}>delete</Icon>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>

            {selectedUserId !== null && (
                <ModalUpdate userId={selectedUserId} onClose={handleCloseModal} to="/usuario" />
            )}
        </Box>

    )
}
