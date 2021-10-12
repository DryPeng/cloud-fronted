import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { lighten, makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
    Assignment,
    Category,
    CloudDownload,
    Contacts,
    Group,
    Home,
    Image,
    InsertDriveFile,
    Language,
    ListAlt,
    Mail,
    Palette,
    Person,
    Settings,
    SettingsEthernet,
    Share,
    Storage,
} from "@material-ui/icons";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { useRouteMatch } from "react-router-dom";
import { changeSubTitle } from "../../redux/viewUpdate/action";
import pathHelper from "../../utils/page";
import UserAvatar from "../Navbar/UserAvatar";

const ExpansionPanel = withStyles({
    root: {
        maxWidth: "100%",
        boxShadow: "none",
        "&:not(:last-child)": {
            borderBottom: 0,
        },
        "&:before": {
            display: "none",
        },
        "&$expanded": { margin: 0 },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        minHeight: 0,
        padding: 0,

        "&$expanded": {
            minHeight: 0,
        },
    },
    content: {
        maxWidth: "100%",
        margin: 0,
        display: "block",
        "&$expanded": {
            margin: "0",
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        display: "block",
        padding: theme.spacing(0),
    },
}))(MuiExpansionPanelDetails);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        width: "100%",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    sub: {
        paddingLeft: 36,
        color: theme.palette.text.secondary,
    },
    subMenu: {
        backgroundColor: theme.palette.background.default,
        paddingTop: 0,
        paddingBottom: 0,
    },
    active: {
        backgroundColor: lighten(theme.palette.primary.main, 0.8),
        color: theme.palette.primary.main,
        "&:hover": {
            backgroundColor: lighten(theme.palette.primary.main, 0.7),
        },
    },
    activeText: {
        fontWeight: 500,
    },
    activeIcon: {
        color: theme.palette.primary.main,
    },
}));

const items = [
    {
        title: i18next.t('Home'),
        icon: <Home />,
        path: "home",
    },
    {
        title: i18next.t('Parameter settings'),
        icon: <Settings />,
        sub: [
            {
                title: i18next.t('Site Information'),
                path: "basic",
                icon: <Language />,
            },
            {
                title: i18next.t('Registration and Login'),
                path: "access",
                icon: <Contacts />,
            },
            {
                title: i18next.t('Mail'),
                path: "mail",
                icon: <Mail />,
            },
            {
                title: i18next.t('Upload and download'),
                path: "upload",
                icon: <SettingsEthernet />,
            },
            {
                title: i18next.t('Themeing'),
                path: "theme",
                icon: <Palette />,
            },
            {
                title: i18next.t('Offline download'),
                path: "aria2",
                icon: <CloudDownload />,
            },
            {
                title: i18next.t('Image Processing'),
                path: "image",
                icon: <Image />,
            },
            {
                title: i18next.t('Verification Code'),
                path: "captcha",
                icon: <Category />,
            },
        ],
    },
    {
        title: i18next.t('Storage Strategy'),
        icon: <Storage />,
        path: "policy",
    },
    {
        title: i18next.t('User group'),
        icon: <Group />,
        path: "group",
    },
    {
        title: i18next.t('Users'),
        icon: <Person />,
        path: "user",
    },
    {
        title: i18next.t('document'),
        icon: <InsertDriveFile />,
        path: "file",
    },
    {
        title: i18next.t('share'),
        icon: <Share />,
        path: "share",
    },
    {
        title: i18next.t('Persistent Task'),
        icon: <Assignment />,
        sub: [
            {
                title: i18next.t('Offline download'),
                path: "download",
                icon: <CloudDownload />,
            },
            {
                title: i18next.t('Regular Tasks'),
                path: "task",
                icon: <ListAlt />,
            },
        ],
    },
];

