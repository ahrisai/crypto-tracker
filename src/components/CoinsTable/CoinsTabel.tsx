import { useEffect, useState, useMemo } from "react";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { fetchCoinList } from "../../redux/cryptoSlice";
import { CurrencyType } from "../../types/currencyType";
import {
  Container,
  Typography,
  TextField,
  createTheme,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../helpers/numberWithCommas";
const CoinsTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { coinList, currentCurrency, currencySymbol, coinListStatus } =
    useSelector((state: RootState) => state.cryptoReducer);

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(fetchCoinList(currentCurrency as CurrencyType));
  }, [currentCurrency]);

  const handleSearch = (e: string) => {
    setSearch(e);
  };
  const searchedCoins = useMemo(() => {
    if (search.trim().length === 0) return coinList;

    return coinList.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, coinList]);
  function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): T {
    let timeoutId: number;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    } as T;
  }

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ margin: "18px" }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          sx={{ marginBottom: "20px", width: "100%" }}
          onChange={(e) => handleSearch(e.target.value)}
          value={search}
        />
        <TableContainer>
          {coinListStatus === "pending" ? (
            <LinearProgress sx={{ backgroundColor: "gold" }} />
          ) : (
            <Table sx={{ fontFamily: "montseratt" }}>
              <TableHead sx={{ backgroundColor: "#eebc1d" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      sx={{
                        color: "black",
                        fontWeight: "700",
                      }}
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {searchedCoins
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((coin) => {
                    const profit = coin.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        sx={{
                          transition: "background-color 0.3s ease",
                          ":hover": {
                            backgroundColor: "#333",
                            cursor: "pointer",
                          },
                        }}
                        key={coin.name}
                        onClick={() => navigate(`/coins/${coin.id}`)}
                      >
                        <TableCell
                          component={"th"}
                          scope="row"
                          sx={{ display: "flex", gap: "15px" }}
                        >
                          <img
                            src={coin.image}
                            alt=""
                            style={{ height: "50px", margin: "10 0" }}
                          />
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Typography
                              sx={{ textTransform: "uppercase", fontSize: 22 }}
                            >
                              {coin.symbol}
                            </Typography>
                            <Typography sx={{ color: "darkgrey" }}>
                              {coin.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: 16 }}>
                          {currencySymbol}
                          {numberWithCommas(+coin.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color: profit ? "green" : "red",
                            fontWeight: 700,
                          }}
                        >
                          {profit && "+"}
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: 16 }}>
                          {currencySymbol}{" "}
                          {numberWithCommas(
                            +coin.market_cap.toString().slice(0, -6)
                          )}M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          sx={{
            display: "flex",
            padding: "20px",
            justifyContent: "center",
            ".Mui-selected": { color: "gold" },
          }}
        renderItem={(item)=><PaginationItem {...item} disabled={page===item.page}/>} 

          shape="rounded"
          count={+(searchedCoins?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
