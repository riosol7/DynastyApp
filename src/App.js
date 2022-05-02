import './App.css';
import React, { useEffect, useState } from "react"

function App() {

  const [data, setData] = useState([])

  const getRosters = async () => {
    try{
      // const rosters = await fetch("http://localhost:5000/player/rosters")
      const rosters = await fetch("https://api.sleeper.app/v1/league/786065005090189312/users")
      const parsedRosters = await rosters.json()
      setData(parsedRosters)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getRosters();
    // eslint-disable-next-line 
  }, [])


  return (
    <div className="App">
    </div>
  );
}

export default App;
