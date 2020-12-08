import { Button, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { Hearing, Visibility } from "@material-ui/icons";
import React, { useEffect, useReducer } from "react";
import { BoardEngine, calculateNewScore, FlashModel } from "../../components/BoardEngine";
import { GridBoard } from "../../components/GridBoard/GridBoard";
import { HighScores, Score } from "../../components/HighScores/HighScores";
import { NextLevelDialog } from "../../components/NextLevelDialog/NextLevelDialog";
import { StartGameDialog } from "../../components/StartGameDialog/StartGameDialog";
import { TextSound } from "../../components/TextSound";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "relative",
            flex: 1,
            flexDirection: "column",
            [theme.breakpoints.up('md')]: {
                flexDirection: "row"
            },
            display: "flex",
            justifyContent: "center"
        },
        scores: {
            display: "flex",
            justifyContent: "center",
            [theme.breakpoints.down('md')]: {
                marginTop: theme.spacing(3)
            },
        },
        title: {
            marginBottom: theme.spacing(2)
        },
        button: {
            margin: theme.spacing(1)
        },
        buttonContainer: {
            flexDirection: "row",
            marginTop: theme.spacing(3)
        },
        gameContainer: { flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }
    }),
);

export const INVALID_SCORE: number = -1;
type GameAction = { type: "startGame" } | { type: "stopGame" } | { type: "waitForNextLevel" } | { type: "startNextLevel" } | { type: "nextTurn" } | { type: "samePosition" } | { type: "sameSound" }
export const MIN_AVG = 0.8;
export const LETTERS_N_BACK = "CHKLQSRT";
export const MOVES_PER_LEVEL = 5;
interface GameState { history: FlashModel[], waitForNextLevel: boolean, round: number, running: boolean, level: number, score: number, errors: number, hasUsedTurn: boolean }
const INIT_GAME_STATE: GameState = { history: [], round: 0, score: -1, waitForNextLevel: false, errors: 0, hasUsedTurn: false, running: false, level: 1 };
function gameReducer(state: GameState, action: GameAction): GameState {
    if (!state.running && !state.waitForNextLevel && action.type !== "startGame") {
        return state;
    }

    switch (action.type) {
        case "startGame":
            return {
                ...INIT_GAME_STATE,
                score: 0,
                running: true,
                waitForNextLevel: false,
                round: 0
            }
        case "waitForNextLevel":
            return {
                ...state,
                running: false,
                waitForNextLevel: true
            }
        case "stopGame":
            return {
                ...state,
                running: false,
                waitForNextLevel: false
            }
        case "startNextLevel":
            return {
                ...state,
                history: [],
                level: state.level + 1,
                running: true,
                waitForNextLevel: false
            }
        case "nextTurn":
            // We check against MOVES_PER_LEVEL + state.level + 1 because the first "level" changes do not count towards the score. 
            // Ex: Level 1 has 2 moves
            const shouldUpdateScore = !(state.hasUsedTurn || state.history.length - 1 < state.level + 1);
            const isIncorrect: boolean = (BoardEngine.samePosition(state.level, state.history) || BoardEngine.sameSound(state.level, state.history));
            const nextStateWithScore = {
                ...state,
                history: [...state.history, BoardEngine.next(state.history)],
                ...shouldUpdateScore ?
                    (isIncorrect ?
                        { errors: state.errors + 1, score: calculateNewScore(state.score, state.level, false) } :
                        { score: calculateNewScore(state.score, state.level, true) }) :
                    {},
                hasUsedTurn: false,
            };

            if (state.running && state.history.length >= MOVES_PER_LEVEL + state.level + 1) {
                const avg = (MOVES_PER_LEVEL - state.errors) / MOVES_PER_LEVEL;
                if (avg > MIN_AVG) {
                    return gameReducer(nextStateWithScore, { type: "waitForNextLevel" });
                }
                if (state.running) {
                    return gameReducer(nextStateWithScore, { type: "stopGame" });
                }
            }

            return {
                ...nextStateWithScore,
                history: [...state.history, BoardEngine.next(state.history)],
                round: state.round + 1
            }

        case "samePosition":
            return state.hasUsedTurn ? state : {
                ...state,
                ...BoardEngine.samePosition(state.level, state.history) ?
                    { score: calculateNewScore(state.score, state.level, true) } :
                    { errors: state.errors + 1, score: calculateNewScore(state.score, state.level, false) },
                hasUsedTurn: true
            }
        case "sameSound":
            return state.hasUsedTurn ? state : {
                ...state,
                ...BoardEngine.sameSound(state.level, state.history) ?
                    { score: calculateNewScore(state.score, state.level, true) } :
                    { errors: state.errors + 1, score: calculateNewScore(state.score, state.level, false) },
                hasUsedTurn: true
            }
        default:
            return state;

    }
}
export const PlayPage = () => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(gameReducer, INIT_GAME_STATE);
    const lastItem: FlashModel | null = state.history.length > 0 ? state.history[state.history.length - 1] : null;
    const lastItemPos: number = lastItem?.position ?? -1;
    const lasttext: TextSound = !!lastItem?.sound || lastItem?.sound === 0 ?
        LETTERS_N_BACK.charAt(lastItem.sound).toString() as TextSound : null;

    console.log(lastItem);
    console.log(lasttext);

    const scores: Score[] = [
        { username: "David", score: 10, uid: "1" },
        { username: "Lies", score: 50, uid: "2" },
        { username: "Ondrej", score: 20, uid: "3" },
        { username: "Veikka", score: 40, uid: "5" }

    ];
    // useEffect(() => dispatch({ type: "startGame" }), [])
    useEffect(() => {
        if(state.running){
            const interval = setInterval(() => dispatch({ type: "nextTurn" }), 3000);

            return () => clearInterval(interval);
        }
        
    }, [state.running]);

    return (
        <div className={classes.root} id="main-game-container">
            <TextSound text={lasttext} id={state.round} />
            <div className={classes.gameContainer}>
                <Typography variant="h2" className={classes.title}>
                    Score: {state.score === INVALID_SCORE ? 0 : state.score}
                </Typography>
                <Typography variant="subtitle1">
                    Level: {state.level}, Dual {state.level+1}-N-Back
                </Typography>
                
                <GridBoard selectedTile={lastItemPos} />
                <div className={classes.buttonContainer}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<Visibility />}
                        onClick={() => dispatch({ type: "samePosition" })}
                    >
                        Visual
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<Hearing />}
                        onClick={() => dispatch({ type: "sameSound" })}
                    >
                        Audio
                    </Button>
                </div>
            </div>
            <div className={classes.scores}>
                <HighScores scores={scores} ></HighScores>
            </div>
            <NextLevelDialog open={state.waitForNextLevel} onClose={() => dispatch({ type: "startNextLevel" })} level={state.level + 1} />
            <StartGameDialog open={!state.running && !state.waitForNextLevel} onClose={() => dispatch({ type: "startGame" })} level={state.level} score={state.score} />
        </div>

    )
};
