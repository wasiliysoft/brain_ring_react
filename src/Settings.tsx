import React from 'react';
import { Button, Container, TextField, Paper, makeStyles, Box } from '@material-ui/core';
import Prefs from './PrefHelper';
import { grey } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(4),
        backgroundColor: grey[200],
    },
    footerBtn: {
        flexGrow: 1,
        display: "flex",
        alignContent: "flex-end",
        justifyContent: "center",
    }
}));
const Settings: React.FC = () => {
    var pref = new Prefs();
    const [LKeyCode, setLKeyCode] = React.useState<number>(pref.getLeftCode());
    const [RKeyCode, setRKeyCode] = React.useState<number>(pref.getRightCode());
    const [StartKeyCode, setStartKeyCode] = React.useState<number>(pref.getStartCode());
    const [ResetKeyCode, setResetKeyCode] = React.useState<number>(pref.getResetCode());

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
            <br />
            <br />
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
            <TextField label="Старт таймера (keyCode)"
                fullWidth
                margin="dense"
                variant="outlined"
                value={StartKeyCode}
                onKeyDown={(event) => setStartKeyCode(event.keyCode)}>
            </TextField>
            <TextField label="Сброс таймера (keyCode)"
                fullWidth
                margin="dense"
                variant="outlined"
                value={ResetKeyCode}
                onKeyDown={(event) => setResetKeyCode(event.keyCode)}>
            </TextField>
            <br />
            <br />
            <div className={classes.footerBtn}>
                <Box p={1}>
                    <Button variant="outlined" color="secondary"
                        onClick={() => {
                            if (window.confirm("Восстановить значения по умолчанию?")) {
                                pref.restoreDefault();
                                window.location.reload();
                            }
                        }}>По умолчанию</Button>
                </Box>
                <Box p={1}>
                    <Button variant="outlined" color="primary"
                        onClick={() => {
                            pref.setLeftCode(LKeyCode);
                            pref.setRightCode(RKeyCode);
                            pref.setStartCode(StartKeyCode);
                            pref.setResetCode(ResetKeyCode);
                            pref.setTimer(timer);
                            window.location.reload();

                        }}>Сохранить</Button>
                </Box>
            </div>

        </Paper>
    </Container >
}
export default Settings;