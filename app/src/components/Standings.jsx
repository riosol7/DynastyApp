import React, {useState} from 'react'
import { Icon } from '@iconify/react';

export default function Standings(props) {
  const loadRosters = props.loadRosters
  const rosters = props.rosters
  const league = props.league
  const roundToHundredth = (value) => {
    return Number(value.toFixed(2));
}
  const [select,setSelect] = useState(league.season)

  const handleSelect = (e) => {
    setSelect(e.target.value);
  }

  let division_1 = rosters.totalRoster && rosters.totalRoster.filter(roster => roster.settings.division === 1)
  let division_2 = rosters.totalRoster && rosters.totalRoster.filter(roster => roster.settings.division === 2)
  //will need to sort by record W-L-T

  const standings = league.owners.map(owner => {
    let id = owner.roster_id

    let year2020 = league.history[1].rosters.find(roster => roster.roster_id === id).settings
    let year2021 = league.history[0].rosters.find(roster => roster.roster_id === id).settings

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
        fpts_against:roundToHundredth(Number(fpts_againstTotal2020)),
        division:year2020.division
      },
      year_2021:{
        percentage:roundToHundredth((year2021.wins/(year2021.wins + year2021.losses))*100),
        record:(year2021.wins) + "-" + (year2021.losses),
        fpts:roundToHundredth(Number(fptsTotal2021)),
        ppts:roundToHundredth(Number(pptsTotal2021)),
        fpts_against:roundToHundredth(Number(fpts_againstTotal2021)),
        division:year2021.division
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
          <div className="d-flex align-items-center">
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
              <p className="m-0 mx-2" style={{fontSize:"15px"}}>{league.metadata ? league.metadata.division_1 : ""}</p>  
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
              <div className="col-sm-1">
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
              <div className="col-sm-1">
                <p className="m-0" style={{fontSize:"12px", color:"white"}}>{division.settings.fpts}</p>
              </div>
            </div>
          )}
          </div>
          <div className="" style={{fontSize:"14px"}}>
            <div className="d-flex align-items-center">
              <Icon icon="uim:layer-group" style={{fontSize:"1.35rem"}}/>
              <p className="m-0 mx-2" style={{fontSize:"15px"}}>{league.metadata ? league.metadata.division_2 : ""}</p>  
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
              <div className="col-sm-1">
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
              <div className="col-sm-1">
                  <p className="m-0" style={{fontSize:"12px", color:"white"}}>{division.settings.fpts}</p>
              </div>
            </div>
          )}
          </div>
        </div>
      : select === "2021"?
        <>
          <div className="mb-4 mt-2">
            <div className="d-flex align-items-center">
              <Icon icon="uim:layer-group" style={{fontSize:"1.35rem"}}/>
              <p className="m-0 mx-2" style={{fontSize:"15px"}}>{league.metadata ? league.metadata.division_1 : ""}</p>  
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
              <div className="col-sm-1">
                <p className="m-0" style={{fontSize:".7rem", color:"#7d91a6"}}>PA</p>
              </div>
            </div>
          { standings.filter(owner => owner.year_2021.division === 1).sort((a,b) => parseFloat(b.year_2021.percentage) - parseFloat(a.year_2021.percentage)).map((owner, i) => 
            <div key={i} className="d-flex align-items-center my-1" style={{fontSize:"14px"}}>
              <div className="col-sm-7 text-truncate">
                <div className="d-flex align-items-center">
                  <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{i + 1}</p>
                  <div className="">
                    <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${owner.avatar}`}/>
                  </div>
                  <div>
                  { owner.metadata ?
                    <p className="m-0 mx-1">{owner.metadata.team_name} 
                      <span className="m-0 mx-1" style={{fontSize:"10px", color:"#cbcbcb"}}>{owner.display_name}</span>
                    </p>
                  :
                    <p className="m-0 mx-1">{owner.display_name}</p>
                  }
                    <div className="pb-2 mx-1">
                      <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>WIN {owner.year_2021.percentage}%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-2 text-truncate">
                <p className="m-0">{owner.year_2021.record}</p>
              </div>
              <div className="col-sm-1">
                  <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.year_2021.fpts}</p>
              </div>
              <div className="col-sm-1">
                  <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.year_2021.ppts}</p>
              </div>
              <div className="col-sm-1">
                  <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.year_2021.fpts_against}</p>
              </div>
            </div>
          )}
          </div>
          <div>
            <div className="d-flex align-items-center mt-2">
              <Icon icon="uim:layer-group" style={{fontSize:"1.35rem"}}/>
              <p className="m-0 mx-2" style={{fontSize:"15px"}}>{league.metadata ? league.metadata.division_2 : ""}</p>  
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
              <div className="col-sm-1">
                <p className="m-0" style={{fontSize:".7rem", color:"#7d91a6"}}>PA</p>
              </div>
            </div>
          { standings.filter(owner => owner.year_2021.division === 2).sort((a,b) => parseFloat(b.year_2021.percentage) - parseFloat(a.year_2021.percentage)).map((owner, i) => 
            <div key={i} className="d-flex align-items-center my-1" style={{fontSize:"14px"}}>
              <div className="col-sm-7 text-truncate">
                <div className="d-flex align-items-center">
                  <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{i + 1}</p>
                  <div className="">
                    <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${owner.avatar}`}/>
                  </div>
                  <div>
                  { owner.metadata ?
                    <p className="m-0 mx-1">{owner.metadata.team_name} 
                      <span className="m-0 mx-1" style={{fontSize:"10px", color:"#cbcbcb"}}>{owner.display_name}</span>
                    </p>
                  :
                    <p className="m-0 mx-1">{owner.display_name}</p>
                  }
                    <div className="pb-2 mx-1">
                      <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>WIN {owner.year_2021.percentage}%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-2 text-truncate">
                <p className="m-0">{owner.year_2021.record}</p>
              </div>
              <div className="col-sm-1">
                  <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.year_2021.fpts}</p>
              </div>
              <div className="col-sm-1">
                  <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.year_2021.ppts}</p>
              </div>
              <div className="col-sm-1">
                  <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.year_2021.fpts_against}</p>
              </div>
            </div>
          )}
          </div>
          <div>
            <div className="d-flex align-items-center mt-4">
              <Icon icon="uim:layer-group" style={{fontSize:"1.35rem"}}/>
              <p className="m-0 mx-2" style={{fontSize:"15px"}}>Overall</p>  
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
              <div className="col-sm-1">
                <p className="m-0" style={{fontSize:".7rem", color:"#7d91a6"}}>PA</p>
              </div>
            </div>
          { standings.sort((a,b) => parseFloat(b.year_2021.percentage) - parseFloat(a.year_2021.percentage)).map((owner, i) => 
            <div key={i} className="d-flex align-items-center my-1" style={{fontSize:"14px"}}>
              <div className="col-sm-7 text-truncate">
                <div className="d-flex align-items-center">
                  <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{i + 1}</p>
                  <div className="">
                    <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${owner.avatar}`}/>
                  </div>
                  <div>
                  { owner.metadata ?
                    <p className="m-0 mx-1">{owner.metadata.team_name} 
                      <span className="m-0 mx-1" style={{fontSize:"10px", color:"#cbcbcb"}}>{owner.display_name}</span>
                    </p>
                  :
                    <p className="m-0 mx-1">{owner.display_name}</p>
                  }
                    <div className="pb-2 mx-1">
                      <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>WIN {owner.year_2021.percentage}%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-2 text-truncate">
                <p className="m-0">{owner.year_2021.record}</p>
              </div>
              <div className="col-sm-1">
                  <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.year_2021.fpts}</p>
              </div>
              <div className="col-sm-1">
                  <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.year_2021.ppts}</p>
              </div>
              <div className="col-sm-1">
                  <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.year_2021.fpts_against}</p>
              </div>
            </div>
          )}
          </div>
        </>
      : select === "2020"?
        <div>
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
            <div className="col-sm-1">
              <p className="m-0" style={{fontSize:".7rem", color:"#7d91a6"}}>PA</p>
            </div>
          </div>
        { standings.sort((a,b) => parseFloat(b.year_2020.percentage) - parseFloat(a.year_2020.percentage)).map((owner, i) => 
          <div key={i} className="d-flex align-items-center my-1" style={{fontSize:"14px"}}>
            <div className="col-sm-7 text-truncate">
              <div className="d-flex align-items-center">
                <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{i + 1}</p>
                <div className="">
                  <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${owner.avatar}`}/>
                </div>
                <div>
                { owner.metadata ?
                  <p className="m-0 mx-1">{owner.metadata.team_name} 
                    <span className="m-0 mx-1" style={{fontSize:"10px", color:"#cbcbcb"}}>{owner.display_name}</span>
                  </p>
                :
                  <p className="m-0 mx-1">{owner.display_name}</p>
                }
                  <div className="pb-2 mx-1">
                    <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>WIN {owner.year_2020.percentage}%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-2 text-truncate">
              <p className="m-0">{owner.year_2020.record}</p>
            </div>
            <div className="col-sm-1">
                <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.year_2020.fpts}</p>
            </div>
            <div className="col-sm-1">
                <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.year_2020.ppts}</p>
            </div>
            <div className="col-sm-1">
                <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.year_2020.fpts_against}</p>
            </div>
          </div>
        )}
        </div>
      : select === "All Time"?
        <div>
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
            <div className="col-sm-1">
              <p className="m-0" style={{fontSize:".7rem", color:"#7d91a6"}}>PA</p>
            </div>
          </div>
        { standings.sort((a,b) => parseFloat(b.all_time.percentage) - parseFloat(a.all_time.percentage)).map((owner, i) => 
          <div key={i} className="d-flex align-items-center my-1" style={{fontSize:"14px"}}>
            <div className="col-sm-7 text-truncate">
              <div className="d-flex align-items-center">
                <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{i + 1}</p>
                <div className="">
                  <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${owner.avatar}`}/>
                </div>
                <div>
                { owner.metadata ?
                  <p className="m-0 mx-1">{owner.metadata.team_name} 
                    <span className="m-0 mx-1" style={{fontSize:"10px", color:"#cbcbcb"}}>{owner.display_name}</span>
                  </p>
                :
                  <p className="m-0 mx-1">{owner.display_name}</p>
                }
                  <div className="pb-2 mx-1">
                    <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>WIN {owner.all_time.percentage}%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-2 text-truncate">
              <p className="m-0">{owner.all_time.record}</p>
            </div>
            <div className="col-sm-1">
                <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.all_time.fpts}</p>
            </div>
            <div className="col-sm-1">
                <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.all_time.ppts}</p>
            </div>
            <div className="col-sm-1">
                <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.all_time.fpts_against}</p>
            </div>
          </div>
        )}
        </div>
      :
      <></>
      }
      </div>
    }
    </>
  )
}
