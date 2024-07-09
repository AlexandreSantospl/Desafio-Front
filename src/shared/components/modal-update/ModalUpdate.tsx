import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IUsuario, usuariosService } from "../../services/api/usuarios/UsuariosService";
import { ApiException } from "../../services/api/ApiException";
import { useNavigate } from "react-router-dom";

interface ModalUpdateProps {
    userId: number;
    onClose: () => void;
    to: string
    onClick?: (() => void) | undefined;
}

interface IInputDialogUptadeProps {
    id?: number;
    label?: string;
    name?: string;
    type: string;
    fullwidth?: boolean;
    width?: string;
    noTypography?: boolean;
    noTextfield?: boolean;
    number?: boolean;
    valueN?: number;
    value?: string;
    onChange: (newValue: string) => void;
}

export const InputDialog = React.forwardRef<HTMLInputElement, IInputDialogUptadeProps>((props, ref) => {

    return (
        <DialogContent>
            <Typography>{props.label}</Typography>
            <TextField
                margin="dense"
                fullWidth
                variant="outlined"
                ref={ref}
                name={props.name}
                label={props.name}
                type={props.type}
                value={props.number ? props.valueN : props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </DialogContent>
    )
})


export const ModalUpdate: React.FC<ModalUpdateProps> = ({ onClose, userId, to, onClick }) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [name, setname] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [level, setLevel] = useState(1);
    const [user, setUser] = useState<IUsuario | null>(null)

    useEffect(() => {
        usuariosService.getById(userId).then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);
            } else {
                setUser(result);
            }
        });
    }, [userId]);

    const handleClose = () => {
        setUser(null)
    }

    const handleSave = () => {
        if (name.length < 4) return alert("O nome precisa ter no minimo 4 letras.")
        if (email.length < 5) return alert("O email é invalido.")
        if (password !== password2) return alert("As senhas são diferentes.")
        if (level === 1 || level === 2 || level === 3 || level === 4 || level === 5) {
            const newUsuario: IUsuario = { id: userId, email: email, name: name, password: password, level: level }
            if (user) {
                usuariosService.updateById(userId, newUsuario).then((result) => {
                    if (result instanceof ApiException) {
                        alert(result.message);
                    } else {
                        onClose();
                        console.log('alterado com sucesso')
                        navigate(`/usuario/${userId}`)

                    }
                });
            }
        } else {
            return alert('Nivel Invalido')
        }
    };




    if (!user) return null;

    return (

        <>
            <Dialog
                open={true}
                onClose={handleClose}

                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <Box display='flex' gap={40} sx={{ width: "60vh" }}>
                    <DialogTitle>Editar usuário</DialogTitle>
                    <Button onClick={handleClose}><Icon sx={{ color: 'black' }}>close</Icon></Button>
                </Box>
                <InputDialog label="Nome" name={user.name} type="text" value={name} onChange={newValue => setname(newValue)} />

                <InputDialog label="Email" name={user.email} type="email" value={email} onChange={newValue => setEmail(newValue)} />

                <InputDialog label="Nivel de Acesso" name={String(user.level)} type="number" valueN={level} onChange={newValue => setLevel(Number(newValue))} />

                <InputDialog label="Senha" name={user.password} type="text" value={password} onChange={newValue => setPassword(newValue)} />

                <InputDialog label="Confirmar senha" name={user.password} type="text" value={password2} onChange={newValue => setPassword2(newValue)} />

                <DialogActions>
                    <Button variant="contained" type="submit" onClick={handleSave} sx={{ bgcolor: '#006400', m: 2 }}>Editar</Button>
                </DialogActions>
            </Dialog>
        </>

    );
};
