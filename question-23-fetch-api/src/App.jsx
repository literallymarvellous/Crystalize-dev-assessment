import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [tokenInput, setTokenInput] = useState("");
  // const [query, setQuery] = useState("");
  const [tokenList, setTokenList] = useState([]);
  const [tokenInfo, setTokenInfo] = useState();
  // const [isError, setIsError] = useState("");
  const isMounted = useRef(0);

  const fetchToken = async () => {
    try {
      setTokenInfo(null);
      let res = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${tokenInput}`
      );
      let data = await res.json();
      console.log(data.coins);
      setTokenList(data.coins);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPrice = async (token) => {
    try {
      let res = await fetch(`https://api.coingecko.com/api/v3/coins/${token}`);
      let data = await res.json();
      console.log(data);
      setTokenInfo(data);
      setTokenList([]);
      setTokenInput("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (isMounted.current >= 2 && tokenInput) {
      fetchToken();
    } else {
      isMounted.current += 1;
    }
  }, [tokenInput]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setQuery(tokenInput);
  //   setTokenInput("");
  //   setPriceInfo("");
  // };

  return (
    <div className="App">
      <div>Search and get token prices</div>

      <form>
        <input
          type="text"
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
        />
      </form>

      <ul>
        {tokenList.length > 0
          ? tokenList.slice(0, 5).map((token) => (
              <li key={token.name}>
                <div onClick={() => fetchPrice(token.id)}>
                  {" "}
                  <img src={token.thumb} /> {token.name} ({token.symbol})
                </div>
              </li>
            ))
          : null}
      </ul>

      <div>
        {tokenInfo && (
          <div>
            <div>
              <img
                src={tokenInfo.image.thumb}
                alt={`${tokenInfo.name} image`}
              />{" "}
              {tokenInfo.name} ({tokenInfo.symbol})
            </div>
            <div>Current Price: ${tokenInfo.market_data.current_price.usd}</div>
            <div>Market Cap: ${tokenInfo.market_data.market_cap.usd}</div>
            <div>All-Time High: ${tokenInfo.market_data.ath.usd}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
