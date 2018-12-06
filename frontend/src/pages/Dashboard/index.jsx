import React, { Component } from "react";
import Eos from "eosjs"; // https://github.com/EOSIO/eosjs
import { JsonRpc } from "eosjs";
import moment from "moment";

import styled from "styled-components";

import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Button,
  Switch,
  InputAdornment,
  Tooltip,
  CircularProgress
} from "@material-ui/core";

import styles from "./styles";
import accounts from "../../accounts";
import RuleCard from "../../components/RuleCard";
import ActivityItem from "../../components/ActivityItem";
import AccountInfo from "./AccountInfo";

import ruleOptions from "../../options/ruleOptions";

const ruleMapping = { eoslimits: 0, txlimits: 1, whitelist: 2, blacklist: 3 }; // Only need this until turn ruleOptions into object of objects.
const tealLight = "#AEDFD4";
const tealDark = "#A3CEC3";
const orangeColor = "#FF5B3F";

const ContentTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const LoginButton = styled.div`
  fontcolor: tealDark;
  padding: 2px;
  cursor: pointer;
`;

class Dashboard extends Component {
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
    this.eosioHistory.get_account(accountName).then(accountInfo => {
      this.setState({ accountInfo });
    });
  };

  // Need to use /history instead of /chain
  // Check out network activity at https://jungle.bloks.io/account/chestnutdemo
  getActions = () => {
    const { account } = this.props;
    if (!account) return;
    let accountName = account.name;

    this.eosioHistory.history_get_actions(accountName, -1, -50).then(result => {
      // Only pulls last 50 transactions
      let actions = result.actions.sort((a, b) => {
        return b.account_action_seq - a.account_action_seq;
      });

      this.setState({ actions });
    });
  };

  valueChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      prefTable,
      tokenBalance,
      eosToSend,
      activities,
      actions,
      txlimits,
      eoslimits,
      whitelist,
      blacklist,
      accountInfo
    } = this.state;

    const { attachAccount } = this.props;

    let activitySanitizer = {};

    if (!accountInfo)
      return (
        <div style={styles.loginWrapper}>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            style={styles.orangeButton}
            onClick={attachAccount}
          >
            Connect Scatter
          </Button>
        </div>
      );

    return (
      <div style={styles.dashboardContainer}>
        <TopContainer>
          <div style={styles.balanceWrapper}>
            <Typography
              variant="subheading"
              style={styles.balanceText}
              component="h2"
            >
              Account Name
            </Typography>
            {!accountInfo ? (
              <LoginButton onClick={attachAccount}>
                <Typography
                  variant="subheading"
                  style={styles.loginScatterText}
                  component="h2"
                >
                  Login with Scatter
                </Typography>
              </LoginButton>
            ) : (
              <Typography
                variant="subheading"
                style={styles.balanceText}
                component="h2"
              >
                {accountInfo.account_name}
              </Typography>
            )}
          </div>
          <div style={styles.balanceWrapper}>
            <Typography
              variant="subheading"
              style={styles.balanceText}
              component="h2"
            >
              Account Type
            </Typography>
            <Typography
              variant="subheading"
              style={styles.balanceText}
              component="h2"
            >
              Seed
            </Typography>
          </div>
          <div style={styles.balanceWrapper}>
            <Typography
              variant="subheading"
              style={styles.balanceText}
              component="h2"
            >
              Balance
            </Typography>
            <Typography
              variant="subheading"
              style={styles.balanceText}
              component="h2"
            >
              {tokenBalance}
            </Typography>
          </div>
        </TopContainer>
        <div style={styles.leftContainer}>
          <div style={styles.leftContent}>
            <Tooltip
              title="Protect your account by setting your own rules. You are your own bank!"
              placement="top"
            >
              <img style={styles.questionMarkTitle} src="questionMark.png" />
            </Tooltip>
            <ContentTitleWrapper>
              <div style={styles.contentTitle}>Account Rules</div>
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
            </ContentTitleWrapper>
            <div style={styles.ruleCardContainer}>
              {/*} EOS Limit (over time) */}
              {eoslimits && (
                <RuleCard
                  marginRight
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
                  marginRight
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
                  marginRight
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
                  marginRight
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
        <BottomContainer>
          <div style={styles.activityContent}>
            <div style={styles.activitiesWrapper}>
              <Typography
                variant="title"
                component="h1"
                style={styles.activitiesTitle}
              >
                Recent Activity
              </Typography>
              {actions.length === 0 && <CircularProgress color="secondary" />}
              {actions.length > 0 &&
                actions.map((item, index) => {
                  if (
                    activitySanitizer[item.action_trace.receipt.act_digest] ||
                    item.action_trace.act.name === "buyrambytes" ||
                    item.action_trace.act.name === "sellram"
                  )
                    return null;
                  {
                    activitySanitizer[
                      item.action_trace.receipt.act_digest
                    ] = true;
                  }
                  return <ActivityItem key={index} item={item} />;
                })}
            </div>
          </div>

          <div style={styles.resourcesContainer}>
            <div style={styles.resourcesWrapper}>
              <Typography
                variant="title"
                component="h1"
                style={styles.resourcesTitle}
              >
                Network Resource Utilization
              </Typography>
              {!accountInfo && <CircularProgress color="secondary" />}
              {accountInfo && <AccountInfo accountInfo={accountInfo} />}
            </div>
          </div>
        </BottomContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
