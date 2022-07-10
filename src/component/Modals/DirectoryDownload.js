import React, { useCallback, useState, useEffect, useRef } from "react";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    FormControl,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import PathSelector from "../FileManager/PathSelector";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { setModalsLoading, toggleSnackbar } from "../../redux/explorer";
import { submitCompressTask } from "../../redux/explorer/action";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    contentFix: {
        padding: "10px 24px 0px 24px",
        backgroundColor: theme.palette.background.default,
    },
    wrapper: {
        margin: theme.spacing(1),
        position: "relative",
    },
    buttonProgress: {
        color: theme.palette.secondary.light,
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function DirectoryDownloadDialog(props) {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const classes = useStyles();

    const logRef = useRef();
    const autoScroll = useRef(true);

    useEffect(() => {
        if (autoScroll.current && logRef.current) {
            logRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [props.log]);

    return (
        <Dialog
            open={props.open}
            // open
            onClose={props.onClose}
            aria-labelledby="form-dialog-title"
            fullWidth
        >
            <DialogTitle id="form-dialog-title">
                {t("modals.directoryDownloadTitle")}
            </DialogTitle>

            <DialogContent className={classes.contentFix}>
                <TextField
                    value={props.log}
                    ref={logRef}
                    multiline
                    fullWidth
                    autoFocus
                    id="standard-basic"
                />
            </DialogContent>
            <DialogActions>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={autoScroll.current}
                            onChange={() =>
                                (autoScroll.current = !autoScroll.current)
                            }
                        />
                    }
                    label={t("modals.directoryDownloadAutoscroll")}
                />
                <Button onClick={props.onClose} disabled>
                    {t("cancel", { ns: "common" })}
                </Button>
                <div className={classes.wrapper}>
                    <Button
                        color="primary"
                        disabled={!props.done}
                        onClick={props.onClose}
                    >
                        {t("ok", { ns: "common" })}
                        {!props.done && (
                            <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                            />
                        )}
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
}
