import React from 'react';
import { Button, Container, TextField, Paper, makeStyles } from '@material-ui/core';
import Prefs from './PrefHelper';
import { grey } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(4),
        backgroundColor: grey[200],
    }
}));
const Settings: React.FC = () => {
    var pref = new Prefs();
    const [LKeyCode, setLKeyCode] = React.useState<number>(pref.getLeftCode());
    const [RKeyCode, setRKeyCode] = React.useState<number>(pref.getRightCode());
    const [timer, setTimer] = React.useState<number>(pref.getTimer());
    const classes = useStyles();

    return <Container maxWidth="md">
        <Paper className={classes.root} >
            <TextField label="Время раунда (сек)"
                fullWidth
                margin="dense"
                variant="outlined"
                type="number"
                value={timer}
                onChange={(event) => setTimer(Number.parseInt(event.target.value))}
            >
            </TextField>
            <TextField
                fullWidth
                label="Кнопка 1 (keyCode)"
                margin="dense"
                variant="outlined"
                value={LKeyCode}
                onKeyDown={(event) => setLKeyCode(event.keyCode)}
            >
            </TextField>
            <TextField label="Кнопка 2 (keyCode)"
                fullWidth
                margin="dense"
                variant="outlined"
                value={RKeyCode}
                onKeyDown={(event) => setRKeyCode(event.keyCode)}>
            </TextField>
            <br />
            <br />

            <Button fullWidth variant="outlined" color="primary"
                onClick={() => {
                    pref.setLeftCode(LKeyCode);
                    pref.setRightCode(RKeyCode);
                    pref.setTimer(timer);
                }}>Сохранить</Button>
        </Paper>
    </Container >
}
export default Settings;