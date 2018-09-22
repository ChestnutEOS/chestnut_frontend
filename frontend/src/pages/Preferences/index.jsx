import React, { Component } from "react";
import Eos from "eosjs"; // https://github.com/EOSIO/eosjs
import moment from "moment";

// material-ui dependencies
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import styles from "./styles";

// NEVER store private keys in any source code in your real life development
// This is for demo purposes only!
const accounts = [
  {
    name: "daniel",
    privateKey: "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5",
    publicKey: "EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b"
  },
  {
    name: "danielle",
    privateKey: "5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg",
    publicKey: "EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p"
  },
  {
    name: "trish",
    privateKey: "5K2jun7wohStgiCDSDYjk3eteRH1KaxUQsZTEmTGPH4GS9vVFb7",
    publicKey: "EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58"
  },
  {
    name: "annette",
    privateKey: "5KNm1BgaopP9n5NqJDo9rbr49zJFWJTMJheLoLM5b7gjdhqAwCx",
    publicKey: "EOS8LoJJUU3dhiFyJ5HmsMiAuNLGc6HMkxF4Etx6pxLRG7FU89x6X"
  },
  {
    name: "ashe",
    privateKey: "5KE2UNPCZX5QepKcLpLXVCLdAw7dBfJFJnuCHhXUf61hPRMtUZg",
    publicKey: "EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb"
  }
];

// Preferences component
class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prefTable: [], // to store the table rows from smart contract,
      spend_max: 100,
      trans_max: 10
    };
    this.handleFormEvent = this.handleFormEvent.bind(this);
  }

  // generic function to handle form events (e.g. "submit" / "reset")
  // push transactions to the blockchain by using eosjs
  async handleFormEvent(event) {
    // stop default behaviour
    event.preventDefault();

    // collect form data
    // let account = event.target.account.value;
    let account = accounts[0].name;
    // let privateKey = event.target.privateKey.value;
    let privateKey = accounts[0].privateKey;
    let spend_max = event.target.spend_max.value;
    let trans_max = event.target.trans_max.value;

    // prepare variables for the switch below to send transactions
    let actionName = "";
    let actionData = {};

    // define actionName and action according to event type
    switch (event.type) {
      case "submit":
        actionName = "update";
        actionData = {
          _user: account,
          _spend_max: spend_max,
          _trans_max: trans_max
        };
        break;
      default:
        return;
    }

    // eosjs function call: connect to the blockchain
    const eos = Eos({ keyProvider: privateKey });
    const result = await eos.transaction({
      actions: [
        {
          account: "seclogacc",
          name: actionName,
          authorization: [
            {
              actor: account,
              permission: "active"
            }
          ],
          data: actionData
        }
      ]
    });

    console.log(result);
    this.getTable();
  }

  // gets table data from the blockchain
  // and saves it into the component state: "prefTable"
  getTable = () => {
    const eos = Eos();
    eos
      .getTableRows({
        json: true,
        code: "seclogacc", // contract who owns the table
        scope: "seclogacc", // scope of the table
        table: "prefstruct", // name of the table as specified by the contract abi
        limit: 100
      })
      .then(result => {
        console.log(result);
        this.setState({
          prefTable: result.rows,
          spend_max: result.rows[0].spend_max,
          trans_max: result.rows[0].trans_max ? result.rows[0].trans_max : 10
        });
      });
  };

  componentDidMount() {
    this.getTable();
  }

  valueChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { prefTable, spend_max, trans_max } = this.state;
    const { classes } = this.props;

    // generate each note as a card
    const generateCard = (key, timestamp, user, spend_max) => (
      <Card className={classes.card} key={key}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {user}
          </Typography>
          <Typography variant="subheading" component="h2" gutterBottom>
            {accounts[0].publicKey}
          </Typography>
          <Typography component="pre">Spending Max: ${spend_max}</Typography>
          <Typography style={{ fontSize: 12 }} color="textSecondary">
            Last Updated: {moment(new Date(timestamp * 1000)).format("LLL")}
          </Typography>
        </CardContent>
      </Card>
    );
    let noteCards = prefTable.map((row, i) =>
      generateCard(i, row.timestamp, row.user, row.spend_max)
    );

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Security Logic
            </Typography>
          </Toolbar>
        </AppBar>
        {noteCards}
        <Paper className={classes.paper}>
          <form
            className={classes.formContainer}
            onSubmit={this.handleFormEvent}
          >
            <FormControl>
              <InputLabel htmlFor="name-helper">
                Max Spend per Transaction (EOS)
              </InputLabel>
              <Input
                name="spend_max"
                type="number"
                onChange={this.valueChange}
                value={spend_max}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="name-helper">
                Max Transactions per Time Period
              </InputLabel>
              <Input
                name="trans_max"
                type="number"
                onChange={this.valueChange}
                value={trans_max}
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              className={classes.formButton}
              type="submit"
            >
              Add / Update Preferences
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Preferences);
