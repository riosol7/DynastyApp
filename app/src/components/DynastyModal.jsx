import React, {useState} from 'react';
import RadarChart from "./RadarChart";
import ColumnChart from "./ColumnChart";

import { Icon } from '@iconify/react';
import {logos} from "../assets/logos";
import age from "../assets/age.png";

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width:'38em',
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
    const closeModal = () => {
        props.onClose()
        setShowQBs(false)
        setQbArrow(true)
        setShowRBs(false)
        setRbArrow(true)
        setShowWRs(false)
        setWrArrow(true)
        setShowTEs(false)
        setTeArrow(true)
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
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center" style={{fontWeight:"200"}}>
                                <div className="d-flex align-items-center mt-2 px-4 pt-2 pb-2" style={{background:"#111111", borderRadius:"10px 10px 0px 0"}}>
                                    <Icon icon="akar-icons:crown" style={{marginRight:"5px", fontSize:"1rem", color:"#a9dfd8"}}/>
                                    <p className="m-0">Dynasty</p>
                                </div>
                                <div className="d-flex align-items-center mx-4 mt-2 pt-2 pb-2" style={{color:"#b0b0b2"}}>
                                    <Icon icon="ic:outline-offline-bolt" style={{marginRight:"5px", fontSize:"1.3rem"}}/>
                                    <p className="m-0">Power</p>
                                </div>
                            </div>
                            <div className="py-2 px-3">
                                <Icon icon="octicon:x-circle-fill-24" style={{fontSize:"1em", color:"#f25b57"}}onClick={closeModal}/>
                            </div>
                        </div>
                        <div style={{background:"#111111"}}>
                            <div className="d-flex pt-3">
                                <div className="d-flex">
                                    <div className="px-3">
                                        <img style={{border:"4px solid #203a43", background:"#acb6c3", borderRadius:"15px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                            roster.kct.owner.avatar}`
                                        }/>
                                    </div>
                                    <div className="">
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
                                        <div className="d-flex justify-content-between p-2 mt-2" style={{fontSize:"14px", borderRadius:"2px", borderBottom:"4px solid #203a43", width:"16.5em"}}>
                                            <div className="d-flex align-items-center">
                                                <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"2px"}}/>
                                                <p className="m-0">{roster.kct.qb.players.length + roster.kct.rb.players.length + roster.kct.wr.players.length + roster.kct.te.players.length} </p>
                                            </div>
                                            <div className="m-0 d-flex align-items-center" style={{fontSize:"14px", color:"#b0b0b2"}}>
                                                <Icon icon="fluent:tag-multiple-16-filled"style={{color:"#a9dfd8",fontSize:"21px"}}/>
                                                <span className="mx-1" style={{color:"whitesmoke"}}>{roster.kct.teamTotal}</span>
                                            </div>
                                            <div className="m-0 d-flex" style={{fontSize:"14px", color:"#b0b0b2"}}><p className="m-0">avg</p> 
                                                <span className="mx-1" style={{color:"whitesmoke"}}>
                                                { roundToHundredth(roundToHundredth((roster.kct.qb.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.qb.players.length) +
                                                roundToHundredth(roster.kct.rb.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.rb.players.length) +
                                                roundToHundredth(roster.kct.wr.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.wr.players.length) +
                                                roundToHundredth(roster.kct.te.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.te.players.length))/4
                                                )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="">
                                    <ColumnChart roster={roster} rosters={rosters}/>
                                </div>
                                <div className="">
                                    <RadarChart roster={roster} rosters={rosters}/>
                                </div>
                            </div>
                            <div id="scrollBar" className="py-2" style={{height:"479px", overflow:"auto", background:"#111111"}}>
                                <div className="mx-2">
                                    <div className="d-flex align-items-center" style={{height:"27px"}}>
                                        <div className="d-flex align-items-center" style={{width:"355px"}}>
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
                                            <div className="m-0 mx-2 d-flex align-items-center"> 
                                                <p className="m-0 bold" style={{fontSize:"16px",color:"#f8296d", marginRight:"6px"}}>QB</p> 
                                                <p className="m-0 mx-1"style={{color:"#b0b0b2", fontSize:"14px"}}>{qbRankings(roster)}</p> 
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center" style={{fontFamily:"Arial"}}>
                                            <div className="d-flex align-items-center" style={{width:"85px"}}>
                                                <div style={{}}>
                                                    <img src={age} alt="age" style={{marginRight:"4px"}}/>
                                                </div>
                                                <p className="m-0 mx-1 d-flex align-items-center" style={{fontSize:"14px"}}>
                                                    {roundToHundredth(roster.kct.qb.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.qb.players.length)}
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{width:"95px"}}>
                                                <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"6px"}}/>
                                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.qb.total}</p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{width:"50px"}}>
                                                <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"4px"}}/>
                                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.qb.players.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4 mt-2">
                                    { showQBs ? roster.kct.qb.players.map((player, i) =>
                                        <div key={i} className="d-flex align-items-center mb-3">
                                            <div style={{width:"30px"}} className="text-center">
                                            { i === 0?
                                                <Icon icon="bxs:star" style={{}} />
                                            :
                                                <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{i + 1}</p>
                                            }
                                            </div>
                                            <div className="mx-2">
                                                <div className="smallHeadShot"
                                                    style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                        player.player_id}.jpg)`,
                                                    }}>
                                                        <div className="displayOwnerLogoSM">
                                                        <img style={{width:"2em"}} alt="avatar" src={findLogo(player.team)}/></div>
                                                </div> 
                                            </div>
                                            <div className="mx-2" style={{fontSize:".9rem"}}>
                                                <p className="m-0 bold">{player.player}</p>
                                                <p className="m-0"style={{fontSize:"10px", color:"#cbcbcb"}}>{player.position} - {player.team}</p>
                                                <div className="d-flex align-items-center">
                                                    <p className="m-0" style={{fontSize:"12px", color:"#b0b0b2"}}>age <span style={{color:"whitesmoke"}}>{player.age}</span></p>
                                                    <div className="d-flex align-items-center mx-4">
                                                        <Icon icon="fluent:tag-16-filled" style={{color:"#a9dfd8"}}/>
                                                        <p className="m-0 mx-1" style={{fontSize:"13px"}}>{player.rating}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    :
                                        <div className="d-flex align-items-center">
                                            <div style={{width:"30px"}} className="text-center">
                                                <Icon icon="bxs:star" style={{}} />
                                            </div>
                                            <div className="mx-2">
                                                <div className="smallHeadShot"
                                                    style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                        getTopQB(roster.kct.owner.display_name).player_id}.jpg)`,
                                                    }}>
                                                        <div className="displayOwnerLogoSM"> 
                                                        <img style={{width:"2em"}} alt="avatar" src={findLogo(getTopQB(roster.kct.owner.display_name).team)}/></div>
                                                </div>
                                            </div>
                                            <div className="mx-2" style={{fontSize:".9rem"}}>
                                                <p className="m-0 bold">{getTopQB(roster.kct.owner.display_name).player}</p>
                                                <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{getTopQB(roster.kct.owner.display_name).position} - {getTopQB(roster.kct.owner.display_name).team}</p>
                                                <div className="d-flex align-items-center">
                                                    <p className="m-0" style={{fontSize:"12px", color:"#b0b0b2"}}>age <span style={{color:"whitesmoke"}}>{getTopQB(roster.kct.owner.display_name).age}</span></p>
                                                    <div className="d-flex align-items-center mx-4">
                                                        <Icon icon="fluent:tag-16-filled" style={{color:"#a9dfd8"}}/>
                                                        <p className="m-0 mx-1" style={{fontSize:"13px"}}>{getTopQB(roster.kct.owner.display_name).rating}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    </div>                          
                                </div>
                                <div className="mx-2">
                                    <div className="d-flex align-items-center" style={{height:"27px"}}>
                                        <div className="d-flex align-items-center" style={{width:"355px"}}>
                                        { rbArrow ?
                                            <Icon
                                                icon='akar-icons:circle-chevron-down'
                                                onClick={showMoreRBs}
                                                style={{
                                                    fontSize:'1.1rem',
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
                                                    fontSize:'1.1rem',
                                                    color:"#c9cfd1",
                                                    background:"black",
                                                    borderRadius:"50%"
                                                }}
                                            />
                                        }
                                            <div className="m-0 mx-2 d-flex align-items-center"> 
                                                <p className="m-0 bold" style={{fontSize:"16px",color:"#36ceb8", marginRight:"6px"}}>RB</p> 
                                                <p className="m-0 mx-1"style={{color:"#b0b0b2", fontSize:"14px"}}>{rbRankings(roster)}</p> 
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center" style={{fontFamily:"Arial"}}>
                                            <div className="d-flex align-items-center" style={{width:"85px"}}>
                                                <div style={{}}>
                                                    <img src={age} alt="age" style={{marginRight:"4px"}}/>
                                                </div>
                                                <p className="m-0 mx-1 d-flex align-items-center" style={{fontSize:"14px"}}>
                                                    {roundToHundredth(roster.kct.rb.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.rb.players.length)}
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{width:"95px"}}>
                                                <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"6px"}}/>
                                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.rb.total}</p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{width:"50px"}}>
                                                <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"4px"}}/>
                                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.rb.players.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4 mt-2">
                                    { showRBs ? roster.kct.rb.players.map((player, i) =>
                                        <div key={i} className="d-flex align-items-center mb-3">
                                            <div style={{width:"30px"}} className="text-center">
                                            { i === 0?
                                                <Icon icon="bxs:star" style={{}} />
                                            :
                                                <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{i + 1}</p>
                                            }
                                            </div>
                                            <div className="mx-2">
                                                <div className="smallHeadShot"
                                                    style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                        player.player_id}.jpg)`,
                                                    }}>
                                                        <div className="displayOwnerLogoSM">
                                                        <img style={{width:"2em"}} alt="avatar" src={findLogo(player.team)}/></div>
                                                </div> 
                                            </div>
                                            <div className="mx-2" style={{fontSize:".9rem"}}>
                                                <p className="m-0 bold">{player.player}</p>
                                                <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{player.position} - {player.team}</p>
                                                <div className="d-flex align-items-center">
                                                    <p className="m-0" style={player.age < "24"?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #42f3e9"}
                                                    :  player.age < "26"?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #3cf20a"}
                                                    : player.age < "27" ?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #f2c306"}
                                                    : player.age < "28" ?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #f26307"}
                                                    : player.age < "35" ?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #e9230b"}
                                                    :   {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid white"}
                                                    }>
                                                        age <span style={{color:"whitesmoke"}}>{player.age}</span>
                                                    </p>
                                                    <div className="d-flex align-items-center mx-4">
                                                        <Icon icon="fluent:tag-16-filled" style={{color:"#a9dfd8"}}/>
                                                        <p className="m-0 mx-1" style={{fontSize:"13px"}}>{player.rating}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    :
                                        <div className="d-flex align-items-center">
                                            <div style={{width:"30px"}} className="text-center">
                                                <Icon icon="bxs:star" style={{}} />
                                            </div>
                                            <div className="mx-2">
                                                <div className="smallHeadShot"
                                                    style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                        getTopRB(roster.kct.owner.display_name).player_id}.jpg)`,
                                                    }}>
                                                        <div className="displayOwnerLogoSM"> 
                                                        <img style={{width:"2em"}} alt="avatar" src={findLogo(getTopRB(roster.kct.owner.display_name).team)}/></div>
                                                </div>
                                            </div>
                                            <div className="mx-2" style={{fontSize:".9rem"}}>
                                                <p className="m-0 bold">{getTopRB(roster.kct.owner.display_name).player}</p>
                                                <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{getTopRB(roster.kct.owner.display_name).position} - {getTopRB(roster.kct.owner.display_name).team}</p>
                                                <div className="d-flex align-items-center">
                                                    <p className="m-0" style={getTopRB(roster.kct.owner.display_name).age < "24" ?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #42f3e9"}
                                                    :  getTopRB(roster.kct.owner.display_name).age < "26" ?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #3cf20a"}
                                                    : getTopRB(roster.kct.owner.display_name).age < "27" ?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #f2c306"}
                                                    : getTopRB(roster.kct.owner.display_name).age < "28" ?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #f26307"}
                                                    : getTopRB(roster.kct.owner.display_name).age < "35" ?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #e9230b"}
                                                    :   {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #3cf20a"}
                                                    }>
                                                        age <span style={{color:"whitesmoke"}}>{getTopRB(roster.kct.owner.display_name).age}</span>
                                                    </p>
                                                    <div className="d-flex align-items-center mx-4">
                                                        <Icon icon="fluent:tag-16-filled" style={{color:"#a9dfd8"}}/>
                                                        <p className="m-0 mx-1" style={{fontSize:"13px"}}>{getTopRB(roster.kct.owner.display_name).rating}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    </div>                          
                                </div>
                                <div className="mx-2">
                                    <div className="d-flex align-items-center" style={{height:"27px"}}>
                                        <div className="d-flex align-items-center" style={{width:"355px"}}>
                                        { wrArrow ?
                                            <Icon
                                                icon='akar-icons:circle-chevron-down'
                                                onClick={showMoreWRs}
                                                style={{
                                                    fontSize:'1.1rem',
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
                                                    fontSize:'1.1rem',
                                                    color:"#c9cfd1",
                                                    background:"black",
                                                    borderRadius:"50%"
                                                }}
                                            />
                                        }
                                            <div className="m-0 mx-2 d-flex align-items-center"> 
                                                <p className="m-0 bold" style={{fontSize:"16px",color:"#58a7ff", marginRight:"6px"}}>WR</p> 
                                                <p className="m-0 mx-1"style={{color:"#b0b0b2", fontSize:"14px"}}>{wrRankings(roster)}</p> 
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center" style={{fontFamily:"Arial"}}>
                                            <div className="d-flex align-items-center" style={{width:"85px"}}>
                                                <div style={{}}>
                                                    <img src={age} alt="age" style={{marginRight:"4px"}}/>
                                                </div>
                                                <p className="m-0 mx-1 d-flex align-items-center" style={{fontSize:"14px"}}>
                                                    {roundToHundredth(roster.kct.wr.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.wr.players.length)}
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{width:"95px"}}>
                                                <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"6px"}}/>
                                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.wr.total}</p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{width:"50px"}}>
                                                <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"4px"}}/>
                                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.wr.players.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4 mt-2">
                                    { showWRs ? roster.kct.wr.players.map((player, i) =>
                                        <div key={i} className="d-flex align-items-center mb-3">
                                            <div style={{width:"30px"}} className="text-center">
                                            { i === 0?
                                                <Icon icon="bxs:star" style={{}} />
                                            :
                                                <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{i + 1}</p>
                                            }
                                            </div>
                                            <div className="mx-2">
                                                <div className="smallHeadShot"
                                                    style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                        player.player_id}.jpg)`,
                                                    }}>
                                                        <div className="displayOwnerLogoSM">
                                                        <img style={{width:"2em"}} alt="avatar" src={findLogo(player.team)}/></div>
                                                </div> 
                                            </div>
                                            <div className="mx-2" style={{fontSize:".9rem"}}>
                                                <p className="m-0 bold">{player.player}</p>
                                                <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{player.position} - {player.team}</p>
                                                <div className="d-flex align-items-center">
                                                    <p className="m-0" style={player.age < "26"?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #42f3e9"}
                                                    : player.age < "28"?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #3cf20a"}
                                                    : player.age < "29"?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #f2c306"}
                                                    : player.age < "30"?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #f26307"}
                                                    : player.age < "35"?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #e9230b"}
                                                    : {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid white"}
                                                    }>
                                                        age <span style={{color:"whitesmoke"}}>{player.age}</span>
                                                    </p>
                                                    <div className="d-flex align-items-center mx-4">
                                                        <Icon icon="fluent:tag-16-filled" style={{color:"#a9dfd8"}}/>
                                                        <p className="m-0 mx-1" style={{fontSize:"13px"}}>{player.rating}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    :
                                        <div className="d-flex align-items-center">
                                            <div style={{width:"30px"}} className="text-center">
                                                <Icon icon="bxs:star" style={{}} />
                                            </div>
                                            <div className="mx-2">
                                                <div className="smallHeadShot"
                                                    style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                        getTopWR(roster.kct.owner.display_name).player_id}.jpg)`,
                                                    }}>
                                                        <div className="displayOwnerLogoSM"> 
                                                        <img style={{width:"2em"}} alt="avatar" src={findLogo(getTopWR(roster.kct.owner.display_name).team)}/></div>
                                                </div>
                                            </div>
                                            <div className="mx-2" style={{fontSize:".9rem"}}>
                                                <p className="m-0 bold">{getTopWR(roster.kct.owner.display_name).player}</p>
                                                <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{getTopWR(roster.kct.owner.display_name).position} - {getTopWR(roster.kct.owner.display_name).team}</p>
                                                <div className="d-flex align-items-center">
                                                    <p className="m-0" style={getTopWR(roster.kct.owner.display_name).age < "26"?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #42f3e9"}
                                                    : getTopWR(roster.kct.owner.display_name).age < "28"?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #3cf20a"}
                                                    : getTopWR(roster.kct.owner.display_name).age < "29"?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #f2c306"}
                                                    : getTopWR(roster.kct.owner.display_name).age < "30"?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #f26307"}
                                                    : getTopWR(roster.kct.owner.display_name).age < "35"?
                                                        {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid #e9230b"}
                                                    : {fontSize:"12px", color:"#b0b0b2", borderBottom:"1px solid white"}
                                                    }>
                                                        age <span style={{color:"whitesmoke"}}>{getTopWR(roster.kct.owner.display_name).age}</span>
                                                    </p>
                                                    <div className="d-flex align-items-center mx-4">
                                                        <Icon icon="fluent:tag-16-filled" style={{color:"#a9dfd8"}}/>
                                                        <p className="m-0 mx-1" style={{fontSize:"13px"}}>{getTopWR(roster.kct.owner.display_name).rating}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    </div>                          
                                </div>
                                <div className="mx-2">
                                    <div className="d-flex align-items-center" style={{height:"27px"}}>
                                        <div className="d-flex align-items-center" style={{width:"355px"}}>
                                        { teArrow ?
                                            <Icon
                                                icon='akar-icons:circle-chevron-down'
                                                onClick={showMoreTEs}
                                                style={{
                                                    fontSize:'1.1rem',
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
                                                    fontSize:'1.1rem',
                                                    color:"#c9cfd1",
                                                    background:"black",
                                                    borderRadius:"50%"
                                                }}
                                            />
                                        }
                                            <div className="m-0 mx-2 d-flex align-items-center"> 
                                                <p className="m-0 bold" style={{fontSize:"16px",color:"#faae58", marginRight:"6px"}}>TE</p> 
                                                <p className="m-0 mx-1"style={{color:"#b0b0b2", fontSize:"14px"}}>{teRankings(roster)}</p> 
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center" style={{fontFamily:"Arial"}}>
                                            <div className="d-flex align-items-center" style={{width:"85px"}}>
                                                <div style={{}}>
                                                    <img src={age} alt="age" style={{marginRight:"4px"}}/>
                                                </div>
                                                <p className="m-0 mx-1 d-flex align-items-center" style={{fontSize:"14px"}}>
                                                    {roundToHundredth(roster.kct.te.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.te.players.length)}
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{width:"95px"}}>
                                                <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"6px"}}/>
                                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.te.total}</p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{width:"50px"}}>
                                                <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"4px"}}/>
                                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.te.players.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4 mt-2">
                                    { showTEs ? roster.kct.te.players.map((player, i) =>
                                        <div key={i} className="d-flex align-items-center mb-3">
                                            <div style={{width:"30px"}} className="text-center">
                                            { i === 0?
                                                <Icon icon="bxs:star" style={{}} />
                                            :
                                                <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{i + 1}</p>
                                            }
                                            </div>
                                            <div className="mx-2">
                                                <div className="smallHeadShot"
                                                    style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                        player.player_id}.jpg)`,
                                                    }}>
                                                        <div className="displayOwnerLogoSM">
                                                        <img style={{width:"2em"}} alt="avatar" src={findLogo(player.team)}/></div>
                                                </div> 
                                            </div>
                                            <div className="mx-2" style={{fontSize:".9rem"}}>
                                                <p className="m-0 bold">{player.player}</p>
                                                <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{player.position} - {player.team}</p>
                                                <div className="d-flex align-items-center">
                                                    <p className="m-0" style={{fontSize:"12px", color:"#b0b0b2"}}>age <span style={{color:"whitesmoke"}}>{player.age}</span></p>
                                                    <div className="d-flex align-items-center mx-4">
                                                        <Icon icon="fluent:tag-16-filled" style={{color:"#a9dfd8"}}/>
                                                        <p className="m-0 mx-1" style={{fontSize:"13px"}}>{player.rating}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    :
                                        <div className="d-flex align-items-center">
                                            <div style={{width:"30px"}} className="text-center">
                                                <Icon icon="bxs:star" style={{}} />
                                            </div>
                                            <div className="mx-2">
                                                <div className="smallHeadShot"
                                                    style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                        getTopTE(roster.kct.owner.display_name).player_id}.jpg)`,
                                                    }}>
                                                        <div className="displayOwnerLogoSM"> 
                                                        <img style={{width:"2em"}} alt="avatar" src={findLogo(getTopTE(roster.kct.owner.display_name).team)}/></div>
                                                </div>
                                            </div>
                                            <div className="mx-2" style={{fontSize:".9rem"}}>
                                                <p className="m-0 bold">{getTopTE(roster.kct.owner.display_name).player}</p>
                                                <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{getTopTE(roster.kct.owner.display_name).position} - {getTopTE(roster.kct.owner.display_name).team}</p>
                                                <div className="d-flex align-items-center">
                                                    <p className="m-0" style={{fontSize:"12px", color:"#b0b0b2"}}>age <span style={{color:"whitesmoke"}}>{getTopTE(roster.kct.owner.display_name).age}</span></p>
                                                    <div className="d-flex align-items-center mx-4">
                                                        <Icon icon="fluent:tag-16-filled" style={{color:"#a9dfd8"}}/>
                                                        <p className="m-0 mx-1" style={{fontSize:"13px"}}>{getTopTE(roster.kct.owner.display_name).rating}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    </div>                          
                                </div>
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
