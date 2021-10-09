import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSnackbar } from "../../../actions";
import API from "../../../middleware/Api";

export default function UserFilter({ setFilter, setSearch, open, onClose }) {
    const [input, setInput] = useState({
        group_id: "all",
        status: "all",
    });
    const [groups, setGroups] = useState([]);
    const [keywords, setKeywords] = useState("");

    const dispatch = useDispatch();
    const ToggleSnackbar = useCallback(
        (vertical, horizontal, msg, color) =>
            dispatch(toggleSnackbar(vertical, horizontal, msg, color)),
        [dispatch]
    );

    const { t } = useTranslation();

    const handleChange = (name) => (event) => {
        setInput({ ...input, [name]: event.target.value });
    };

    useEffect(() => {
        API.get("/admin/groups")
            .then((response) => {
                setGroups(response.data);
            })
            .catch((error) => {
                ToggleSnackbar("top", "right", error.message, "error");
            });
    }, []);

    const submit = () => {
        const res = {};
        Object.keys(input).forEach((v) => {
            if (input[v] !== "all") {
                res[v] = input[v];
            }
        });
        setFilter(res);
        if (keywords !== "") {
            setSearch({
                nick: keywords,
                email: keywords,
            });
        } else {
            setSearch({});
        }
        onClose();
    };

    return (
      <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth={"xs"}
      >
          <DialogTitle id="alert-dialog-title">{t('Filter Conditions')}</DialogTitle>
          <DialogContent>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {t('User group')}
                  </InputLabel>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={input.group_id}
                      onChange={handleChange("group_id")}
                  >
                      <MenuItem value={"all"}>{t('all')}</MenuItem>
                      {groups.map((v) => {
                          if (v.ID === 3) {
                              return null;
                          }
                          return (
                              <MenuItem key={v.ID} value={v.ID.toString()}>
                                  {v.Name}
                              </MenuItem>
                          );
                      })}
                  </Select>
              </FormControl>
              <FormControl fullWidth style={{ marginTop: 16 }}>
                  <InputLabel id="demo-simple-select-label">
                    {t('user status')}
                  </InputLabel>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={input.status}
                      onChange={handleChange("status")}
                  >
                      <MenuItem value={"all"}>{t('all')}</MenuItem>
                      <MenuItem value={"0"}>{t('normal')}</MenuItem>
                      <MenuItem value={"1"}>{t('inactivated')}</MenuItem>
                      <MenuItem value={"2"}>{t('Blocked')}</MenuItem>
                      <MenuItem value={"3"}>{t('Excessive use is banned')}</MenuItem>
                  </Select>
              </FormControl>
              <FormControl fullWidth style={{ marginTop: 16 }}>
                  <TextField
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      id="standard-basic"
                      label={t('Search for nickname / username')}
                  />
              </FormControl>
          </DialogContent>
          <DialogActions>
              <Button onClick={onClose} color="default">
                {t('Cancel')}
              </Button>
              <Button onClick={submit} color="primary">
                {t('application')}
              </Button>
          </DialogActions>
      </Dialog>
    );
}
