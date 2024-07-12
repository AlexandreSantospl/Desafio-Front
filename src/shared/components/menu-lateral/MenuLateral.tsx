import { Avatar, Box, Button, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useDrawerContext, useUsuarioLogado } from "../../context";


export interface IListItemLinkProps {
    label?: string;
    icon?: string;
    to: string;
    onClick?: (() => void) | undefined;

}

export const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {

    const navigate = useNavigate()

    const resolvedPath = useResolvedPath(to);

    const match = useMatch({ path: resolvedPath.pathname, end: false })

    const handleClick = () => {
        onClick?.();
        navigate(to)
    }

    return (
        <ListItemButton selected={!!match} onClick={handleClick} >
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    )
}

export const MenuLateral: React.FC<{ show?: boolean }> = () => {

    const { user: loggedUser } = useUsuarioLogado();

    const theme = useTheme();

    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

    return (
        <>
            <Drawer open={isDrawerOpen} variant={"temporary"} onClose={toggleDrawerOpen}>
                <Box height="100%" width={theme.spacing(28)} display="flex" flexDirection="column">


                    <Box width="100%" height={theme.spacing(20)} display="flex" justifyContent="center" alignItems="center">
                        <Avatar sx={{ height: theme.spacing(12), width: theme.spacing(12) }} src={loggedUser?.img} />
                    </Box>

                    <Divider />

                    <Box height={theme.spacing(10)} marginLeft="10%" width="80%" display="flex" justifyContent="center" alignItems="center">
                        <Button variant="contained" color="secondary" size="large" fullWidth>
                            <Typography>Nivel {loggedUser?.level} </Typography>
                        </Button>
                    </Box>

                    <Divider />

                    <Box flex={1} >
                        <List component="nav">
                            {drawerOptions.map(drawerOptions => (
                                <ListItemLink
                                    key={drawerOptions.path}
                                    icon={drawerOptions.icon}
                                    label={drawerOptions.label}
                                    to={drawerOptions.path}
                                    onClick={smDown ? toggleDrawerOpen : undefined} />
                            ))}
                        </List>
                    </Box>

                    <Box>
                        <ListItemLink to="/login" icon="logout" label="Logout"/>
                    </Box>

                </Box>
            </Drawer>

        </>
    )
}
