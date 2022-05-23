import React from 'react'

export default function Standings(props) {
  const league = props.league

  return (
    <div className="d-flex">
      <div>
        <p className="m-0">{league.metadata ? league.metadata.division_1 : ""}</p>
      {
        league.divisions.division_1_owners.map((owner, i) => 
            <div key={i}>
                <p className="m-0">{owner}</p>
            </div>
        )
      }
      </div>
      <div>
        <p  className="m-0">{league.metadata ? league.metadata.division_2 : ""}</p>
      {
        league.divisions.division_2_owners.map((owner, i) => 
            <div key={i}>
                <p className="m-0">{owner}</p>
            </div>
        )
      }
      </div>
    </div>
  )
}
