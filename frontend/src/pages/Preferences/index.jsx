import React, { Component } from "react";
import Eos from "eosjs"; // https://github.com/EOSIO/eosjs
import moment from "moment";

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
import Switch from "@material-ui/core/Switch";
import InputAdornment from "@material-ui/core/InputAdornment";

import styles from "./styles";
import accounts from "../../accounts";
import RuleCard from "../../components/RuleCard";
import ActivityItem from "../../components/ActivityItem";

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prefTable: [], // to store the table rows from smart contract,
      spend_max: 100,
      trans_max: 10,
      tokenBalance: 0,
      eosToSend: 3,
      activities: [
        {
          iconSrc: "success.png",
          timestamp: new Date().valueOf() - 1000 * 60 * 20,
          amount: 2,
          text: "Transfer to brandon",
          status: "Approved"
        },
        {
          iconSrc: "dollarCircle.png",
          timestamp: new Date().valueOf() - 1000 * 60 * 60 * 12.4,
          amount: 100,
          text: "Transfer to danielle",
          status: "Rejected"
        },
        {
          iconSrc: "success.png",
          timestamp: new Date().valueOf() - 1000 * 60 * 60 * 12 * 2.1,
          amount: 6,
          text: "Transfer to daniel",
          status: "Approved"
        },
        {
          iconSrc: "success.png",
          timestamp: new Date().valueOf() - 1000 * 60 * 60 * 12 * 3,
          amount: 8,
          text: "Transfer to ashe",
          status: "Approved"
        },
        {
          iconSrc: "calendar.png",
          timestamp: new Date().valueOf() - 1000 * 60 * 55,
          amount: 30,
          text: "Transfer to anette",
          status: "Rejected"
        }
      ]
    };
    this.handleFormEvent = this.handleFormEvent.bind(this);
  }

  async handleFormEvent(event) {
    event.preventDefault();
    let account = accounts[0].name;
    let privateKey = accounts[0].privateKey;
    let spend_max = event.target.spend_max.value;
    let trans_max = event.target.trans_max.value;

    let actionName = "";
    let actionData = {};

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
      eosToSend,
      activities
    } = this.state;
    // const { classes } = this.props;

    // // generate each note as a card
    // const generateCard = (key, timestamp, user, spend_max, trans_max) => (
    //   <Card className={classes.card} key={key}>
    //     <CardContent>
    //       <Typography variant="headline" component="h2">
    //         {user}
    //       </Typography>
    //       <Typography variant="subheading" component="h2">
    //         Balance: {tokenBalance}
    //       </Typography>
    //       <Typography variant="subheading" component="h2" gutterBottom>
    //         {accounts[0].publicKey}
    //       </Typography>
    //       <Typography component="pre">Spending Max: ${spend_max}</Typography>
    //       <Typography component="pre">
    //         Tx Limit: {trans_max} per {"Day"}
    //       </Typography>
    //       <Typography style={{ fontSize: 12 }} color="textSecondary">
    //         Updated: {moment(new Date(timestamp * 1000)).format("LLL")}
    //       </Typography>
    //     </CardContent>
    //   </Card>
    // );
    // let noteCards = prefTable.map((row, i) =>
    //   generateCard(i, row.timestamp, row.user, row.spend_max, row.trans_max)
    // );

    return (
      <div style={styles.preferencesContainer}>
        <div style={styles.leftContainer}>
          <div style={styles.freezeWrapper}>
            <img style={styles.questionMark} src="questionMark.png" />
            <Typography
              style={styles.freezeText}
              variant="subheading"
              component="h2"
            >
              freeze account
            </Typography>
            <Switch />
          </div>
          <div style={styles.leftContent}>
            <img style={styles.questionMarkTitle} src="questionMark.png" />
            <div style={styles.contentTitle}>My rules</div>
            <div style={styles.ruleCardContainer}>
              <RuleCard
                text="Spending Limit"
                style={styles.ruleCard}
                ruleInput={`${spend_max} EOS / month`}
                icon="dollarCircle.png"
                // modifyButton
                checked={true}
              />
              <RuleCard
                text="Whitelisted Accounts"
                style={styles.ruleCard}
                ruleInput={`3 Accounts`}
                icon="checklist.png"
                // modifyButton
                checked={false}
              />
              <RuleCard empty addRuleClicked={this.props.addRuleClicked} />
            </div>
          </div>
        </div>
        <div style={styles.rightContent}>
          <div style={styles.balanceWrapper}>
            <Typography
              variant="subheading"
              style={styles.balanceText}
              component="h2"
            >
              my balance
            </Typography>
            <Typography
              variant="subheading"
              style={styles.balanceText}
              component="h2"
            >
              {tokenBalance}
            </Typography>
          </div>

          <div style={styles.activitiesWrapper}>
            <Typography
              variant="body1"
              style={styles.activityText}
              component="h2"
            >
              Activity
            </Typography>
            {activities.map(item => {
              return <ActivityItem item={item} />;
            })}
          </div>
        </div>
      </div>
    );

    // return (
    //   <div>
    //     {noteCards}
    //     <Paper className={classes.paper}>
    //       <form
    //         className={classes.formContainer}
    //         onSubmit={this.handleFormEvent}
    //       >
    //         <FormControl className={classes.formControl}>
    //           <InputLabel htmlFor="name-helper">
    //             Max Spend per Transaction
    //           </InputLabel>
    //           <Input
    //             name="spend_max"
    //             type="number"
    //             onChange={this.valueChange}
    //             value={spend_max}
    //             startAdornment={
    //               <InputAdornment position="start">EOS</InputAdornment>
    //             }
    //           />
    //         </FormControl>
    //         <FormControl className={classes.formControl}>
    //           <InputLabel htmlFor="name-helper">
    //             Max Transactions per Time Period
    //           </InputLabel>
    //           <Input
    //             name="trans_max"
    //             type="number"
    //             onChange={this.valueChange}
    //             value={trans_max}
    //           />
    //         </FormControl>
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           className={classes.formButton}
    //           type="submit"
    //         >
    //           Add / Update Preferences
    //         </Button>
    //       </form>
    //       <form className={classes.formContainer} onSubmit={this.sendEos}>
    //         <FormControl className={classes.formControl}>
    //           <InputLabel htmlFor="eosToSend">EOS to Send</InputLabel>
    //           <Input
    //             name="eosToSend"
    //             type="number"
    //             onChange={this.valueChange}
    //             value={eosToSend}
    //           />
    //         </FormControl>
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           className={classes.formButton}
    //           type="submit"
    //         >
    //           Send EOS
    //         </Button>
    //       </form>
    //     </Paper>
    //   </div>
    // );
  }
}

export default withStyles(styles)(Preferences);
