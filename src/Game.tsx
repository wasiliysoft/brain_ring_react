import React from 'react';
import { makeStyles, CircularProgress, Button, Typography, Box } from '@material-ui/core';
import ScoreBox from './Score';
import Player, { PlayerStatus } from './Player';

const useStyles = makeStyles((theme) => ({
    row: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    header: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '10vh'
    },
    footer: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '10vh'
    },
    root: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-around',
        //justifyContent: 'center',
        flexDirection: 'column',
        height: '90vh',
        width: '100vw',
    },
    progress: {
        //padding: theme.spacing(4),
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        //backgroundColor: "gray",
        position: "relative"
    },
    inProgress: {
        position: "absolute",
        marginTop: theme.spacing(3),
        display: "flex",
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    commandBtn: {
        margin: theme.spacing(1)
    },

}));
enum Mode { "game", "pause" }

const maxTime = 10;

const Game: React.FC = () => {
    const classes = useStyles();
    const [timer, setTimer] = React.useState<number>(maxTime);
    const [mode, setMode] = React.useState<Mode>(Mode.pause);
    const [lPlayer, setLPlayer] = React.useState<Player>(new Player("Красный стол"));
    const [rPlayer, setRPlayer] = React.useState<Player>(new Player("Синий стол"));

    React.useEffect(() => {
        function progress() {
            if (mode === Mode.game) {
                setTimer((prevTimer) => prevTimer <= 0 ? 0 : prevTimer - 1);
            }
        }

        const timer = setInterval(progress, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [mode, lPlayer, rPlayer]);

    const startGame = () => {
        readyPlayer();
        setMode(Mode.game);
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
            case 81: //q Левый стол
                player = Object.create(lPlayer) as Player;
                if (mode !== Mode.game && player.status !== PlayerStatus.active) {
                    player.status = PlayerStatus.falstart;
                } else {
                    player.status = PlayerStatus.active;
                }
                setLPlayer(player);
                break;
            case 87: //w Правый стол
                player = Object.create(rPlayer) as Player;
                if (mode !== Mode.game && player.status !== PlayerStatus.active) {
                    player.status = PlayerStatus.falstart;
                } else {
                    player.status = PlayerStatus.active;
                }
                setRPlayer(player);
                break;
            default:
                return;
        }
        setMode(Mode.pause);
    }




    return <Box className={classes.root} p={0}>

        <Box className={classes.header} >

        </Box>
        <Box className={classes.row} width="100vw">
            <ScoreBox player={lPlayer} />
            <div className={classes.progress}>
                <CircularProgress size="500px" variant="static" value={Math.fround((maxTime - timer) * (100 / maxTime))} />
                <div className={classes.inProgress}>
                    <Typography

                        color={mode === Mode.game ? "secondary" : "primary"}
                        variant="h1" >{timer}</Typography>
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
            <ScoreBox player={rPlayer} />
        </Box >
        <Box className={classes.footer} >
        </Box>
    </Box >

}
export default Game;