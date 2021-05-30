import React from 'react';
import logo from './logo.svg';
import ws from 'ws';
import './App.css';
import { selectCount, setTrading } from './features/ticker/TickerReducer';
import { useDispatch, useSelector } from 'react-redux';
const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
function App() {
  const tradingData = useSelector(selectCount);
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = React.useState(true);
  const [chanId, setChanId] = React.useState(null);
  const connect = () => {
    wss.send(
      JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCUSD',
      })
    );
  };
  React.useEffect(() => {
    wss.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.chanId) {
        setChanId(data.chanId);
      }
      if (Array.isArray(data[1]) && data[1].length > 1) {
        dispatch(setTrading(data[1]));
      }
    };

    wss.onopen = () => {
      connect();
      // API keys setup here (See "Authenticated Channels")
    };
  }, []);
  const handleConnect = () => {
    if (isConnected) {
      wss.send(
        JSON.stringify({
          event: 'unsubscribe',
          chanId: chanId,
        })
      );
      // wss.close();
    } else {
      connect();
    }
    setIsConnected(!isConnected);
  };
  return (
    <div className='App'>
      <button onClick={handleConnect} style={{ marginBottom: 10 }}>
        {isConnected ? 'DISCONNECT' : 'CONNECT'}
      </button>
      <div className='box'>
        {tradingData.length !== 0 && (
          <>
            <div>
              <div>BTC/USD</div>
              <div>
                Volume{' '}
                {new Intl.NumberFormat().format(tradingData[7].toFixed(2))}
              </div>
            </div>
            <div>
              <div>
                Last price{' '}
                {new Intl.NumberFormat().format(tradingData[6].toFixed(2))}
              </div>
              <div>
                Price Change{' '}
                {new Intl.NumberFormat().format(
                  (tradingData[5] * 100).toFixed(2)
                )}
                %
              </div>
            </div>
            <div>
              {' '}
              <div>
                Low {new Intl.NumberFormat().format(tradingData[9].toFixed(2))}
              </div>
              <div>
                High {new Intl.NumberFormat().format(tradingData[8].toFixed(2))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
