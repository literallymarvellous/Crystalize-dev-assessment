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
    if (!tokenInput) {
      setTokenList([]);
      return;
    }
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
    if (isMounted.current >= 2) {
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
      <div className="container">
        <label className="label" htmlFor="tokenInput">
          Search for Token
        </label>
        <input
          className="input"
          id="tokenInput"
          type="text"
          placeholder="ethereum, bitcoin..."
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
        />

        <ul className="tokens">
          {tokenList.length > 0
            ? tokenList.slice(0, 5).map((token) => (
                <li className="tokenlist" key={token.name}>
                  <a className="tokenlink" onClick={() => fetchPrice(token.id)}>
                    {" "}
                    <span className="listspan">
                      <img src={token.thumb} />{" "}
                    </span>
                    <span className="listspan name">{token.name}</span>
                    <span className="listspan">({token.symbol})</span>
                  </a>
                </li>
              ))
            : null}
        </ul>

        <div>
          {tokenInfo && (
            <div className="tokeninfo">
              <div className="tokenlink">
                <span className="listspan">
                  <img src={tokenInfo.image.thumb} />{" "}
                </span>
                <span className="listspan name">{tokenInfo.name}</span>
                <span className="listspan name">({tokenInfo.symbol})</span>
              </div>
              <div className="font">
                Current Price: ${tokenInfo.market_data.current_price.usd}
              </div>
              <div className="font">
                Market Cap: ${tokenInfo.market_data.market_cap.usd}
              </div>
              <div className="font">
                All-Time High: ${tokenInfo.market_data.ath.usd}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
