import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, TextField, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { usuariosService } from "../../services/api/usuarios/UsuariosService";
import { ApiException } from "../../services/api/ApiException";
import { useUsuarioLogado } from "../../context/UsuarioLogadoContext";

export interface IInputDialogProps {
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

export const InputDialog = React.forwardRef<HTMLInputElement, IInputDialogProps>((props, ref) => {

    return (
        <DialogContent sx={{marginTop: "-20px"}}>
            <Typography>{props.label}</Typography>
            <TextField
                margin="dense"
                fullWidth
                variant="outlined"
                ref={ref}
                name={props.name}
                label={props.label}
                type={props.type}
                value={props.number ? props.valueN : props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </DialogContent>
    )
})


export const ModalCreate = () => {

    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState('');
    const [name, setname] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [level, setLevel] = useState(1);
    const [img, setImg] = useState('');

    const { user: usuarioLogado } = useUsuarioLogado()

    const handleClickOpen = () => {
        if (usuarioLogado?.level === 1 || usuarioLogado?.level === 2 || usuarioLogado?.level === undefined) {
            return alert("Você não tem permissão para criar usuários")
        } else {
            setOpen(true)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleCriar = useCallback(() => {
        if (name.length < 4) return alert("O nome precisa ter no minimo 4 letras.")
        if (email.length < 5) return alert("O email é invalido.")
        if (password !== password2) return alert("As senhas são diferentes.")
        if (level === 1 || level === 2 || level === 3 || level === 4 || level === 5) {
            usuariosService.create({ email: email, name: name, password: password, level: level, img: img }).then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    alert("Sucesso")
                }
            })
        } else {
            return alert('Nivel Invalido')
        }
    }, [email, password, name, level, password2, img])

    return (

        <>
            <Button variant="contained" onClick={handleClickOpen} sx={{ height: '30px', bgcolor: '#006400', borderRadius: '15px' }} >Adicionar usúario</Button>
            <Dialog
                open={open}
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
                    <DialogTitle>Criar usuário</DialogTitle>
                    <Button onClick={handleClose}><Icon sx={{ color: 'black' }}>close</Icon></Button>
                </Box>
                <InputDialog label="Nome" name="nome" type="text" value={name} onChange={newValue => setname(newValue)} />

                <InputDialog label="Email" name="email" type="email" value={email} onChange={newValue => setEmail(newValue)} />

                <InputDialog label="Nivel de Acesso" name="acesso" type="number" valueN={level} onChange={newValue => setLevel(Number(newValue))} />

                <InputDialog label="Senha" name="senha" type="password" value={password} onChange={newValue => setPassword(newValue)} />

                <InputDialog label="Confirmar senha" name="senha2" type="password" value={password2} onChange={newValue => setPassword2(newValue)} />

                <InputDialog label="Imagem (Opcional)" name="img" type="string" value={img} onChange={newValue => setImg(newValue)} />

                <DialogActions>
                    <Button variant="contained" type="submit" onClick={handleCriar} sx={{ bgcolor: '#006400', m: 2 }}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </>

    );
};
