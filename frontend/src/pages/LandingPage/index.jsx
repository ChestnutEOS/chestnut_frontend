import * as React from "react";
// import MailchimpSubscribe from "react-mailchimp-subscribe";
import styled from "styled-components";
import handImage from "../../images/hand_image.png";
import clipboard from "../../images/icon_clipboard.png";
import clock from "../../images/icon_clock.png";
import coins from "../../images/icon_coins.png";
import telegram from "../../images/telegram.png";
import twitter from "../../images/twitter.png";
import logo from "../../images/logo.png";

// type IsMobile = { isMobile: boolean };
// type IsMobileAndSmall = { isMobile: boolean; isSmall: boolean };
// const windowHeight = window.innerHeight;
const mobileWidth = 600;
const smallWidth = 1125;

const LandingPageWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	min-height: ${props => props.height}px;
	max-height: ${props => props.height}px;
	height: 100%;
	flex-wrap: wrap;
	width: 100%;
`;

const FlexColumn = styled.div`
	width: ${props =>
		props.isMobile || props.isSmall
			? 100 - 6
			: (props.size / 12) * 100 - 6}%;
	padding: 3%;
	min-width: ${props => props.minWidth}px;
	background: ${props => props.background};
	display: flex;
	flex-direction: column;
	justify-content: ${props => props.justifyContent};
	align-items: ${props => props.alignItems};
	position: relative;
`;

const Buffer = styled.div`
	height: ${props => props.heightPercent}%;
`;

const Logo = styled.img`
	height: 50px;
	margin: ${props => (props.isMobile ? "auto" : "0px")};
	margin-bottom: 10px;
	margin-top: ${props => (props.isMobile ? "40px" : "0px")};
`;

const Content = styled.div`
	width: ${props =>
		props.isMobile ? "65%" : props.isSmall ? "60%" : "100%"};
`;

const Title = styled.h1`
	font-family: "NexaHeavy", sans-serif;
	text-align: ${props => (props.isMobile ? "center" : "left")};
	width: ${props => (props.isSmall && !props.isMobile ? "45%" : "100%")};
	min-width: 325px;
	color: #ffffff;
	font-size: ${props => (props.isMobile ? "45px" : "60px")};
	line-height: ${props => (props.isMobile ? "45px" : "60px")};
	margin-bottom: 0px;
`;

const Text = styled.p`
	font-family: "ProximaNova", sans-serif;
	text-align: left;
	color: rgb(255, 255, 255);
	line-height: 22px;
	padding: 5px;
	font-size: 18px;
	max-width: 450px;
	width: 95%;
`;

const EmailForm = styled.div`
	border-radius: 2px;
	display: inline-block;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 200;
	margin-top: 20px;
`;

const SubmitButton = styled.button`
	font-size: 18px;
	padding: 20px;
	background-color: #ed503b;
	color: white;
	border-color: #ed503b;
	font-family: "NexaHeavy", sans-serif;
	text-transform: uppercase;
	margin-top: 15px;
	z-index: 200;
	cursor: pointer;
`;

const HandImage = styled.img`
	position: absolute;
	bottom: 0;
	left: ${props =>
		props.isMobile
			? 37
			: props.isSmall
				? 35
				: props.screenHeight < 650
					? 65
					: 50}%;
	max-width: ${props => (props.isMobile ? 63 : props.isSmall ? 65 : 135)}%;
	max-height: 100%;
	z-index: 100;
`;

// Right Side

const Boxes = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Box = styled.div`
	width: 90%;
	max-width: 380px;
	min-width 250px;
	border-radius: 10px;
	background-color: white;
	display: flex;
	align-items: center;
	padding: 13px;
	margin: 15px;
	margin-bottom: 5px;
`;

const Icon = styled.img`
	width: 35px;
	margin: 15px;
`;
const RightBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin: 5px;
`;
const BoxTitle = styled.h3`
	font-family: "NexaHeavy", sans-serif;
	text-align: left;
	margin: 5px;
`;
const BoxText = styled.p`
	margin: 5px;
	text-align: left;
	font-size: 14px;
	font-family: "ProximaNova", sans-serif;
`;

const SocialWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 15px;
	width: 100%;
`;

const SocialLink = styled.img`
	height: 35px;
	width: 35px;
	margin: 15px;
`;

const Button = styled.button`
	color: orange;
