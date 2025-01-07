import React, { useMemo, useRef, useEffect } from 'react';
import * as NetworkGraph from 'highcharts/modules/networkgraph'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { cloneDeep } from 'lodash'

NetworkGraph(Highcharts)

export const HighchartsGraphRenderer = ({
    data,
    transformer = x => x
}) => {
    const config = useMemo(() => transformer(cloneDeep(data)), []);
    const chartRef = useRef(null)

    useEffect(() => {
        if (chartRef && chartRef.current) {
            chartRef.current.chart.update(transformer(cloneDeep(data)))
        }
    }, [data.length])

    return <HighchartsReact 
        ref={chartRef}
        highcharts={Highcharts} 
        options={config}
    />;
}