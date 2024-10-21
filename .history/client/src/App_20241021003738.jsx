import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [data, setData] = useState(null);

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
