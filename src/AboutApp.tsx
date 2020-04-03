import React from 'react';
import { Container, Typography, Paper, makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(4),
        backgroundColor: grey[200],
    }
}));
const AboutApp: React.FC = () => {
    const classes = useStyles();
    return <Container maxWidth="md" >
        <Paper className={classes.root} >
            <Typography variant="h4" color="primary">Брейн-Ринг</Typography>
            <Typography variant="h6" >версия 1.0.2 от 03.02.2020</Typography>
            <br />
            <Typography variant="h4" color="primary">Разработчик</Typography>
            <Typography variant="h6" >Васильченко Виталий Юрьевич - WasiliySoft © 2020</Typography>
            <Typography variant="h6" >email: wasiliysoft@gmail.com</Typography>
        </Paper>    
    </Container >
}
export default AboutApp;