import React, { Component } from "react";
import Eos from "eosjs"; // https://github.com/EOSIO/eosjs
import moment from "moment";
// import ScatterJS from "scatter-js/dist/scatter.esm";

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
import InputAdornment from "@material-ui/core/InputAdornment";

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
      trans_max: 10,
      tokenBalance: 0,
      eosToSend: 3
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

    this.getTable();
  }

  // sendEos = amount => {
  //   const eos = Eos();
  //   eos.transfer("userB", "helloworld", "1.0000 EOS", "memo");
  // };

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
        if (!result || !result.rows || !result.rows[0]) return;
        this.setState({
          prefTable: result.rows,
          spend_max: result.rows[0].spend_max,
          trans_max: result.rows[0].trans_max ? result.rows[0].trans_max : 10
        });
      });
  };

  getBalance = async () => {
    let account = accounts[0].name;
    let privateKey = accounts[0].privateKey;
    const eos = Eos({ keyProvider: privateKey });
    const tokenBalance = await eos.getCurrencyBalance(
      "tokenacc",
      account,
      "EOS"
    );
    this.setState({ tokenBalance });
  };

  sendEos = async event => {
    event.preventDefault();
    let account = accounts[0].name;
    let privateKey = accounts[0].privateKey;
    const eos = Eos({ keyProvider: privateKey });
    const toSend = this.state.eosToSend * 1;
    const data =
      this.state.prefTable && this.state.prefTable[0]
        ? this.state.prefTable[0]
        : null;

    if (data && data.spend_max && toSend > data.spend_max * 1)
      return alert(
        "This exceeds your maximum spend threshold.  Transaction denied."
      ); // Not the long-term way of doing this
    await eos.transaction(
      {
        // ...headers,
        // context_free_actions: [],
        actions: [
          {
            account: "tokenacc",
            name: "transfer",
            authorization: [
              {
                actor: account,
                permission: "active"
              }
            ],
            data: {
              from: account,
              to: accounts[1].name,
              quantity: `${toSend.toFixed(4)} EOS`,
              memo: ""
            }
          }
        ]
      }
      // config -- example: {broadcast: false, sign: true}
    );
    this.getBalance();
  };

  componentDidMount() {
    this.getTable();
    this.getBalance();
  }

  valueChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      prefTable,
      spend_max,
      trans_max,
      tokenBalance,
      eosToSend
    } = this.state;
    const { classes } = this.props;

    // generate each note as a card
    const generateCard = (key, timestamp, user, spend_max, trans_max) => (
      <Card className={classes.card} key={key}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {user}
          </Typography>
          <Typography variant="subheading" component="h2">
            Balance: {tokenBalance}
          </Typography>
          <Typography variant="subheading" component="h2" gutterBottom>
            {accounts[0].publicKey}
          </Typography>
          <Typography component="pre">Spending Max: ${spend_max}</Typography>
          <Typography component="pre">
            Tx Limit: {trans_max} per {"Day"}
          </Typography>
          <Typography style={{ fontSize: 12 }} color="textSecondary">
            Updated: {moment(new Date(timestamp * 1000)).format("LLL")}
          </Typography>
        </CardContent>
      </Card>
    );
    let noteCards = prefTable.map((row, i) =>
      generateCard(i, row.timestamp, row.user, row.spend_max, row.trans_max)
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
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name-helper">
                Max Spend per Transaction
              </InputLabel>
              <Input
                name="spend_max"
                type="number"
                onChange={this.valueChange}
                value={spend_max}
                startAdornment={
                  <InputAdornment position="start">EOS</InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.formControl}>
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
          <form className={classes.formContainer} onSubmit={this.sendEos}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="eosToSend">EOS to Send</InputLabel>
              <Input
                name="eosToSend"
                type="number"
                onChange={this.valueChange}
                value={eosToSend}
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              className={classes.formButton}
              type="submit"
            >
              Send EOS
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Preferences);
