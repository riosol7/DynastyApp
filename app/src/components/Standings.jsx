import React from 'react'
import { Icon } from '@iconify/react';

export default function Standings(props) {
  const loadRosters = props.loadRosters
  const rosters = props.rosters
  const league = props.league

  let division_1 = rosters.totalRoster && rosters.totalRoster.filter(roster => roster.settings.division === 1)
  let division_2 = rosters.totalRoster && rosters.totalRoster.filter(roster => roster.settings.division === 2)
  //will need to sort by record W-L-T
  
  return (
    <>
    { loadRosters ? <p>Loading </p> :
      <div className="pb-4 pt-1">
        <div className="d-flex align-items-center py-2">
          <Icon icon="icon-park-outline:ranking" style={{color:"#a9dfd8",fontSize:"1rem"}}/>
          <p className="m-0 mx-1 bold" style={{}}>Standings</p>
        </div>
        <div className="">
        {/* <div className="container" id="scrollBarActivity" style={{height:"31.593rem", width:"100%", overflow:"auto"}}> */}
          <div className="mb-5 mt-2" style={{fontSize:"14px"}}>
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
          <div className="mt-2" style={{fontSize:"14px"}}>
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
                {
                  division.metadata.streak.includes("W") === true ?
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
      </div>
    }
    </>
  )
}
