import React, { useEffect, useState } from "react"
import DynastyRanker from "../components/DynastyRanker"

export default function Home () {
    const [isLoading, setIsLoading] = useState(true)
    const [rosters, setRosters] = useState([])

    useEffect(() => {
        getRosters();
        // return () => {setRosters([])};
        // eslint-disable-next-line 
      }, [])
    
    const getRosters = async () => {
      try{
        const call = await fetch("http://localhost:5000/player/rosters")
        const parsedRosters = await call.json()
        setRosters(parsedRosters)
        console.log(parsedRosters)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }

    return (
        <>
            <div className="d-flex">
                <div className="col-md-2">
                    <p>Hello</p>
                </div>
                <div className="col-md-10">
                    <DynastyRanker 
                        isLoading={isLoading}
                        rosters={rosters}
                    />
                </div>
            </div>
        </>
    );
}