`;

// const url =
// 	"https://chestnutaccount.us19.list-manage.com/subscribe/post?u=e3608280faa9e972a7adaa07b&id=ff35adf1c8";

// // const SimpleForm = () => <MailchimpSubscribe url={url} />;

// const CustomForm = (status, message, onValidated, isMobile) => {
// 	let email;
// 	const submit = () =>
// 		email &&
// 		email.value.indexOf("@") > -1 &&
// 		onValidated({
// 			EMAIL: email.value
// 		});

// 	return (
// 		<EmailForm>
// 			{status === "sending" && (
// 				<div
// 					style={{
// 						color: "white",
// 						fontFamily: "ProximaNova, sans-serif"
// 					}}
// 				>
// 					sending...
// 				</div>
// 			)}
// 			{status === "error" && (
// 				<div
// 					style={{
// 						color: "#aedfd4",
// 						fontFamily: "ProximaNova, sans-serif",
// 						fontSize: 20,
// 						textAlign: "left",
// 						width: "90%"
// 					}}
// 					dangerouslySetInnerHTML={{
// 						__html: message
// 							? message.substring(0, message.indexOf("<a"))
// 							: null
// 					}}
// 				/>
// 			)}
// 			{status === "success" && (
// 				<div
// 					style={{
// 						color: "#aedfd4",
// 						fontFamily: "ProximaNova, sans-serif",
// 						fontSize: 25,
// 						width: "90%"
// 					}}
// 					dangerouslySetInnerHTML={{ __html: message }}
// 				/>
// 			)}
// 			{!status &&
// 				status !== "success" && (
// 					<input
// 						style={{
// 							fontFamily: "ProximaNova, sans-serif",
// 							fontSize: "18px",
// 							// minWidth: 200,
// 							padding: 15,
// 							width: "90%",
// 							zIndex: 200
// 						}}
// 						ref={node => (email = node)}
// 						type="email"
// 						placeholder="Email address"
// 					/>
// 				)}
// 			{!status &&
// 				(status !== "success" && (
// 					<SubmitButton onClick={submit}>
// 						GET
// 						{!isMobile ? " EARLY" : ""} ACCESS
// 					</SubmitButton>
// 				))}
// 		</EmailForm>
// 	);
// };

const initialState = {
	screenHeight: window.innerHeight,
	screenWidth: window.innerWidth
};

class LandingPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	componentDidMount() {
		window.addEventListener("resize", this.handleWindowSizeChange);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleWindowSizeChange);
	}

	handleWindowSizeChange = () => {
		this.setState({
			screenHeight: window.innerHeight,
			screenWidth: window.innerWidth
		});
	};

	// renderSubscribe = (subscribe, message, status) => {
	// 	const { screenWidth } = this.state;
	// 	const isMobile = screenWidth <= mobileWidth;
	// 	return (
	// 		<CustomForm
	// 			onValidated={({ EMAIL }: { EMAIL: any }) =>
	// 				subscribe({ EMAIL })
	// 			}
	// 			status={status}
	// 			message={message}
	// 			isMobile={isMobile}
	// 		/>
	// 	);
	// };

	renderBox = (icon, title, text) => {
		return (
			<Box>
				<Icon src={icon} />
				<RightBox>
					<BoxTitle>{title}</BoxTitle>
					<BoxText>{text}</BoxText>
				</RightBox>
			</Box>
		);
	};

	render() {
		const { screenHeight, screenWidth } = this.state;
		const { goClicked } = this.props;
		const isMobile = screenWidth <= mobileWidth;
		const isSmall = screenWidth <= smallWidth;
		return (
			<LandingPageWrapper height={screenHeight}>
				<FlexColumn
					size={4}
					background="black"
					minWidth={300}
					alignItems="flex-start"
					isMobile={isMobile}
					isSmall={isSmall}
					justifyContent="space-between"
				>
					<Logo src={logo} alt="logo" isMobile={isMobile} />
					<Title isMobile={isMobile} isSmall={isSmall}>
						Make your account hard to crack
					</Title>
					<Content isMobile={isMobile} isSmall={isSmall}>
						<Text>
							Managing your crypto assets doesn’t have to be
							scary. Chestnut lets you set rules on your EOS
							account to stay protected.
						</Text>

						<SubmitButton onClick={goClicked}>
							Create an Account
						</SubmitButton>

						{/*<MailchimpSubscribe
							url={url}
							render={this.renderSubscribe}
						/>*/}
					</Content>
					<Buffer heightPercent={10} />
					<HandImage
						src={handImage}
						isMobile={isMobile}
						isSmall={isSmall}
						screenHeight={screenHeight}
					/>
				</FlexColumn>
				<FlexColumn
					size={8}
					background="#aedfd4"
					minWidth={250}
					alignItems={isMobile || isSmall ? "center" : "flex-end"}
					isMobile={isMobile}
					isSmall={isSmall}
					justifyContent="center"
				>
					<Boxes>
						{this.renderBox(
							clock,
							"Set Spending Limits",
							"Customize your spending limits over a period of time or per transaction."
						)}
						{this.renderBox(
							clipboard,
							"Whitelist Accounts",
							"Create a list of trusted accounts that you can transact with freely."
						)}
						{this.renderBox(
							coins,
							"Balance Notifications",
							"Manage your account and balances with mobile alerts and notifications."
						)}
					</Boxes>
					{isMobile ? (
						<div>
							{/*<MailchimpSubscribe
								url={url}
								render={this.renderSubscribe}
							/>*/}
							<SocialWrapper>
								<a
									href="https://twitter.com/chestnutEOS"
									target="_blank"
								>
									<SocialLink src={twitter} />
								</a>
								<a
									href="https://t.me/exploremagic"
									target="_blank"
								>
									<SocialLink src={telegram} />
								</a>
							</SocialWrapper>
						</div>
					) : (
						<Buffer heightPercent={20} />
					)}
				</FlexColumn>
			</LandingPageWrapper>
		);
	}
}

export default LandingPage;
