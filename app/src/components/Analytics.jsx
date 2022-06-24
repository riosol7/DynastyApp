import React from 'react';

import AreaChart from "../components/AreaChart";
import HeatMap from './HeatMap';

export default function Analytics(props) {
    // const loadLeague = props.loadLeague
    // const league = props.league
    const loadRosters = props.loadRosters 
    const rosters = props.rosters

    return (
        <>
            <div className="d-flex">
                <div className="p-2">
                    <div className="d-flex justify-content-end">
                        <select id="dropDown">
                            <option value="Dynasty">Dynasty</option>
                            <option value="Power">Power</option>
                        </select>
                    </div>
                    <div className="pt-2 pb-4">
                        <AreaChart
                            loadRosters={loadRosters}
                            rosters={rosters}
                        />
                    </div>
                </div>
                <div className="pt-2 pb-4">
                    <HeatMap
                        loadRosters={loadRosters}
                        rosters={rosters}
                    />
                </div>
            </div>
        </>
    )
}
