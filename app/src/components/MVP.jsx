import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
// import {logos} from "../assets/logos";

export default function MVP(props) {
    const rosters = props.rosters
    const loadRosters = props.loadRosters
    function getMVP(display_name){
        let foundTeam = rosters.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        let topPlayers = [
            foundTeam.kct.qb.players[0],
            foundTeam.kct.rb.players[0],
            foundTeam.kct.wr.players[0],
            foundTeam.kct.te.players[0]
        ]
        let topPlayer = topPlayers.reduce((prev, current) => {
            return (prev.rating > current.rating) ? prev : current
        })
        return topPlayer
    }

    var getInitials = function (name) {
        var splitName = name.split(" ");
        return splitName[0].charAt(0) + ". " + splitName[1]
    };

    // let findLogo = (DB) => {
    //     let foundLogo = logos.filter(logo => logo[DB])
    //     return Object.values(foundLogo[0])[0]
    // }
    return (
        <>
        { loadRosters ? <p>Loading </p> :
            <div className="d-flex" style={{maxWidth:"1195.2px", cursor:"grab"}}>
                <Swiper 
                    slidesPerView={7} 
                    spaceBetween={49.5} 
                    slidesPerGroup={1} 
                    loop={true} 
                    loopFillGroupWithBlank={true}  
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 5500,
                        disableOnInteraction: false,
                      }}
                    className="mySwiper"
                >
                {rosters.teamRank.map((roster, i) => 
                    <SwiperSlide key={i} className={""}>
                        <div className="">
                            <div className="displayOwnerLogo">
                                <img className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                    roster.kct.owner.avatar}`}/>
                            </div> 
                            <div className="">
                                <div
                                    className="headShot" 
                                    style={{
                                        backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                            getMVP(roster.kct.owner.display_name).player_id}.jpg)`,
                                    }}>
                                        <div className="backgroundShot"></div>
                                        {/* <div className="backgroundShot" style={{backgroundImage:`url(${findLogo(getMVP(roster.kct.owner.display_name).team)})`, 
                                            backgroundSize:"35%", backgroundPosition:"top 10% left 10%", backgroundRepeat:"no-repeat"}}></div> */}
                                </div> 
                                <div className="displayHUD">
                                    <span 
                                        className={
                                            getMVP(roster.kct.owner.display_name).position === "QB" ? "qbHUD" :
                                            getMVP(roster.kct.owner.display_name).position === "RB" ? "rbHUD" :
                                            getMVP(roster.kct.owner.display_name).position === "WR" ? "wrHUD" :
                                            "teHUD"
                                        }>
                                            {getMVP(roster.kct.owner.display_name).position}
                                    </span>
                                </div>
                                <p className="bold m-0 text-center" style={{fontSize:"14px"}}>{getInitials(getMVP(roster.kct.owner.display_name).player)}</p>
                                <p className="m-0 text-center" style={{fontSize:"12px"}}>{getMVP(roster.kct.owner.display_name).rating}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                )}
                </Swiper>
            </div>
        }
        </>
    )
}
