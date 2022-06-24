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
            <div className="col pt-2 pb-4">
                <AreaChart
                    loadRosters={loadRosters}
                    rosters={rosters}
                />
            </div>
            <div className="col pt-2 pb-4">
                <HeatMap
                    loadRosters={loadRosters}
                    rosters={rosters}
                />
            </div>
        </>
    )
}
