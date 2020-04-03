import React from 'react';
import { makeStyles, CircularProgress, Button, Typography, Box } from '@material-ui/core';
import ScoreBox from './Score';
import Player, { PlayerStatus } from './Player';
import Prefs from './PrefHelper';

var audioStart = new Audio("audio/start.wav");
var audioButton = new Audio("audio/button.wav");
var audioFalseStart = new Audio("audio/falsestart.wav");
var audioTimeOut = new Audio("audio/timeout.wav");


const useStyles = makeStyles((theme) => ({
    root: {
        padding: "0",
        margin: "0",
        //border: "1px solid green",
        height: '90vh',
        width: '100vw',
        //backgroundColor: "grey",
        align: "center"
    },
    td: {
        // border: "1px solid red",
    },
    progress: {
        display: "block",
        position: "relative",
        //    border: "1px solid green",
    },
    inProgress: {
        display: "block",
        position: "absolute",
        width: "100%",
        //border: "1px solid red",
        top: "180px",
    },
    commandBtn: {
        margin: theme.spacing(1)
    },
    center: {
        backgroundColor: "red",
        textAlign: "center",
        align: "center",
    }
}));
enum Mode { "game", "pause" }

const div = (x: number, y: number) => {
    var c = ((x - x % y) / y);
    //console.log(c, x / y);
    if (c < (x / y)) {
        return c + 1;
    } else {
        return c;
    }
}

const Game: React.FC = () => {
    var pref = new Prefs();

    const maxTime = pref.getTimer() * 10;
    const [timer, setTimer] = React.useState<number>(maxTime);

    const [mode, setMode] = React.useState<Mode>(Mode.pause);
    const [lPlayer, setLPlayer] = React.useState<Player>(new Player("Команда 1"));
    const [rPlayer, setRPlayer] = React.useState<Player>(new Player("Команда 2"));
    const classes = useStyles();


    React.useEffect(() => {
        function progress() {
            if (mode === Mode.game) {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        audioTimeOut.play();
                        clearInterval(timer);
                        return 0;
                    } else {
                        return prevTimer - 1
                    }
                }
                );
            }
        }

        const timer = setInterval(progress, 100);
        return () => {
            clearInterval(timer);
        };
    }, [mode, lPlayer, rPlayer]);

    const startGame = () => {
        readyPlayer();
        setMode(Mode.game);
        audioStart.play();
    }

    const restartGame = () => {
        readyPlayer();
        setTimer(maxTime);
        setMode(Mode.pause);
    }

    const readyPlayer = () => {
        let player = Object.create(lPlayer) as Player;
        player.status = PlayerStatus.ready;
        setLPlayer(player);
        player = Object.create(rPlayer) as Player;
        player.status = PlayerStatus.ready;
        setRPlayer(player);
    }

    window.onkeydown = (ev: KeyboardEvent) => {
        console.log(ev.keyCode);
        if (ev.keyCode === 32 && mode !== Mode.game) {
            startGame();
            return;
        }
        let player: Player;
        switch (ev.keyCode) {
            case pref.getStartCode():
                startGame();
                return;
            case pref.getResetCode():
                restartGame();
                return;

            case pref.getLeftCode(): //q Левый стол
                player = Object.create(lPlayer) as Player;
                if (mode !== Mode.game && player.status !== PlayerStatus.active) {
                    player.status = PlayerStatus.falstart;
                    audioFalseStart.play();
                } else {
                    player.status = PlayerStatus.active;
                    audioButton.play();
                }
                setLPlayer(player);
                break;
            case pref.getRightCode(): //w Правый стол
                player = Object.create(rPlayer) as Player;
                if (mode !== Mode.game && player.status !== PlayerStatus.active) {
                    player.status = PlayerStatus.falstart;
                    audioFalseStart.play();
                } else {
                    player.status = PlayerStatus.active;
                    audioButton.play();
                }
                setRPlayer(player);
                break;
            default:
                return;
        }
        if (timer > (pref.getTimer2() * 10)) {
            setTimer(pref.getTimer2() * 10);
        }
        setMode(Mode.pause);
    }




    return <table className={classes.root}>
        <tr className={classes.td}>
            <td align="center" className={classes.td}>
                <ScoreBox player={lPlayer} />

            </td>
            <td align="center" className={classes.td}>
                <div className={classes.progress}>
                    <CircularProgress size="500px" thickness={4} variant="static" value={Math.fround((maxTime - timer) * (100 / maxTime))} />
                    <div className={classes.inProgress}>
                        <Typography

                            color={mode === Mode.game ? "secondary" : "primary"}
                            variant="h1" > {div(timer, 10)}</Typography>
                        <div>
                            <Button className={classes.commandBtn}
                                disabled={mode === Mode.game}
                                variant="outlined"
                                color="primary"
                                onClick={startGame}>Старт</Button>
                            <Button className={classes.commandBtn}
                                disabled={mode === Mode.game}
                                variant="outlined"
                                color="secondary"
                                onClick={restartGame}>Сброс</Button>
                        </div>
                    </div>
                </div>


            </td>
            <td align="center" className={classes.td}>
                <ScoreBox player={rPlayer} />

            </td>
        </tr>

    </table >



}
export default Game;