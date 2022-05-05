import React, { useEffect, useState } from "react"

export default function Home () {
    const [isLoading, setIsLoading] = useState(false)
    const [rosters, setRosters] = useState([])

    useEffect(() => {
        getRosters();
        // eslint-disable-next-line 
      }, [])
    
    const getRosters = async () => {
      try{
        const call = await fetch("http://localhost:5000/player/rosters")
        const parsedRosters = await call.json()
        setRosters(parsedRosters)
        setIsLoading(true)
        console.log(rosters)
      } catch (err) {
        console.log(err)
      }
    }

  return (
    <div className="App">
    </div>
  );
}