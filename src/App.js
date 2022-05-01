import './App.css';
import React, { useEffect, useState } from "react"

function App() {

  const [data, setData] = useState([])

  const getLeague = async () => {
    try{
      const league =await fetch("https://api.sleeper.app/v1/league/786065005090189312/rosters")
      const parsedLeague = await league.json()
      setData(parsedLeague)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }


  // const getPlayers = async () => {
  //   try {
  //     const players = await fetch("localhost")
  //   }
  // }


  useEffect(() => {
    getLeague();
    // eslint-disable-next-line 
  }, [])



  return (
    <div className="App">
    </div>
  );
}

export default App;
