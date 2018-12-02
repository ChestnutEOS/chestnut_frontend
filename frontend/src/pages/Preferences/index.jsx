import React, { Component } from "react";
import Eos from "eosjs"; // https://github.com/EOSIO/eosjs
import { JsonRpc } from "eosjs";
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
import Tooltip from "@material-ui/core/Tooltip";

import styles from "./styles";
import accounts from "../../accounts";
import RuleCard from "../../components/RuleCard";
import ActivityItem from "../../components/ActivityItem";

import ruleOptions from "../../options/ruleOptions";

const ruleMapping = { eoslimits: 0, txlimits: 1, whitelist: 2, blacklist: 3 }; // Only need this until turn ruleOptions into object of objects.

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prefTable: [], // to store the table rows from smart contract,
      spend_max: 100,
      trans_max: 10,
      tokenBalance: 0,
      eosToSend: 3,
      actions: []
    };
    // this.handleFormEvent = this.handleFormEvent.bind(this);
    this.eosioHistory = new JsonRpc("https://junglehistory.cryptolions.io:443");
  }

  componentDidUpdate(props) {
    if (this.props != props) {
      this.getBalance();
      this.getAccountInfo();
      this.getActions();
      this.getTables();
    }
  }

  componentDidMount() {
    // this.getTable();
    this.getBalance();
    this.getAccountInfo();
    this.getActions();
    this.getTables();
  }

  getTable = async (account, table) => {
    const result = await this.props.eosio.rpc.get_table_rows({
      json: true,
      code: account.name, // contract who owns the table
      scope: account.name, // scope of the table
      table: table, // name of the table as specified by the contract abi
      limit: 100
    });
    this.setState({ [table]: result.rows });
  };

  getTables = () => {
    const { account } = this.props;
    if (!account) return;

    this.getTable(account, "txlimits");
    this.getTable(account, "eoslimits");
    this.getTable(account, "settings");
    this.getTable(account, "blacklist");
    this.getTable(account, "whitelist");
  };

  getBalance = () => {
    const { account } = this.props;
    if (!account) return;
    let accountName = account.name;
    this.eosioHistory
      .get_currency_balance("eosio.token", accountName, "EOS")
      .then(result => {
        console.log(result);
        this.setState({ tokenBalance: result[0] });
      });
  };

  getAccountInfo = () => {
    const { account } = this.props;
    if (!account) return;
    let accountName = account.name;
    this.eosioHistory.get_account(accountName).then(result => {
      console.log(result);
    });
  };

  // Need to use /history instead of /chain
  // Check out network activity at https://jungle.bloks.io/account/chestnutdemo
  getActions = () => {
    const { account } = this.props;
    if (!account) return;
    let accountName = account.name;

    // Only pull last 50 transactions
    this.eosioHistory.history_get_actions(accountName, -1, -50).then(result => {
      console.log(result);
      let actions = result.actions.sort((a, b) => {
        return b.account_action_seq - a.account_action_seq;
      });

      this.setState({ actions });
    });
    // eosio.eos.history_get_actions(accountName).then(result => {
    //   console.log(result);
    // });
  };

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
      activities,
      actions,
      txlimits,
      eoslimits,
      whitelist,
      blacklist
    } = this.state;

    let activitySanitizer = {};
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

    console.log(eoslimits);

    return (
      <div style={styles.preferencesContainer}>
        <div style={styles.leftContainer}>
          <div style={styles.freezeWrapper}>
            <Tooltip title="Temporarily freeze your account and prevent any transactions from happening!">
              <img style={styles.questionMark} src="questionMark.png" />
            </Tooltip>
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
            <Tooltip
              title="Protect your account by setting your own rules. You are your own bank!"
              placement="top"
            >
              <img style={styles.questionMarkTitle} src="questionMark.png" />
            </Tooltip>
            <div style={styles.contentTitle}>My rules</div>
            <div style={styles.ruleCardContainer}>
              {/*} EOS Limit (over time) */}
              {eoslimits && (
                <RuleCard
                  text={ruleOptions[0].text}
                  style={styles.ruleCard}
                  ruleInput={`${
                    eoslimits[0].total_EOS_allowed_to_spend
                  } EOS / month`}
                  icon={ruleOptions[0].icon}
                  description={ruleOptions[0].description}
                  checked={true}
                />
              )}
              {/*} Tx Limit (over time) */}
              {txlimits && (
                <RuleCard
                  text={ruleOptions[1].text}
                  style={styles.ruleCard}
                  ruleInput={`${txlimits[0].tx_number_limit
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} Tx / month`}
                  icon={ruleOptions[1].icon}
                  description={ruleOptions[1].description}
                  checked={true}
                />
              )}
              {/* Whitelist */}
              {whitelist && (
                <RuleCard
                  text={ruleOptions[2].text}
                  style={styles.ruleCard}
                  ruleInput={`${whitelist ? whitelist.length : 0} Accounts`}
                  icon={ruleOptions[2].icon}
                  description={ruleOptions[2].description}
                  checked={false}
                />
              )}
              {/* Blacklist */}
              {blacklist && (
                <RuleCard
                  text={ruleOptions[3].text}
                  style={styles.ruleCard}
                  ruleInput={`${blacklist ? blacklist.length : 0} Accounts`}
                  icon={ruleOptions[3].icon}
                  description={ruleOptions[3].description}
                  checked={false}
                />
              )}
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
              my EOS balance
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
            {actions.map((item, index) => {
              if (
                activitySanitizer[item.action_trace.receipt.act_digest] ||
                item.action_trace.act.name === "buyrambytes" ||
                item.action_trace.act.name === "sellram"
              )
                return null;
              {
                activitySanitizer[item.action_trace.receipt.act_digest] = true;
              }
              return <ActivityItem key={index} item={item} />;
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
