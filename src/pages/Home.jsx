import React, { useEffect, useState } from "react"

export default function Home () {
    const [data, setData] = useState([])

    const getRosters = async () => {
      try{
        const rosters = await fetch("http://localhost:5000/player/rosters")
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