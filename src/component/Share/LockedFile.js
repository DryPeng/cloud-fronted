import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleSnackbar } from "../../actions";

import {
    withStyles,
    Button,
    Card,
    Divider,
    CardHeader,
    CardContent,
    CardActions,
    TextField,
    Avatar,
} from "@material-ui/core";
import { withRouter } from "react-router";

const styles = (theme) => ({
    card: {
        maxWidth: 400,
        margin: "0 auto",
    },
    actions: {
        display: "flex",
    },
    layout: {
        width: "auto",
        marginTop: "110px",
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(1100 + theme.spacing(3) * 2)]: {
            width: 1100,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    continue: {
        marginLeft: "auto",
        marginRight: "10px",
        marginRottom: "10px",
    },
});
const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSnackbar: (vertical, horizontal, msg, color) => {
            dispatch(toggleSnackbar(vertical, horizontal, msg, color));
        },
    };
};

class LockedFileCompoment extends Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        this.state = {
            pwd: query.get("password"),
        };
    }

    handleChange = (name) => (event) => {
        this.setState({ [name]: event.target.value });
    };

    submit = (e) => {
        e.preventDefault();
        if (this.state.pwd === "") {
            return;
        }
        this.props.setPassowrd(this.state.pwd);
    };

    render() {
        const { classes } = this.props;

        return (
          <div className={classes.layout}>
              <Card className={classes.card}>
                  <CardHeader
                      avatar={
                          <Avatar
                              aria-label="Recipe"
                              src={
                                  "/api/v3/user/avatar/" +
                                  this.props.share.creator.key +
                                  "/l"
                              }
                          />
                      }
                      title={this.props.share.creator.nick + this.props.t('\'S encrypted sharing')}
                      subheader={this.props.share.create_date}
                  />
                  <Divider />
                  <CardContent>
                      <form onSubmit={this.submit}>
                          <TextField
                              id="pwd"
                              label={this.props.t('Enter the sharing password"')}
                              value={this.state.pwd}
                              onChange={this.handleChange("pwd")}
                              margin="normal"
                              type="password"
                              autoFocus
                              fullWidth
                              color="secondary"
                          />
                      </form>
                  </CardContent>
                  <CardActions
                      className={classes.actions}
                      disableActionSpacing
                  >
                      <Button
                          onClick={this.submit}
                          color="secondary"
                          className={classes.continue}
                          variant="contained"
                          disabled={
                              this.state.pwd === "" || this.props.loading
                          }
                      >
                        {this.props.t('continue')}
                      </Button>
                  </CardActions>
              </Card>
          </div>
        );
    }
}

const LockedFile = connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(withStyles(styles)(withRouter(LockedFileCompoment))));

export default LockedFile;
