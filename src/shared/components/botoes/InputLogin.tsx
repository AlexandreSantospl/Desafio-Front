import { Box, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import React from "react";

interface IInputLoginProps {
    label: string;
    value?: string;
    type?: string;
    valueN?: number;
    number?: boolean;
    onPressEnter?: () => void;
    onChange: (newValue: string) => void;
}

export const InputLogin = React.forwardRef<HTMLInputElement, IInputLoginProps>((props, ref) => {
    return (
        <Box>
            <Typography variant="h6">{props.label}</Typography>
            <TextField
                sx={{ width: "525px" }}
                ref={ref}
                id="outlined-basic"
                variant="outlined"
                type={props.type}
                placeholder={props.label}
                value={props.number ? props.valueN : props.value}
                onChange={e => props.onChange(e.target.value)}
                onKeyDown={e => e.key === 'Enter'
                    ? props.onPressEnter && props.onPressEnter()
                    : undefined} />

        </Box>
    )
});