export default function Dashboard({ content }) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(!pathHelper.isMobile());
    const [menuOpen, setMenuOpen] = useState(null);
    const history = useHistory();
    const location = useLocation();
    const { t } = useTranslation();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    const SetSubTitle = useCallback(
        (title) => dispatch(changeSubTitle(title)),
        [dispatch]
    );

    useEffect(() => {
        SetSubTitle(t('Dashboard'));
    }, []);

    useEffect(() => {
        return () => {
            SetSubTitle();
        };
    }, []);

    const { path } = useRouteMatch();

    return (
      <div className={classes.root}>
          <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                  [classes.appBarShift]: open,
              })}
          >
              <Toolbar>
                  <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      className={clsx(classes.menuButton, {
                          [classes.hide]: open,
                      })}
                  >
                      <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title} noWrap>
                    {t('Cloudreve Dashboard')}
                  </Typography>
                  <UserAvatar />
              </Toolbar>
          </AppBar>
          <Drawer
              variant="permanent"
              className={clsx(classes.drawer, {
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
              })}
              classes={{
                  paper: clsx({
                      [classes.drawerOpen]: open,
                      [classes.drawerClose]: !open,
                  }),
              }}
          >
              <div className={classes.toolbar}>
                  <IconButton onClick={handleDrawerClose}>
                      {theme.direction === "rtl" ? (
                          <ChevronRightIcon />
                      ) : (
                          <ChevronLeftIcon />
                      )}
                  </IconButton>
              </div>
              <Divider />
              <List className={classes.noPadding}>
                  {items.map((item) => {
                      if (item.path !== undefined) {
                          return (
                              <ListItem
                                  onClick={() =>
                                      history.push("/admin/" + item.path)
                                  }
                                  button
                                  className={clsx({
                                      [classes.active]: location.pathname.startsWith(
                                          "/admin/" + item.path
                                      ),
                                  })}
                                  key={item.title}
                              >
                                  <ListItemIcon
                                      className={clsx({
                                          [classes.activeIcon]: location.pathname.startsWith(
                                              "/admin/" + item.path
                                          ),
                                      })}
                                  >
                                      {item.icon}
                                  </ListItemIcon>
                                  <ListItemText
                                      className={clsx({
                                          [classes.activeText]: location.pathname.startsWith(
                                              "/admin/" + item.path
                                          ),
                                      })}
                                      primary={item.title}
                                  />
                              </ListItem>
                          );
                      }
                      return (
                          <ExpansionPanel
                              key={item.title}
                              square
                              expanded={menuOpen === item.title}
                              onChange={(event, isExpanded) => {
                                  setMenuOpen(isExpanded ? item.title : null);
                              }}
                          >
                              <ExpansionPanelSummary
                                  aria-controls="panel1d-content"
                                  id="panel1d-header"
                              >
                                  <ListItem button key={item.title}>
                                      <ListItemIcon>{item.icon}</ListItemIcon>
                                      <ListItemText primary={item.title} />
                                  </ListItem>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails>
                                  <List className={classes.subMenu}>
                                      {item.sub.map((sub) => (
                                          <ListItem
                                              onClick={() =>
                                                  history.push(
                                                      "/admin/" + sub.path
                                                  )
                                              }
                                              className={clsx({
                                                  [classes.sub]: open,
                                                  [classes.active]: location.pathname.startsWith(
                                                      "/admin/" + sub.path
                                                  ),
                                              })}
                                              button
                                              key={sub.title}
                                          >
                                              <ListItemIcon
                                                  className={clsx({
                                                      [classes.activeIcon]: location.pathname.startsWith(
                                                          "/admin/" + sub.path
                                                      ),
                                                  })}
                                              >
                                                  {sub.icon}
                                              </ListItemIcon>
                                              <ListItemText
                                                  primary={sub.title}
                                              />
                                          </ListItem>
                                      ))}
                                  </List>
                              </ExpansionPanelDetails>
                          </ExpansionPanel>
                      );
                  })}
              </List>
          </Drawer>
          <main className={classes.content}>
              <div className={classes.toolbar} />
              {content(path)}
          </main>
      </div>
    );
}
