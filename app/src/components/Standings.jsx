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
      <div className="pb-4 pt-1" style={{background:"#2a2c3e", borderRadius:"15px"}}>
        <div className="p-2">
          <p className="m-0 bold" style={{}}>Standings</p>
        </div>
        <div className="container" id="scrollBarActivity" style={{height:"24rem", width:"100%", overflow:"auto"}}>
          <div className="mb-5 mt-2" style={{fontSize:"14px"}}>
            <div className="d-flex align-items-center mb-3">
              <Icon icon="uim:layer-group" style={{fontSize:"1.35rem"}}/>
              <p className="m-0 mx-2" style={{fontSize:"1rem"}}>{league.metadata ? league.metadata.division_1 : ""}</p>  
            </div>
          { division_1.map((division, i) => 
            <div key={i} className="d-flex my-1">
              <div className="col-lg-10 text-truncate">
                <div className="d-flex align-items-center">
                  <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{i + 1}</p>
                  <div className="">
                    <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                      division.owner_id.avatar}`}/>
                  </div>
                  {
                    division.owner_id.metadata.team_name ?
                    <p className="m-0 mx-1" >{division.owner_id.metadata.team_name} <span className="m-0 mx-1"  style={{fontSize:"10px", color:"#cbcbcb"}}>{division.owner_id.display_name}</span></p>
                    :
                    <p className="m-0 mx-1">{division.owner_id.display_name}</p>
                  }
                </div>
                <div className="pb-2 mx-5">
                  <p className="m-0" style={{fontSize:".65rem", color:"#7d91a6"}}>PF {division.settings.fpts}</p>
                </div>
              </div>
              <div className="col-lg-2 text-truncate">
                <p className="m-0">{division.settings.wins}-{division.settings.losses}-{division.settings.ties}</p>
              </div>
            </div>
            )
          }
          </div>
          <div className="mb-4" style={{fontSize:"14px"}}>
            <div className="d-flex align-items-center mb-3">
              <Icon icon="uim:layer-group" style={{fontSize:"1.35rem"}}/>
              <p className="m-0 mx-2" style={{fontSize:"1rem"}}>{league.metadata ? league.metadata.division_2 : ""}</p>  
            </div>
          { division_2.map((division, i) => 
            <div key={i} className="d-flex my-1">
              <div className="col-lg-10 text-truncate">
                <div className="d-flex align-items-center">
                  <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{i + 1}</p>
                  <div className="">
                    <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                      division.owner_id.avatar}`}/>
                  </div>
                  {
                    division.owner_id.metadata.team_name ?
                    <p className="m-0 mx-1">{division.owner_id.metadata.team_name} <span className="m-0 mx-1" style={{fontSize:"10px", color:"#cbcbcb"}}>{division.owner_id.display_name}</span></p>
                    :
                    <p className="m-0 mx-1">{division.owner_id.display_name}</p>
                  }
                </div>
                <div className="pb-2 mx-5">
                  <p className="m-0" style={{fontSize:".65rem", color:"#7d91a6"}}>PF {division.settings.fpts}</p>
                </div>
              </div>
              <div className="col-lg-2 text-truncate">
                <p className="m-0">{division.settings.wins}-{division.settings.losses}-{division.settings.ties}</p>
              </div>
            </div>
            )
          }
          </div>
        </div>
      </div>
    }
    </>
  )
}
