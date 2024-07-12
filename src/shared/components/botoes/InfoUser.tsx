import { Box, TextField, Typography } from "@mui/material"
import React from "react"
import { IInputDialogProps } from "../modal-create/ModalCreate"


export const InfoUser: React.FC<IInputDialogProps> = ({ type, label, name, fullwidth, noTypography, noTextfield, number, value, valueN, onChange}) => {
    return (
        <Box sx={noTypography ? {width: '300px', height: "1px"} : undefined}>
            {noTypography ? undefined  : <Typography>{label}</Typography>}
           {noTextfield ? undefined : <TextField
                value={number ? valueN : value}
                placeholder={name}
                name={name}
                label={name}
                type={type}
                fullWidth={fullwidth? true : false}
                variant="outlined"
                onChange={e => onChange(e.target.value)}
                sx={fullwidth? undefined : {width: '600px', height: '25px'}}
            />}
        </Box>
    )
}