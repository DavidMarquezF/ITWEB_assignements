import React from "react";
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { typography } from '@material-ui/system';
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1440,
        flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
    },
    headline: {
        fontSize: 36,
        textAlign: "center"
    },
    top3: {
        fontSize: 28,
        fontWeight: "bold",
    },
    one: {
        color: 'gold',
        marginRight: 20,
    },
    two: {
        color: 'silver',
        marginRight: 20,
    },
    three: {
        color: 'brown',
        marginRight: 20,
    },
    scoresList: {
        columnCount: 5,
        [theme.breakpoints.down('md')]: {
            columnCount: 4
        },
        [theme.breakpoints.down('sm')]: {
            columnCount: 3
        },
        [theme.breakpoints.down('xs')]: {
            columnCount: 2
        }
    },
    highScoreContainer: {
        padding: theme.spacing(3),
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    },
    scoreListContainer: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(3)
    }
}));

export const ScoresPage = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.highScoreContainer}>
            <h1 className={classes.headline}>High scores</h1>
            <List className={classes.top3} component="ol" aria-label="top3">
                <ListItem><LooksOneIcon className={classes.one} /> John 30600</ListItem>
                <ListItem><LooksTwoIcon className={classes.two} /> Alan 29900</ListItem>
                <ListItem><Looks3Icon className={classes.three} /> Jennifer 29000</ListItem>
            </List>    
            </Paper>
            
            <Paper className={classes.scoreListContainer}>
            <List className={classes.scoresList} component="ul" aria-label="scoresList">
                <ListItem>Joseph 26600</ListItem>
                <ListItem>Senna 26400</ListItem>
                <ListItem>Harriet 23700</ListItem>
                <ListItem>Manny 22200</ListItem>
                <ListItem>Michael 22000</ListItem>
                <ListItem>Paul 21200</ListItem>
                <ListItem>Erik 21100</ListItem>
                <ListItem>Jenna 20900</ListItem>
                <ListItem>Henry 20000</ListItem>
                <ListItem>Niels 19600</ListItem>
                <ListItem>Anthony 19400</ListItem>
                <ListItem>Drake 18700</ListItem>
                <ListItem>Joseph 16600</ListItem>
                <ListItem>Senna 16400</ListItem>
                <ListItem>Harriet 13700</ListItem>
                <ListItem>Manny 12200</ListItem>
                <ListItem>Michael 12000</ListItem>
                <ListItem>Paul 11200</ListItem>
                <ListItem>Erik 11100</ListItem>
                <ListItem>Jenna 10900</ListItem>
                <ListItem>Henry 10000</ListItem>
                <ListItem>Niels 9600</ListItem>
                <ListItem>Anthony 9400</ListItem>
                <ListItem>Drake 8700</ListItem>
                <ListItem>Josh 6600</ListItem>
                <ListItem>Senna 6400</ListItem>
                <ListItem>Harriet 3700</ListItem>
                <ListItem>Manny 2200</ListItem>
                <ListItem>Michael 2000</ListItem>
                <ListItem>Paul 1200</ListItem>
                <ListItem>Erik 1100</ListItem>
                <ListItem>Jenna 900</ListItem>
                <ListItem>Henry 800</ListItem>
                <ListItem>Niels 600</ListItem>
                <ListItem>Anthony 400</ListItem>
                <ListItem>Drake 300</ListItem>
            </List>
            </Paper>
            
        </div>
    )
};