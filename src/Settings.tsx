import React from 'react';
import { Button, Container, TextField, Paper, makeStyles, Box, InputAdornment } from '@material-ui/core';
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
    },
    helperText: {
        margin: 0,
        display: "block",
        paddingTop: theme.spacing(0),
        paddingRight: theme.spacing(5),
        position: "absolute",
        top: theme.spacing(1),
        right: "0",
        float: "right"
    }
}));
const Settings: React.FC = () => {
    var pref = new Prefs();
    const [LKeyCode, setLKeyCode] = React.useState<number>(pref.getLeftCode());
    const [RKeyCode, setRKeyCode] = React.useState<number>(pref.getRightCode());
    const [StartKeyCode, setStartKeyCode] = React.useState<number>(pref.getStartCode());
    const [ResetKeyCode, setResetKeyCode] = React.useState<number>(pref.getResetCode());

    const [timer, setTimer] = React.useState<number>(pref.getTimer());
    const [timer2, setTimer2] = React.useState<number>(pref.getTimer2());
    const classes = useStyles();

    return <Container maxWidth="md">
        <Paper className={classes.root} >
            <TextField label="Время раунда (сек)"
                fullWidth
                margin="dense"
                variant="outlined"
                type="number"
                InputProps={{
                    endAdornment: <InputAdornment position="end" className={classes.helperText}>по умолчанию 60 сек</InputAdornment>,
                }}
                value={timer}
                onChange={(event) => setTimer(Number.parseInt(event.target.value))}
            >
            </TextField>
            <TextField label="Время после ошибки (сек)"
                fullWidth
                margin="dense"
                variant="outlined"
                InputProps={{
                    endAdornment: <InputAdornment position="end" className={classes.helperText}>по умолчанию 20 сек</InputAdornment>,
                }}
                type="number"
                value={timer2}
                onChange={(event) => setTimer2(Number.parseInt(event.target.value))}
            >
            </TextField>
            <br />
            <br />
            <TextField
                fullWidth
                label="Кнопка 1 (keyCode)"
                margin="dense"
                InputProps={{
                    endAdornment: <InputAdornment position="end" className={classes.helperText}>по умолчанию 'Влево'</InputAdornment>,
                }}
                variant="outlined"
                value={LKeyCode}
                onKeyDown={(event) => setLKeyCode(event.keyCode)}
            >
            </TextField>
            <TextField label="Кнопка 2 (keyCode)"
                fullWidth
                margin="dense"
                InputProps={{
                    endAdornment: <InputAdornment position="end" className={classes.helperText}>по умолчанию 'Вправо'</InputAdornment>,
                }}
                variant="outlined"
                value={RKeyCode}
                onKeyDown={(event) => setRKeyCode(event.keyCode)}>
            </TextField>
            <br />
            <br />
            <TextField label="Старт таймера (keyCode)"
                fullWidth
                margin="dense"
                InputProps={{
                    endAdornment: <InputAdornment position="end" className={classes.helperText}>по умолчанию 'num +'</InputAdornment>,
                }}
                variant="outlined"
                value={StartKeyCode}
                onKeyDown={(event) => setStartKeyCode(event.keyCode)}>
            </TextField>
            <TextField label="Сброс таймера (keyCode)"
                fullWidth
                margin="dense"
                InputProps={{
                    endAdornment: <InputAdornment position="end" className={classes.helperText}>по умолчанию 'Delete'</InputAdornment>,
                }}
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
                            pref.setTimer2(timer2);
                            window.location.reload();

                        }}>Сохранить</Button>
                </Box>
            </div>

        </Paper>
    </Container >
}
export default Settings;