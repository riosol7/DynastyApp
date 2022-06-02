import React from 'react'

export default function Standings(props) {
  const loadRosters = props.loadRosters
  const rosters = props.rosters
  const league = props.league

  let division_1 = rosters.totalRoster && rosters.totalRoster.filter(roster => roster.settings.division === 1)
  let division_2 = rosters.totalRoster && rosters.totalRoster.filter(roster => roster.settings.division === 2)
  console.log(division_1)
  return (
    <>
    {
      loadRosters ? <p>Loading </p> :
      <div className="container">
        <div className="my-2">
          <div className="d-flex">
            <div className="col-md-10"> 
              <p className="m-0 border-bottom">{league.metadata ? league.metadata.division_1 : ""}</p>  
            </div>
            <div className="col-md-2">
              <p className="m-0 border-bottom">W-L-T</p>
            </div>
          </div>
        {
          division_1.map((division, i) => 
            <div key={i} className="d-flex">
              <div className="col">
                <img className="ownerLogoSM" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                  division.owner_id.avatar}`}/>
              </div>
              <div className="col-lg-9 text-truncate">
                <p className="m-0">{division.owner_id.display_name}</p>
              </div>
              <div className="col-lg-2 text-truncate">
                <p className="m-0">{division.settings.wins}-{division.settings.losses}-{division.settings.ties}</p>
              </div>
            </div>
          )
        }
        </div>
        <div className="my-4">
          <div className="d-flex">
            <div className="col-md-10"> 
              <p className="m-0 border-bottom">{league.metadata ? league.metadata.division_2 : ""}</p>  
            </div>
            <div className="col-md-2">
              <p className="m-0 border-bottom">W-L-T</p>
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
