import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 600,
      maxHeight: 600,
      display: "flex",
      gap: 16,
      flexDirection: "column",
    },
    fxHorizontal: {
      display: "flex",
      flexDirection: "row",
      flex: 1,
      gap: 16,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      width: 200,
      height: 200-16,
      color: theme.palette.text.secondary,
      WebkitTransition: "background-color 0.3s; /* For Safari 3.1 to 6.0 */",
      transition: "background-color 0.3s",
    },
    selectedPaper: {
      background: theme.palette.primary.main,
    },
  })
);
