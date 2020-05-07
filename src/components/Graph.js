import React from 'react'

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const Graph = ({ graphData }) => {

    const data = graphData

    return (
        <div className='contentContainer'>
            <p className='graphTitle'>Gráfica de productividad semanal</p>
            <div className='graphContainer'>
                <VictoryChart
                    domainPadding={20}
                    theme={VictoryTheme.material}
                >
                    <VictoryAxis
                    label="Días de las semana"
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickValues={[1, 2, 3, 4, 5, 6, 7]}
                        tickFormat={['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']}
                        style={{
                            axisLabel: {fontSize: 8, padding: 30},
                            tickLabels: {fontSize: 8}
                        }}
                    />
                    <VictoryAxis
                        label="Tareas completadas"
                        dependentAxis
                        minDomain={{ x: 1 }}
                        tickFormat={x => x}
                        style={{
                            axisLabel: {fontSize: 8, padding: 30},
                            tickLabels: {fontSize: 8}
                        }}
                    />
                    <VictoryBar
                        style={{
                            data: { fill: "#6994f9" }
                        }}
                        padding={{ top: 0, bottom: 0 }}
                        data={data}
                        // data accessor for x values
                        x="daysOfWeek"
                        // data accessor for y values
                        y="completedTasks"
                    />
                </VictoryChart>
            </div>
        </div>
    )
}

export default Graph