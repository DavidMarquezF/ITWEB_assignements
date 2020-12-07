import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Hearing, Visibility } from "@material-ui/icons";
import React from "react";
import { GridBoard } from "../../components/GridBoard/GridBoard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
        buttonContainer: { 
            flexDirection: "row", 
            marginTop: theme.spacing(3) 
        }
    }),
);

export const PlayPage = () => {
    const classes = useStyles();
    return (
        <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <GridBoard selectedTile={1} />
            <div className={classes.buttonContainer}>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<Visibility />}
                >
                    Visual
        </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<Hearing />}
                >
                    Audio
        </Button>
            </div>
        </div>
    )
};
