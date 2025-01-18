import { EChart } from '@kbox-labs/react-echarts'

export default function MieteChart () {
    var avgMiete2020 =  8.13 / 100;

    return <div id="MieteChart" className="w-full h-full  bg-white">
        <EChart
        legend={
            {
                
                selectedMode: false,
                formatter: '*(Beispielswerte)',
                data: ['Ohne Mietendeckel'],
                textStyle: {
                    color: '#000000',
                },
                lineStyle: {
                    opacity: 0,
                    color: '#000000',
                },
                bottom: 10,
                left: 10,
            }
        }
        renderer={'canvas'}
        animation={true}
        animationDuration={2500}
        onClick={() => console.log('clicked!')}
        style={{
            height: '600px',
            width: '100%'
        }}
        xAxis={{
            type: 'category'
        }}
        yAxis={{
            type: 'value',
            name:"Mietpreis",
            position: "left",
            axisLabel: {
            formatter: '{value} €/m²' 
            },
            min: 7,
            max: 9,
            offset: -20,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#808080',
                    type: 'dashed',
                }
            },
            nameLocation: 'end',
            nameTextStyle: {
                fontFamily: 'inter',
            },
        }}
        series={[
            {
                smooth: true,
            name:'Ohne Mietendeckel',
            type: 'line',
            data: [
                ['2013', 90.9 * avgMiete2020],
                ['2014', 92.3* avgMiete2020 ],
                ['2015', 93.5* avgMiete2020],
                ['2016', 94.6* avgMiete2020],
                ['2017', 95.9* avgMiete2020],
                ['2018', 97.2* avgMiete2020],
                ['2019', 98.6* avgMiete2020],
                ['2020', 100* avgMiete2020],
                ['2021', 101.4* avgMiete2020],
                ['2022', 103.1* avgMiete2020],
                ['2023', 105.2* avgMiete2020],
                ['2024', 107.7* avgMiete2020],

            ],
            itemStyle: {
                color: '#808080',
                opacity: 0,
            },
            lineStyle: {
                color: '#808080',
                width: 4,
            },
            markPoint: {
                animationDelay: 1500,
                silent: true,
                data: [
                    {
                        symbolSize: 35,
                        symbolRotate: 210,
                        symbol: 'arrow',
                        name: 'fixed x position',
                        yAxis: 8.8,
                        xAxis: "2024",
                        label: {
                            fontFamily: 'inter',
                            backgroundColor: '#808080',
                            borderRadius: 5,
                            padding: 10,
                            fontSize: 20,
                            fontStyle: 'normal',
                            color: 'white',
                            offset: [-120, -50],
                            formatter: 'Ohne Mietendeckel',
                        },
                    }, 
                ]
            },
            },
            {
                type: 'line',
                data: [['2021', 101.4* avgMiete2020], ['2021', 95* avgMiete2020]],
                lineStyle: {
                    color: '#ff0000',
                    width: 4,
                    type: 'dashed'
                },
                itemStyle: {
                    opacity: 0,
                },
            },
            {
                
                name:'Mit Mietendeckel',
                type: 'line',
                labelLine: {
                    show: true
                },
                markPoint: {
                    animationDelay: 1500,
                    silent: true,
                    data: [
                        {
                            symbolSize: 35,
                            symbol: 'arrow',
                            name: 'fixed x position',
                            yAxis: 7.7,
                            xAxis: "2024",
                            label: {
                                fontFamily: 'inter',
                                backgroundColor: '#ff0000',
                                borderRadius: 5,
                                padding: 10,
                                fontSize: 20,
                                fontStyle: 'normal',
                                color: 'white',
                                offset: [-35, 50],
                                formatter: 'Mit Mietendeckel*',
                            },
                        }, 
                    ]
                },
                data: [
                    ['2021', 95* avgMiete2020],
                    ['2022', 95* avgMiete2020],
                    ['2023', 95* avgMiete2020],
                    ['2024', 95* avgMiete2020],
                ],
                lineStyle: {
                    color: '#ff0000',
                    width: 4,
                    type:"solid"
                },
                itemStyle: {
                    opacity: 0,
                    color: '#ff0000',
                },
                
                }
        ]}
    />
    </div>
}