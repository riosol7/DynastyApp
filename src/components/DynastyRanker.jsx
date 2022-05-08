import React, { useState } from "react";
import { Icon } from '@iconify/react';

export default function DynastyRanker(props) {
    const isLoading = props.isLoading
    let rosters = props.rosters

     const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
    }

    const [showQBs, setShowQBs] = useState(false)
    const [qbArrow, setQbArrow] = useState(true)
    
    const showMoreQBs = () => {
        setShowQBs(!showQBs)
        setQbArrow(!qbArrow)
    }

    const [showRBs, setShowRBs] = useState(false)
    const [rbArrow, setRbArrow] = useState(true)
    
    const showMoreRBs = () => {
        setShowRBs(!showRBs)
        setRbArrow(!rbArrow)
    }

    const [showWRs, setShowWRs] = useState(false)
    const [wrArrow, setWrArrow] = useState(true)
    
    const showMoreWRs = () => {
        setShowWRs(!showWRs)
        setWrArrow(!wrArrow)
    }

    const [showTEs, setShowTEs] = useState(false)
    const [teArrow, setTeArrow] = useState(true)
    
    const showMoreTEs = () => {
        setShowTEs(!showTEs)
        setTeArrow(!teArrow)
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

    function getTopQB(display_name){
        let foundTeam = rosters.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        let topQB = foundTeam.kct.qb.players[0]
        return topQB
    }
    function getTopRB(display_name){
        let foundTeam = rosters.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        let topRB = foundTeam.kct.rb.players[0]
        return topRB
    }
    function getTopWR(display_name){
        let foundTeam = rosters.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        let topWR = foundTeam.kct.wr.players[0]
        return topWR
    }
    function getTopTE(display_name){
        let foundTeam = rosters.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        let topTE = foundTeam.kct.te.players[0]
        return topTE
    }
    

    return (
        <>
        {
            isLoading ? <p>Loading </p> :
            <div>
            {
                rosters.teamRank.map((roster, idx) => 
                    <div key={idx}>
                        <div className="d-flex">
                            <div className="">
                                <img alt="avatar" src={
                                    `https://sleepercdn.com/avatars/thumbs/${
                                        roster.kct.owner.avatar
                                    }`
                                }/>
                            </div>
                            <div className="">
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
                                <p>Team total: {roster.kct.teamTotal}</p>
                                <p> avg: 
                                {
                                roundToHundredth((roundToHundredth(roster.kct.qb.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.qb.players.length) +
                                    roundToHundredth(roster.kct.rb.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.rb.players.length) +
                                    roundToHundredth(roster.kct.wr.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.wr.players.length) +
                                    roundToHundredth(roster.kct.te.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.te.players.length))/4)
                                }
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="d-flex justify-content-between">
                                <p>QB rank: {qbRankings(roster)} - {roster.kct.qb.total}</p>
                                <p>avg: {roundToHundredth(roster.kct.qb.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.qb.players.length)}</p>
                                {
                                    qbArrow ?
                                        <Icon
                                            icon='akar-icons:circle-chevron-down'
                                            onClick={showMoreQBs}
                                            style={{
                                                fontSize:'1.5rem',
                                                marginRight:'1rem'
                                            }}
                                        />
                                    :
                                        <Icon
                                            onClick={showMoreQBs}
                                            icon='akar-icons:circle-chevron-up'
                                            style={{
                                                fontSize:'1.5rem',
                                                marginRight:'1rem'
                                            }}
                                        />
                                }
                            </div>
                            {
                                showQBs ?
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
                                                    {/* Display breakout indicator */}
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
                                                <p>{getTopQB(roster.kct.owner.display_name).position}</p>                                                </div>
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <span className="">
                                                    <img alt="thumb" 
                                                        className="thumb"
                                                        src={`https://sleepercdn.com/content/nfl/players/thumb/${
                                                            getTopQB(roster.kct.owner.display_name).player_id}.jpg`}
                                                    />
                                                </span>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-center">
                                                <p>{getTopQB(roster.kct.owner.display_name).player} - {getTopQB(roster.kct.owner.display_name).team}</p>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-center">
                                                <p>age: {getTopQB(roster.kct.owner.display_name).age}</p>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-center">
                                                <p>value: {getTopQB(roster.kct.owner.display_name).rating}</p>
                                            </div>
                                        </div>
                                    </div>
                            }                          
                        </div>
                        <div className="">
                            <div className="d-flex justify-content-between">
                                <p>RB rank: {rbRankings(roster)} - {roster.kct.qb.total}</p>
                                <p>avg: {roundToHundredth(roster.kct.rb.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.rb.players.length)}</p>
                            {
                                rbArrow ?
                                    <Icon
                                        icon='akar-icons:circle-chevron-down'
                                        onClick={showMoreRBs}
                                        style={{
                                            fontSize:'1.5rem',
                                            marginRight:'1rem'
                                        }}
                                    />
                                :
                                    <Icon
                                        onClick={showMoreRBs}
                                        icon='akar-icons:circle-chevron-up'
                                        style={{
                                            fontSize:'1.5rem',
                                            marginRight:'1rem'
                                        }}
                                    />
                            }
                            </div>
                            {
                                showRBs ?
                                    <div>
                                    {
                                        roster.kct.rb.players.map((player, i) =>
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
                                                <p>{getTopRB(roster.kct.owner.display_name).position}</p>                                                </div>
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <span className="">
                                                    <img alt="thumb" 
                                                        className="thumb"
                                                        src={`https://sleepercdn.com/content/nfl/players/thumb/${
                                                            getTopRB(roster.kct.owner.display_name).player_id}.jpg`}
                                                    />
                                                </span>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-center">
                                                <p>{getTopRB(roster.kct.owner.display_name).player} - {getTopRB(roster.kct.owner.display_name).team}</p>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-center">
                                                <p>age: {getTopRB(roster.kct.owner.display_name).age}</p>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-center">
                                                <p>value: {getTopRB(roster.kct.owner.display_name).rating}</p>
                                            </div>
                                        </div>
                                    </div>
                            }                          
                        </div>
                        <div className="">
                            <div className="d-flex justify-content-between">
                                <p>WR rank: {wrRankings(roster)} - {roster.kct.qb.total}</p>
                                <p>avg: {roundToHundredth(roster.kct.wr.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.wr.players.length)}</p>
                            {
                                rbArrow ?
                                    <Icon
                                        icon='akar-icons:circle-chevron-down'
                                        onClick={showMoreWRs}
                                        style={{
                                            fontSize:'1.5rem',
                                            marginRight:'1rem'
                                        }}
                                    />
                                :
                                    <Icon
                                        onClick={showMoreWRs}
                                        icon='akar-icons:circle-chevron-up'
                                        style={{
                                            fontSize:'1.5rem',
                                            marginRight:'1rem'
                                        }}
                                    />
                            }
                            </div>
                            {
                                showWRs ?
                                    <div>
                                    {
                                        roster.kct.wr.players.map((player, i) =>
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
                                                <p>{getTopWR(roster.kct.owner.display_name).position}</p>                                                </div>
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <span className="">
                                                    <img alt="thumb" 
                                                        className="thumb"
                                                        src={`https://sleepercdn.com/content/nfl/players/thumb/${
                                                            getTopWR(roster.kct.owner.display_name).player_id}.jpg`}
                                                    />
                                                </span>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-center">
                                                <p>{getTopWR(roster.kct.owner.display_name).player} - {getTopWR(roster.kct.owner.display_name).team}</p>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-center">
                                                <p>age: {getTopWR(roster.kct.owner.display_name).age}</p>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-center">
                                                <p>value: {getTopWR(roster.kct.owner.display_name).rating}</p>
                                            </div>
                                        </div>
                                    </div>
                            }                          
                        </div>
                        <div className="">
                            <div className="d-flex justify-content-between">
                                <p>TE rank: {teRankings(roster)} - {roster.kct.te.total}</p>
                                <p>avg: {roundToHundredth(roster.kct.te.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.te.players.length)}</p>
                            {  
                                teArrow ?
                                    <Icon
                                        icon='akar-icons:circle-chevron-down'
                                        onClick={showMoreTEs}
                                        style={{
                                            fontSize:'1.5rem',
                                            marginRight:'1rem'
                                        }}
                                    />
                                :
                                    <Icon
                                        onClick={showMoreTEs}
                                        icon='akar-icons:circle-chevron-up'
                                        style={{
                                            fontSize:'1.5rem',
                                            marginRight:'1rem'
                                        }}
                                    />
                            }
                            </div>
                            {
                                showTEs ?
                                    <div>
                                    {
                                        roster.kct.te.players.map((player, i) =>
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
                                                <p>{getTopTE(roster.kct.owner.display_name).position}</p>                                                </div>
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <span className="">
                                                    <img alt="thumb" 
                                                        className="thumb"
                                                        src={`https://sleepercdn.com/content/nfl/players/thumb/${
                                                            getTopTE(roster.kct.owner.display_name).player_id}.jpg`}
                                                    />
                                                </span>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-center">
                                                <p>{getTopTE(roster.kct.owner.display_name).player} - {getTopTE(roster.kct.owner.display_name).team}</p>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-center">
                                                <p>age: {getTopTE(roster.kct.owner.display_name).age}</p>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-center">
                                                <p>value: {getTopTE(roster.kct.owner.display_name).rating}</p>
                                            </div>
                                        </div>
                                    </div>
                            }                          
                        </div>
                    </div>
                )
            }
            </div>
        }
        </>
    )
}