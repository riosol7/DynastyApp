import React, {useState} from 'react'
import { Icon } from '@iconify/react';

export default function Standings(props) {
  const loadRosters = props.loadRosters
  const rosters = props.rosters
  const league = props.league
  const roundToHundredth = (value) => {
    return Number(value.toFixed(2));
}
  const [select,setSelect] = useState("Present")

  const handleSelect = (e) => {
    setSelect(e.target.value);
  }

  let division_1 = rosters.totalRoster && rosters.totalRoster.filter(roster => roster.settings.division === 1)
  let division_2 = rosters.totalRoster && rosters.totalRoster.filter(roster => roster.settings.division === 2)
  //will need to sort by record W-L-T

  // const allTimeStandingsPF = (id) => {
  //   let weekOne = league.history.reduce((a,b) => a + b.matchups.weekOne.find(match => match.roster_id === id).points, 0)
  //   let weekTwo = league.history.reduce((a,b) => a + b.matchups.weekTwo.find(match => match.roster_id === id).points, 0)
  //   let weekThree = league.history.reduce((a,b) => a + b.matchups.weekThree.find(match => match.roster_id === id).points, 0)
  //   let weekFour = league.history.reduce((a,b) => a + b.matchups.weekFour.find(match => match.roster_id === id).points, 0)
  //   let weekFive = league.history.reduce((a,b) => a + b.matchups.weekFive.find(match => match.roster_id === id).points, 0)
  //   let weekSix = league.history.reduce((a,b) => a + b.matchups.weekSix.find(match => match.roster_id === id).points, 0)
  //   let weekSeven = league.history.reduce((a,b) => a + b.matchups.weekSeven.find(match => match.roster_id === id).points, 0)
  //   let weekEight = league.history.reduce((a,b) => a + b.matchups.weekEight.find(match => match.roster_id === id).points, 0)
  //   let weekNine = league.history.reduce((a,b) => a + b.matchups.weekNine.find(match => match.roster_id === id).points, 0)
  //   let weekTen = league.history.reduce((a,b) => a + b.matchups.weekTen.find(match => match.roster_id === id).points, 0)
  //   let weekEleven = league.history.reduce((a,b) => a + b.matchups.weekEleven.find(match => match.roster_id === id).points, 0)
  //   let weekTwelve = league.history.reduce((a,b) => a + b.matchups.weekTwelve.find(match => match.roster_id === id).points, 0)
  //   let weekThirteen = league.history.reduce((a,b) => a + b.matchups.weekThirteen.find(match => match.roster_id === id).points, 0)
  //   let weekFourteen = league.history[1].matchups.weekFourteen.find(match => match.roster_id === id).points
  //   return weekOne + weekTwo + weekThree + weekFour + weekFive + weekSix + weekSeven + weekEight + weekNine + weekTen + weekEleven + weekTwelve + weekThirteen + weekFourteen
  // }

  const standings = league.owners.map(owner => {
    let id = owner.roster_id

    let year2020 = league.history[0].rosters.find(roster => roster.roster_id === id).settings
    let year2021 = league.history[1].rosters.find(roster => roster.roster_id === id).settings

    let fptsTotal2020 = year2020.fpts + "." + year2020.fpts_decimal
    let fptsTotal2021 = year2021.fpts + "." + year2021.fpts_decimal
    
    let pptsTotal2020 = year2020.ppts + "." + year2020.ppts_decimal
    let pptsTotal2021 = year2021.ppts + "." + year2021.ppts_decimal

    let fpts_againstTotal2020 = year2020.fpts_against + "." + year2020.fpts_against_decimal
    let fpts_againstTotal2021 = year2021.fpts_against + "." + year2021.fpts_against_decimal

    return {
      ...owner,
      all_time:{
        percentage:roundToHundredth(((year2020.wins + year2021.wins)/(year2020.wins + year2021.wins + year2020.losses + year2021.losses))*100),
        record:(year2020.wins + year2021.wins) + "-" + (year2020.losses + year2021.losses),
        fpts:roundToHundredth(Number(fptsTotal2020) + Number(fptsTotal2021)),
        ppts:roundToHundredth(Number(pptsTotal2020) + Number(pptsTotal2021)),
        fpts_against:roundToHundredth(Number(fpts_againstTotal2020) + Number(fpts_againstTotal2021))
      },
      year_2020:{
        percentage:roundToHundredth((year2020.wins/(year2020.wins + year2020.losses))*100),
        record:(year2020.wins) + "-" + (year2020.losses),
        fpts:roundToHundredth(Number(fptsTotal2020)),
        ppts:roundToHundredth(Number(pptsTotal2020)),
        fpts_against:roundToHundredth(Number(fpts_againstTotal2020))
      },
      year_2021:{
        percentage:roundToHundredth((year2021.wins/(year2021.wins + year2021.losses))*100),
        record:(year2021.wins) + "-" + (year2021.losses),
        fpts:roundToHundredth(Number(fptsTotal2021)),
        ppts:roundToHundredth(Number(pptsTotal2021)),
        fpts_against:roundToHundredth(Number(fpts_againstTotal2021))
      }
    }
  }
  )

  return (
    <>
    { loadRosters ? <p>Loading </p> :
      <div className="pt-1">
        <div className="d-flex align-items-center justify-content-between py-2">
          <div className="d-flex align-items-center">
            <Icon icon="icon-park-outline:ranking" style={{color:"#a9dfd8",fontSize:"1rem"}}/>
            <p className="m-0 mx-1 bold" style={{}}>Standings</p>
          </div>
          <div>
            <select className="p-1" onChange={handleSelect} value={select} style={{fontSize:".8em", borderRadius:"25px", border:"2px solid #3bdbba", background:"black", color:"white"}}>
              <option value={league.season}>{league.season}</option>
              {league.history.map((l, i) => 
                <option key={i} value={l.year}>{l.year}</option>
              )}
              <option value="All Time">All Time</option>
            </select>
          </div>
        </div>
      { select === league.season ?
        <div className="">
          {/* <div className="container" id="scrollBarActivity" style={{height:"31.593rem", width:"100%", overflow:"auto"}}> */}
          <div className="mb-4 mt-2" style={{fontSize:"14px"}}>
            <div className="d-flex align-items-center">
              <Icon icon="uim:layer-group" style={{fontSize:"1.35rem"}}/>
              <p className="m-0 mx-2" style={{fontSize:"1rem"}}>{league.metadata ? league.metadata.division_1 : ""}</p>  
            </div>
            <div className="d-flex">
              <div className="col-sm-7"> </div>
              <div className="col-sm-2">
                <p className="m-0" style={{fontSize:".7rem", color:"#7d91a6"}}>Record</p>
              </div>
              <div className="col-sm-1">
                <p className="m-0" style={{fontSize:".7rem", color:"#7d91a6"}}>PF</p>
              </div>
              <div className="col-sm-1">
                <p className="m-0" style={{fontSize:".7rem", color:"#7d91a6"}}>MAX PF</p>
              </div>
              <div className="col-sm-1 d-flex justify-content-center">
                <p className="m-0" style={{fontSize:".7rem", color:"#7d91a6"}}>PA</p>
              </div>
            </div>
          { division_1.map((division, i) => 
            <div key={i} className="d-flex my-1 align-items-center">
              <div className="col-sm-7 text-truncate">
                <div className="d-flex align-items-center">
                  <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{i + 1}</p>
                  <div className="">
                    <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                      division.owner_id.avatar}`}/>
                  </div>
                  <div>
                  { division.owner_id.metadata.team_name ?
                    <p className="m-0 mx-1">{division.owner_id.metadata.team_name} 
                      <span className="m-0 mx-1" style={{fontSize:"10px", color:"#cbcbcb"}}>{division.owner_id.display_name}</span>
                    </p>
                  :
                    <p className="m-0 mx-1">{division.owner_id.display_name}</p>
                  }
                    <div className="pb-2 mx-1">
                      <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>WAIVER {division.settings.waiver_position}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-2 text-truncate">
                <p className="m-0">{division.settings.wins}-{division.settings.losses}-{division.settings.ties}
              { division.metadata.streak.includes("W") === true ?
                <span className="mx-1" style={{fontSize:".6rem"}}>
                  <Icon icon="bi:caret-up-fill" style={{color:"#368727", fontSize:".7rem"}}/>{division.metadata.streak}
                </span>
              :
                <span className="mx-1" style={{fontSize:".6rem"}}>
                  <Icon icon="bi:caret-down-fill" style={{color:"#cc1d00", fontSize:".7rem"}}/>{division.metadata.streak}
                </span>
              }
                </p>
              </div>
              <div className="col-sm-1">
                <p className="m-0" style={{fontSize:"12px", color:"white"}}>{division.settings.fpts}</p>
              </div>
              <div className="col-sm-1">
                <p className="m-0" style={{fontSize:"12px", color:"white"}}>{division.settings.fpts}</p>
              </div>
              <div className="col-sm-1 d-flex justify-content-center">
                <p className="m-0" style={{fontSize:"12px", color:"white"}}>{division.settings.fpts}</p>
              </div>
            </div>
          )}
          </div>
          <div className="" style={{fontSize:"14px"}}>
            <div className="d-flex align-items-center">
              <Icon icon="uim:layer-group" style={{fontSize:"1.35rem"}}/>
              <p className="m-0 mx-2" style={{fontSize:"1rem"}}>{league.metadata ? league.metadata.division_2 : ""}</p>  
            </div>
            <div className="d-flex">
              <div className="col-sm-7"> </div>
              <div className="col-sm-2">
                <p className="m-0" style={{fontSize:".7rem", color:"#7d91a6"}}>Record</p>
              </div>
              <div className="col-sm-1">
                <p className="m-0" style={{fontSize:".7rem", color:"#7d91a6"}}>PF</p>
              </div>
              <div className="col-sm-1">
                <p className="m-0" style={{fontSize:".7rem", color:"#7d91a6"}}>MAX PF</p>
              </div>
              <div className="col-sm-1 d-flex justify-content-center">
                <p className="m-0" style={{fontSize:".7rem", color:"#7d91a6"}}>PA</p>
              </div>
            </div>
          { division_2.map((division, i) => 
            <div key={i} className="d-flex my-1 align-items-center">
              <div className="col-sm-7 text-truncate">
                <div className="d-flex align-items-center">
                  <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{i + 1}</p>
                  <div className="">
                    <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                      division.owner_id.avatar}`}/>
                  </div>
                  <div>
                  { division.owner_id.metadata.team_name ?
                    <p className="m-0 mx-1">{division.owner_id.metadata.team_name} 
                      <span className="m-0 mx-1" style={{fontSize:"10px", color:"#cbcbcb"}}>{division.owner_id.display_name}</span>
                    </p>
                  :
                    <p className="m-0 mx-1">{division.owner_id.display_name}</p>
                  }
                      <div className="pb-2 mx-1">
                  <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>WAIVER {division.settings.waiver_position}</p>
                </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-2 text-truncate">
                <p className="m-0">{division.settings.wins}-{division.settings.losses}-{division.settings.ties}
                { division.metadata.streak.includes("W") === true ?
                  <span className="mx-1" style={{fontSize:".6rem"}}>
                    <Icon icon="bi:caret-up-fill" style={{color:"#368727", fontSize:".7rem"}}/>{division.metadata.streak}
                  </span>
                :
                  <span className="mx-1" style={{fontSize:".6rem"}}>
                    <Icon icon="bi:caret-down-fill" style={{color:"#cc1d00", fontSize:".7rem"}}/>{division.metadata.streak}
                  </span>
                }
                </p>
              </div>
              <div className="col-sm-1">
                  <p className="m-0" style={{fontSize:"12px", color:"white"}}>{division.settings.fpts}</p>
              </div>
              <div className="col-sm-1">
                  <p className="m-0" style={{fontSize:"12px", color:"white"}}>{division.settings.fpts}</p>
              </div>
              <div className="col-sm-1 d-flex justify-content-center">
                  <p className="m-0" style={{fontSize:"12px", color:"white"}}>{division.settings.fpts}</p>
              </div>
            </div>
          )}
          </div>
        </div>
      :
        <div>
        { standings.sort().map((owner, i) => 
          <div key={i}>
            <p className="m-0">{owner.all_time.record}</p>
          </div>
        )
        }
        </div>
      }
      </div>
    }
    </>
  )
}
