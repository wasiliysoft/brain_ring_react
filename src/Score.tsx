import React from 'react';
import { Box, Typography, makeStyles, Button, TextField } from '@material-ui/core';
import { orange, red, grey } from '@material-ui/core/colors';
import Player, { PlayerStatus } from './Player';

const defScoreColor = grey[400];
const activeScoreColor = orange[600];
const falstartScoreColor = red[600];

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: theme.spacing(2),
        display: "flex",
        alignItems: 'center',
        //justifyContent: 'space-around',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: theme.spacing(6),
        //backgroundColor:"gray",
        width: "15vw",
        padding: theme.spacing(3)
    },
    commandBtn: {
        margin: theme.spacing(1)
    },

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

    return <Box p={1} className={classes.root} bgcolor={bcolor}>
        <Button variant={"outlined"}
            color="primary" onClick={() => setScore((prev) => prev + 1)} >+</Button>
        <Typography variant="h1" >{score}</Typography>
        <Button variant={"outlined"}
            color="primary" onClick={() => setScore((prev) => prev - 1)}  >-</Button>
        <br />
        <TextField
            margin="dense"
            variant="standard"
            inputProps={{ min: 0, style: { textAlign: 'center', fontSize: 25 } }}
            placeholder={props.player.label}
        />
    </Box >
}
export default ScoreBox;