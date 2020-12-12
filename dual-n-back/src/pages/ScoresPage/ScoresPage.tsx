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
import {ScoresList } from "./ScoresList";


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
            <ScoresList >
            </ScoresList>
            </Paper>  
        </div>
    )
}