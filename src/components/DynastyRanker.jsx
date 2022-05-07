import React, { useState } from "react";
import { Icon } from '@iconify/react';

export default function DynastyRanker(props) {
    const isLoading = props.isLoading
    let rosters = props.rosters

    const [show, setShow] = useState(true)
    const [arrow, setArrow] = useState(true)
    
    const showMore = () => {
        setShow(!show)
        setArrow(!arrow)
    }

    function qbRankings (roster) {
        let foundTeam = rosters.qbRank.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
        let rank = 0
        foundTeam.rank === 1?
        rank = foundTeam.rank + "st"
        :
        foundTeam.rank === 2?
        rank = foundTeam.rank + "nd"
        :
        foundTeam.rank === 3?
        rank = foundTeam.rank + "rd"
        :
        rank = foundTeam.rank + "th"
        return rank
    }

    function rbRankings (roster) {
        let foundTeam = rosters.rbRank.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
        let rank = 0
        foundTeam.rank === 1?
        rank = foundTeam.rank + "st"
        :
        foundTeam.rank === 2?
        rank = foundTeam.rank + "nd"
        :
        foundTeam.rank === 3?
        rank = foundTeam.rank + "rd"
        :
        rank = foundTeam.rank + "th"
        return rank
    }

    function wrRankings (roster) {
        let foundTeam = rosters.wrRank.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
        let rank = 0
        foundTeam.rank === 1?
        rank = foundTeam.rank + "st"
        :
        foundTeam.rank === 2?
        rank = foundTeam.rank + "nd"
        :
        foundTeam.rank === 3?
        rank = foundTeam.rank + "rd"
        :
        rank = foundTeam.rank + "th"
        return rank
    }

    function teRankings (roster) {
        let foundTeam = rosters.teRank.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
        let rank = 0
        foundTeam.rank === 1?
        rank = foundTeam.rank + "st"
        :
        foundTeam.rank === 2?
        rank = foundTeam.rank + "nd"
        :
        foundTeam.rank === 3?
        rank = foundTeam.rank + "rd"
        :
        rank = foundTeam.rank + "th"
        return rank
    }

    function getTopQb(display_name){
        let foundTeam = rosters.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        let topQB = foundTeam.kct.qb.players[0]
        return topQB
    }
    

    return (
        <>
        {
            isLoading ? <p>Loading </p> :
            <div>
            {
                rosters.teamRank.map((roster, idx) => 
                    <div key={idx}>
                    {
                        roster.kct.owner.team_name ?
                        <p>{roster.rank}
                        {
                            roster.rank === 1? "st" : 
                            roster.rank === 2? "nd" : 
                            roster.rank === 3? "rd" : "th"
                        }: {roster.kct.owner.team_name}
                        </p>
                        :
                        <p>{roster.rank}
                        {
                            roster.rank === 1?  "st" : 
                            roster.rank === 2? "nd" : 
                            roster.rank === 3? "rd" : "th"
                        }: {roster.kct.owner.display_name}</p>
                    }
                        <div className="">
                            <p>Team total: {roster.kct.teamTotal}</p>
                            <img alt="avatar" src={
                                `https://sleepercdn.com/avatars/thumbs/${
                                    roster.kct.owner.avatar
                                }`
                            }/>
                        </div>
                        <div className="">
                            <div className="d-flex justify-content-between">
                                <p>QB rank: {qbRankings(roster)} - {roster.kct.qb.total}</p>
                                {
                                    arrow ?
                                        <Icon
                                            icon='akar-icons:circle-chevron-down'
                                            onClick={showMore}
                                            style={{
                                                fontSize:'1.5rem',
                                                marginRight:'1rem'
                                            }}
                                        />
                                    :
                                        <Icon
                                            onClick={showMore}
                                            icon='akar-icons:circle-chevron-up'
                                            style={{
                                                fontSize:'1.5rem',
                                                marginRight:'1rem'
                                            }}
                                        />
                                }
                            </div>
                            {
                                show ?
                                    <div>
                                    {
                                        roster.kct.qb.players.map((player, i) =>
                                            <div key={i} className="d-flex align-items-center">
                                                <div className="col-md-1 d-flex justify-content-end">
                                                    <p>{player.position}</p>
                                                </div>
                                                <div className="col-md-2 d-flex justify-content-center">
                                                    <span className="">
                                                        <img alt="thumb" 
                                                            className="thumb"
                                                            src={`https://sleepercdn.com/content/nfl/players/thumb/${
                                                                player.player_id}.jpg`}
                                                        />
                                                    </span>
                                                </div>
                                                <div className="col-md-1 d-flex justify-content-center">
                                                    <p>{player.player} - {player.team}</p>
                                                </div>
                                                <div className="col-md-1 d-flex justify-content-center">
                                                    <p>age: {player.age}</p>
                                                </div>
                                                <div className="col-md-1 d-flex justify-content-center">
                                                    <p>value: {player.rating}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                    </div>
                                :
                                    <div>
                                        <div className="d-flex align-items-center">
                                            <div className="col-md-1 d-flex justify-content-end">
                                                <p>{getTopQb(roster.kct.owner.display_name).position}</p>                                                </div>
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <span className="">
                                                    <img alt="thumb" 
                                                        className="thumb"
                                                        src={`https://sleepercdn.com/content/nfl/players/thumb/${
                                                            getTopQb(roster.kct.owner.display_name).player_id}.jpg`}
                                                    />
                                                </span>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-center">
                                                <p>{getTopQb(roster.kct.owner.display_name).player} - {getTopQb(roster.kct.owner.display_name).team}</p>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-center">
                                                <p>age: {getTopQb(roster.kct.owner.display_name).age}</p>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-center">
                                                <p>value: {getTopQb(roster.kct.owner.display_name).rating}</p>
                                            </div>
                                        </div>
                                    </div>
                            }                          
                        </div>
                        <p>RB rank: {rbRankings(roster)} - {roster.kct.rb.total}</p>
                        {
                            roster.kct.rb.players.map((player, i) =>
                            <div key={i}>
                                <img alt="thumb" src={`https://sleepercdn.com/content/nfl/players/thumb/${player.player_id}.jpg`}/>
                                <p>{player.position} {player.player}</p>
                                <p>{player.team}</p>
                                <p>age: {player.age}</p>
                                <p>value: {player.rating}</p>
                            </div>
                            )
                        }
                        <p>WR rank: {wrRankings(roster)} - {roster.kct.wr.total}</p>
                        {
                            roster.kct.wr.players.map((player, i) =>
                            <div key={i}>
                                <img alt="thumb" src={`https://sleepercdn.com/content/nfl/players/thumb/${player.player_id}.jpg`}/>
                                <p>{player.position} {player.player}</p>
                                <p>{player.team}</p>
                                <p>age: {player.age}</p>
                                <p>value: {player.rating}</p>
                            </div>
                            )
                        }
                            <p>TE rank: {teRankings(roster)} - {roster.kct.te.total}</p>
                        {
                            roster.kct.te.players.map((player, i) =>
                            <div key={i}>
                                <img alt="thumb" src={`https://sleepercdn.com/content/nfl/players/thumb/${player.player_id}.jpg`}/>
                                <p>{player.position} {player.player}</p>
                                <p>{player.team}</p>
                                <p>age: {player.age}</p>
                                <p>value: {player.rating}</p>
                            </div>
                            )
                        }
                    </div>
                )
            }
            </div>
        }
        </>
    )
}