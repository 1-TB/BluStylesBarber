import logo from './logo.svg';
import React, { useEffect } from "react";
import './App.css';

function App() {
  const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);
  useEffect(() => {
    fetch("/ap")
      .then(res => res.json())
      .then(data => setData(data.message))
      .catch(error => console.error("Unable to fetch data,", error))
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
