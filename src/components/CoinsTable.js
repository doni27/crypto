import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
	Container,
	createTheme,
	TableCell,
	LinearProgress,
	ThemeProvider,
	Typography,
	TextField,
	TableBody,
	TableRow,
	TableHead,
	TableContainer,
	Table,
	Paper,
} from "@material-ui/core";
import axios from "axios";
import { CoinList } from "../config/api";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

export function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");

	const { currency } = CryptoState();

	// const useStyles = makeStyles({
	// 	row: {
	// 		backgroundColor: "#16171a",
	// 		cursor: "pointer",
	// 		"&:hover": {
	// 			backgroundColor: "#131111",
	// 		},
	// 		fontFamily: "Montserrat",
	// 	},
	// 	pagination: {
	// 		"& .MuiPaginationItem-root": {
	// 			color: "gold",
	// 		},
	// 	},
	// });

	// const classes = useStyles();
	// const history = useHistory();

	const darkTheme = createTheme({
		palette: {
			primary: {
				main: "#fff",
			},
			type: "dark",
		},
	});

	const fetchCoins = async () => {
		setLoading(true);
		const { data } = await axios.get(CoinList(currency));
		console.log("coins", data);

		setCoins(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchCoins();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currency]);

	return (
		<ThemeProvider theme={darkTheme}>
			<Container style={{ textAlign: "center" }}>
				<Typography
					variant="h4"
					style={{
						margin: 18,
						fontFamily: "Montserrat",
					}}
				>
					Cryptocurrency Prices by
					Market Cap
				</Typography>
				<TextField
					label="Search For a Crypto Currency.."
					variant="outlined"
					style={{
						marginBottom: 20,
						width: "100%",
					}}
					onChange={(e) =>
						setSearch(
							e.target
								.value
						)
					}
				/>
				<TableContainer component={Paper}>
					{loading ? (
						<LinearProgress
							style={{
								backgroundColor:
									"gold",
							}}
						/>
					) : (
						<Table aria-label="simple table">
							<TableHead
								style={{
									backgroundColor:
										"#EEBC1D",
								}}
							></TableHead>
						</Table>
					)}
				</TableContainer>

				{/* Comes from @material-ui/lab */}
			</Container>
		</ThemeProvider>
	);
}
