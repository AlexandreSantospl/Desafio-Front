import { Button } from "@mui/material";

interface IButtonLoginProps {
    type?: "submit" | "reset" | "button" | undefined;
    onClick?: () => void;
    children?: React.ReactNode;
}

export const ButtonLogin: React.FC<IButtonLoginProps> = ({ type, onClick, children }) => {


    return (
        <Button sx={{height: '50px' ,width: "525px", bgcolor: '#006400', marginTop: '4vh', borderRadius: '5px'}} variant="contained" type={type} onClick={onClick}>
            {children}
        </Button>
    )
}