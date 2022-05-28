import React from 'react'

export default function Standings(props) {
  const loadRosters = props.loadRosters
  const rosters = props.rosters
  const league = props.league

  let division_1 = rosters.totalRoster && rosters.totalRoster.filter(roster => roster.settings.division === 1)
  let division_2 = rosters.totalRoster && rosters.totalRoster.filter(roster => roster.settings.division === 2)

  return (
    <>
    {
      loadRosters ? <p>Loading </p> :
      <div className="row">
        <div className="my-2">
          <div className="d-flex">
            <div className="col-md-10"> 
              <p className="m-0">{league.metadata ? league.metadata.division_1 : ""}</p>  
            </div>
            <div className="col-md-2">
              <p className="m-0">W-L-T</p>
            </div>
          </div>
        {
          division_1.map((division, i) => 
            <div key={i} className="d-flex">
              <div className="col-lg-10 text-truncate">
                <p className="m-0">{division.owner_id.display_name}</p>
              </div>
              <div className="col-lg-2 text-truncate">
                <p className="m-0">{division.settings.wins}-{division.settings.losses}-{division.settings.ties}</p>
              </div>
            </div>
          )
        }
        </div>
        <div className="my-2">
          <div className="d-flex">
            <div className="col-md-10"> 
              <p className="m-0">{league.metadata ? league.metadata.division_2 : ""}</p>  
            </div>
            <div className="col-md-2">
              <p className="m-0">W-L-T</p>
            </div>
          </div>
        {
          division_2.map((division, i) => 
          <div key={i} className="d-flex">
            <div className="col-lg-10 text-truncate">
              <p className="m-0">{division.owner_id.display_name}</p>
            </div>
            <div className="col-lg-2 text-truncate">
              <p className="m-0">{division.settings.wins}-{division.settings.losses}-{division.settings.ties}</p>
            </div>
          </div>
          )
        }
        </div>
      </div>
    }
    </>
  )
}
