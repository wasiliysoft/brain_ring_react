import React from 'react';
import { Typography, makeStyles, Button, TextField, Box } from '@material-ui/core';
import { orange, red, grey } from '@material-ui/core/colors';
import Player, { PlayerStatus } from './Player';

const defScoreColor = grey[300];
const activeScoreColor = orange[600];
const falstartScoreColor = red[600];

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: theme.spacing(2),
        display: "block",
        marginTop: theme.spacing(6),
        padding: theme.spacing(3),
        //backgroundColor: "gray",
        width: "220px",
    },
    commandBtn: {
        margin: theme.spacing(1)
    },
    center: {
        display: "block",
        //backgroundColor: "green",
        textAlign: "center",
    }

}));

const ScoreBox: React.FC<{ player: Player }> = (props) => {
    const classes = useStyles();

    const [score, setScore] = React.useState<number>(0);

    let bcolor: string = defScoreColor;
    switch (props.player.status) {
        case PlayerStatus.ready:
            bcolor = defScoreColor;
            break;
        case PlayerStatus.active:
            bcolor = activeScoreColor;
            break;
        case PlayerStatus.falstart:
            bcolor = falstartScoreColor;
            break;
    }

    return <Box className={classes.root} bgcolor={bcolor} >
        <div className={classes.center}>
            <Button variant={"outlined"}
                color="primary" onClick={() => setScore((prev) => prev + 1)} >+</Button>
            <Typography variant="h1" >{score}</Typography>
            <Button variant={"outlined"}
                color="primary" onClick={() => setScore((prev) => prev - 1)}  >-</Button>
            <br />
            <br />
            <TextField
                margin="dense"
                variant="standard"
                inputProps={{ min: 0, style: { width: '200px', textAlign: 'center', fontSize: 25 } }}
                placeholder={props.player.label}
            />
        </div>

    </Box >
}
export default ScoreBox;