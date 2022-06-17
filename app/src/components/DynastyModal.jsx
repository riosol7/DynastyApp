import React, {useState} from 'react'
import { Icon } from '@iconify/react';
import {logos} from "../assets/logos";

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width:'40em',
    transform: 'translate(-50%, -50%)',
    background: "#1b2025",
    borderRadius:'5px',
    // paddingY: '1rem',
    zIndex: 1
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    zIndex:1
}

export default function DynastyModal(props) {
    const roster = props.team
    const rosters = props.rosters
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
    let findLogo = (team) => {
        let foundLogo = logos.filter(logo => logo[team])
        return Object.values(foundLogo[0])[0]
    }
    if(!props.open) return null 
    return (
        <>
        {  roster !== {} ? 
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES}>
                    <div>
                        <div className="d-flex justify-content-between pb-2">
                            <div className="d-flex align-items-center">
                                <div className="px-3 py-4">
                                    <img className="rounded-circle" style={{border:"4px solid #203a43", background:"#acb6c3"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                        roster.kct.owner.avatar}`
                                    }/>
                                </div>
                                <div>
                                    <div className="d-flex align-items-center">
                                        <Icon icon="icon-park-outline:ranking"style={{color:"#a9dfd8",fontSize:"1.2rem", marginRight:"2px"}}/>
                                    { roster.kct.owner.team_name ?
                                        <p className="m-0" style={{color:"#b0b0b2"}}>{roster.rank}
                                            <span style={{fontSize:"12px"}}>
                                            {   roster.rank === 1? "st" : 
                                                roster.rank === 2? "nd" : 
                                                roster.rank === 3? "rd" : "th"
                                            }
                                            </span>
                                            <span className="bold mx-1 mb-0" style={{fontSize:"21px", color:"white"}}>{roster.kct.owner.team_name}</span> 
                                            <span style={{color:"#7f7f7f", fontWeight:"lighter",marginLeft:"6px"}}>@{roster.kct.owner.display_name}</span>
                                        </p>
                                    :
                                        <p className="m-0" style={{color:"#b0b0b2"}}>{roster.rank}
                                            <span style={{fontSize:"12px"}}>
                                            {   roster.rank === 1? "st" : 
                                                roster.rank === 2? "nd" : 
                                                roster.rank === 3? "rd" : "th"
                                            }
                                            </span>
                                            <span className="bold mx-1 mb-0" style={{fontSize:"21px", color:"white"}}>{roster.kct.owner.display_name}</span> 
                                        </p>
                                    }
                                    </div>
                                    <div className="mt-2">
                                        <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"1rem", marginRight:"2px"}}/>

                                        <p className="m-0 d-flex align-items-center" style={{fontSize:"14px", color:"#b0b0b2"}}>
                                            <Icon icon="ri:stock-line"style={{color:"#a9dfd8",fontSize:"1.3rem", marginRight:"2px"}}/>
                                            <span className="mx-1" style={{color:"whitesmoke"}}>{roster.kct.teamTotal}</span>
                                        </p>
                                        <p className="m-0" style={{fontSize:"14px", color:"#b0b0b2"}}>avg 
                                            <span className="mx-1" style={{color:"whitesmoke"}}>
                                            { roundToHundredth(roundToHundredth((roster.kct.qb.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.qb.players.length) +
                                            roundToHundredth(roster.kct.rb.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.rb.players.length) +
                                            roundToHundredth(roster.kct.wr.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.wr.players.length) +
                                            roundToHundredth(roster.kct.te.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.te.players.length))/4
                                            )}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3">
                                <Icon icon="octicon:x-circle-fill-24" style={{fontSize:"1em", color:"#f25b57"}}onClick={props.onClose}/>
                            </div>
                        </div>
                        <div id="scrollBar" style={{height:"40rem", overflow:"auto"}}>
                            <div className="mx-2">
                                <div className="d-flex align-items-center">
                                { qbArrow ?
                                    <Icon
                                        icon='akar-icons:circle-chevron-down'
                                        onClick={showMoreQBs}
                                        style={{
                                            fontSize:'1.1rem',
                                            color:"#c9cfd1",
                                            background:"black",
                                            borderRadius:"50%"
                                        }}
                                    />
                                :
                                    <Icon
                                        onClick={showMoreQBs}
                                        icon='akar-icons:circle-chevron-up'
                                        style={{
                                            fontSize:'1.1rem',
                                            color:"#c9cfd1",
                                            background:"black",
                                            borderRadius:"50%"
                                        }}
                                    />
                                }
                                    <p className="m-0 mx-2 d-flex align-items-center"> 
                                        <span className="bold" style={{color:"#f8296d", marginRight:"2px"}}>QB</span> 
                                        <span style={{color:"#b0b0b2", fontSize:"14px"}}>{qbRankings(roster)}</span> 
                                    </p>
                                    <div className="d-flex align-items-center" style={{marginLeft:"20em"}}>
                                        <p className="m-0 mx-1" style={{fontSize:"14px"}}>
                                            <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"1rem", marginRight:"2px"}}/>
                                            {roster.kct.qb.players.length}
                                        </p>
                                        <p className="m-0 mx-3" style={{fontSize:"14px"}}><Icon icon="ri:stock-line" style={{fontSize:"1.3rem", color:"#a9dfd8", marginRight:"2px"}}/>
                                            {roster.kct.qb.total}
                                        </p>
                                        <p className="m-0 mx-1" style={{fontSize:"14px"}}><span style={{fontSize:"14px", color:"#b0b0b2"}}>avg </span> 
                                        {roundToHundredth(roster.kct.qb.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.qb.players.length)}</p>
                                    </div>
                                </div>
                                <div className="m-3">
                                { showQBs ? roster.kct.qb.players.map((player, i) =>
                                    <div key={i} className="d-flex align-items-center mb-3">
                                    {/* <div className="col-md-1 d-flex justify-content-end">
                                        <p>{player.position}</p>
                                    </div> */}
                                        <div className="">
                                            <div
                                                className="smallHeadShotQB"
                                                style={{ backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                    player.player_id}.jpg)`,
                                                }}>
                                                    <div className="displayOwnerLogoSM"></div>
                                            </div> 
                                        </div>
                                        <div className="">
                                            <p className="m-0">{player.player} - {player.team}</p>
                                            <p className="m-0">age: {player.age}</p>
                                            {/* Display breakout indicator */}
                                        </div>
                                        <div className="">
                                            <p className="m-0">value: {player.rating}</p>
                                        </div>
                                    </div>
                                    )
                                :
                                    <div className="d-flex align-items-center">
                                        {/* <div className="">
                                            <p>{getTopQB(roster.kct.owner.display_name).position}</p>
                                        </div> */}
                                        <div className="">
                                            <div
                                                className="smallHeadShotQB"
                                                style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                    getTopQB(roster.kct.owner.display_name).player_id}.jpg)`,
                                                }}>
                                                    <div className="displayOwnerLogoSM"> 
                                                    <img style={{width:"2em"}} alt="avatar" src={findLogo(getTopQB(roster.kct.owner.display_name).team)}/></div>
                                            </div>
                                        </div>
                                        <div className="mx-3" style={{fontSize:".9rem"}}>
                                            <p className="m-0 bold">{getTopQB(roster.kct.owner.display_name).player}</p>
                                            <p className="m-0">{getTopQB(roster.kct.owner.display_name).team} age: {getTopQB(roster.kct.owner.display_name).age}</p>
                                            <div className="">
                                                <p className="m-0">value: {getTopQB(roster.kct.owner.display_name).rating}</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                                </div>                          
                            </div>
                            <div className="">
                                <div className="d-flex justify-content-between">
                                    <p className="m-0">
                                        <span className="rbHUD">RB</span> 
                                        rank: {rbRankings(roster)} - {roster.kct.rb.total}
                                    </p>
                                    <p className="m-0">avg: {roundToHundredth(roster.kct.rb.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.rb.players.length)}</p>
                                { rbArrow ?
                                    <Icon
                                        icon='akar-icons:circle-chevron-down'
                                        onClick={showMoreRBs}
                                        style={{
                                            fontSize:'1.5rem',
                                            marginRight:'1rem',
                                            color:"#c9cfd1",
                                            background:"black",
                                            borderRadius:"50%"
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
                                { showRBs ?
                                    <div>
                                        { roster.kct.rb.players.map((player, i) =>
                                        <div key={i} className="d-flex align-items-center">
                                            {/* <div className="col-md-1 d-flex justify-content-end">
                                                <p>{player.position}</p>
                                            </div> */}
                                            <div className="">
                                                <div
                                                    className="headShot"
                                                    style={{
                                                        backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                            player.player_id}.jpg)`,
                                                    }}>
                                                        <div className="backgroundShot"></div>
                                                </div> 
                                            </div>
                                            <div className="">
                                                <p className="m-0">{player.player} - {player.team}</p>
                                                <p className="m-0">age: {player.age}</p>
                                            </div>
                                            <div className="">
                                                <p className="m-0">value: {player.rating}</p>
                                            </div>
                                        </div>
                                        )}
                                    </div>
                                :
                                    <div>
                                        <div className="d-flex align-items-center">
                                            {/* <div className="col-md-1 d-flex justify-content-end">
                                                <p>{getTopRB(roster.kct.owner.display_name).position}</p>                                                
                                            </div> */}
                                            <div className="">
                                                <div
                                                    className="headShot"
                                                    style={{ backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                        getTopRB(roster.kct.owner.display_name).player_id}.jpg)`,
                                                    }}>
                                                        <div className="backgroundShot"></div>
                                                </div>
                                            </div>
                                            <div className="">
                                                <p className="m-0">{getTopRB(roster.kct.owner.display_name).player} - {getTopRB(roster.kct.owner.display_name).team}</p>
                                                <p className="m-0">age: {getTopRB(roster.kct.owner.display_name).age}</p>
                                            </div>
                                            <div className="">
                                                <p className="m-0">value: {getTopRB(roster.kct.owner.display_name).rating}</p>
                                            </div>
                                        </div>
                                    </div>
                                }                          
                            </div>
                            <div className="">
                                <div className="d-flex justify-content-between">
                                    <p className="m-0">
                                        <span className="wrHUD">WR</span> 
                                        rank: {wrRankings(roster)} - {roster.kct.wr.total}
                                    </p>
                                    <p>avg: {roundToHundredth(roster.kct.wr.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.wr.players.length)}</p>
                                { rbArrow ?
                                    <Icon
                                        icon='akar-icons:circle-chevron-down'
                                        onClick={showMoreWRs}
                                        style={{
                                            fontSize:'1.5rem',
                                            marginRight:'1rem',
                                            color:"#c9cfd1",
                                            background:"black",
                                            borderRadius:"50%"
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
                                { showWRs ?
                                    <div>
                                    { roster.kct.wr.players.map((player, i) =>
                                        <div key={i} className="d-flex align-items-center">
                                            {/* <div className="col-md-1 d-flex justify-content-end">
                                                <p>{player.position}</p>
                                            </div> */}
                                            <div className="">
                                                <div
                                                    className="headShot"
                                                    style={{
                                                        backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                            player.player_id}.jpg)`,
                                                    }}>
                                                        <div className="backgroundShot"></div>
                                                </div> 
                                            </div>
                                            <div className="">
                                                <p className="m-0">{player.player} - {player.team}</p>
                                                <p className="m-0">age: {player.age}</p>
                                            </div>
                                            <div className="">
                                                <p className="m-0">value: {player.rating}</p>
                                            </div>
                                        </div>
                                    )}
                                    </div>
                                :
                                    <div>
                                        <div className="d-flex align-items-center">
                                            {/* <div className="col-md-1 d-flex justify-content-end">
                                                <p>{getTopWR(roster.kct.owner.display_name).position}</p>                                                
                                            </div> */}
                                            <div className="">
                                                <div
                                                    className="headShot"
                                                    style={{
                                                        backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                            getTopWR(roster.kct.owner.display_name).player_id}.jpg)`,
                                                    }}>
                                                        <div className="backgroundShot"></div>
                                                </div>
                                            </div>
                                            <div className="">
                                                <p className="m-0">{getTopWR(roster.kct.owner.display_name).player} - {getTopWR(roster.kct.owner.display_name).team}</p>
                                                <p className="m-0">age: {getTopWR(roster.kct.owner.display_name).age}</p>        
                                            </div>
                                            <div className="">
                                                <p className="m-0">value: {getTopWR(roster.kct.owner.display_name).rating}</p>
                                            </div>
                                        </div>
                                    </div>
                                }                          
                            </div>
                            <div className="">
                                <div className="d-flex justify-content-between">
                                    <p className="m-0">
                                        <span className="teHUD">TE</span> 
                                        rank: {teRankings(roster)} - {roster.kct.te.total}
                                    </p>
                                    <p className="m-0">avg: {roundToHundredth(roster.kct.te.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.te.players.length)}</p>
                                { teArrow ?
                                    <Icon
                                        icon='akar-icons:circle-chevron-down'
                                        onClick={showMoreTEs}
                                        style={{
                                            fontSize:'1.5rem',
                                            marginRight:'1rem',
                                            color:"#c9cfd1",
                                            background:"black",
                                            borderRadius:"50%"
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
                                { showTEs ?
                                    <div>
                                    { roster.kct.te.players.map((player, i) =>
                                        <div key={i} className="d-flex align-items-center">
                                            {/* <div className="col-md-1 d-flex justify-content-end">
                                                <p>{player.position}</p>
                                            </div> */}
                                            <div className="">
                                                <div
                                                    className="headShot"
                                                    style={{ backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                        player.player_id}.jpg)`,
                                                    }}>
                                                        <div className="backgroundShot"></div>
                                                </div> 
                                            </div>
                                            <div className="">
                                                <p className="m-0">{player.player} - {player.team}</p>
                                                <p className="m-0">age: {player.age}</p>
                                            </div>
                                            <div className="">
                                                <p className="m-0">value: {player.rating}</p>
                                            </div>
                                        </div>
                                    )}
                                    </div>
                                :
                                    <div>
                                        <div className="d-flex align-items-center">
                                            {/* <div className="col-md-1 d-flex justify-content-end">
                                                <p>{getTopTE(roster.kct.owner.display_name).position}</p>                                                
                                            </div> */}
                                            <div className="">
                                                <div
                                                    className="headShot"
                                                    style={{ backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                        getTopTE(roster.kct.owner.display_name).player_id}.jpg)`,
                                                    }}>
                                                        <div className="backgroundShot"></div>
                                                </div>
                                            </div>
                                            <div className="">
                                                <p className="m-0">{getTopTE(roster.kct.owner.display_name).player} - {getTopTE(roster.kct.owner.display_name).team}</p>
                                                <p className="m-0">age: {getTopTE(roster.kct.owner.display_name).age}</p>
                                            </div>
                                            <div className="">
                                                <p className="m-0">value: {getTopTE(roster.kct.owner.display_name).rating}</p>
                                            </div>
                                        </div>
                                    </div>
                                }                          
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        :<></>
        }
        </>
    )
}
