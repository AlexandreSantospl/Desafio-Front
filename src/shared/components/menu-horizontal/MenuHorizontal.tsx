import { Box, Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ModalCreate } from "../modal-create/ModalCreate";
import { useNavigate } from "react-router-dom";
import { useUsuarioLogado } from "../../context/UsuarioLogadoContext";

interface IMenuHorizontal {
    userName?: string;
    width?: string;
    gap?: number;
    maxWidth?: number;
    dialog?: boolean;
    user?: boolean;
    onClick?: (() => void) | undefined
    to: string;
}

export const MenuHorizontal: React.FC<IMenuHorizontal> = ({ maxWidth = 1500, dialog = false, user = false, onClick, to }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        onClick?.();
        navigate(to)
    }

    const { user: loggedUser } = useUsuarioLogado();

    return (
        <>
            <Box
                component={Paper}
                variant="elevation"
                width='100%'
                minHeight="100%"
                sx={{ maxWidth: maxWidth, borderRadius: "5px" }}>

                <TableContainer component={Paper} sx={{ maxWidth: 1500 }}>
                    <Table sx={{ minWidth: 650, height: "80px" }} aria-label="simple table">
                        <TableHead >
                            <TableRow >
                                <TableCell sx={{ paddingLeft: '54px' }} align="left">{user ? <Typography variant="h5">Usuários</Typography> : <Typography variant="h5">{loggedUser?.name}</Typography>}</TableCell>
                                <TableCell sx={{ paddingRight: '125px' }} align="right">{dialog ? <ModalCreate /> : <Button variant="contained" type="button" onClick={handleClick} sx={{ bgcolor: '#006400', marginRight: '10px' }}>Voltar para tabela</Button>}</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </Box>



        </>

    )
}