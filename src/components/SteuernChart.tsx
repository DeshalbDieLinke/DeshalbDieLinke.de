import { EChart } from "@kbox-labs/react-echarts";
import * as echart from "echarts";
const labelPositions = ['top', 'bottom', 'top', 'bottom']; // Predefined positions for each label

export default function MieteChart () {
    const colors = ['#FF0000', '#000', '#ffed00', '#46962b', '#a8323c', '#964B00'];
    var timeLineIndex = 0;
    let timeline: echart.TimelineComponentOption = {
            show: true,
            axisType: 'value',
            playInterval: 2000,
            autoPlay: true,
            data: [20000 ,40000, 60000, 120000, 300000],
            orient: 'horizontal',
            currentIndex: timeLineIndex,
            left: "5%",
            right: "5%",
            
            label: {
                formatter: function (value, index) {
                  return `${value}€`;
                },
                position: 'bottom',
                fontFamily: 'inter',
                fontWeight: 'normal',
                fontSize: 12,
                offset: [0, 0],
            }
          };
  
  return (
    <div id="SteuerChart" className="w-full md:h-full bg-white">
      <EChart
        timeline={timeline}
        renderer={"canvas"}
        style={{
          height: "600px",
          width: "100%",
        }}
        xAxis={{
          type: "category",
        }}
        yAxis={{
          type: "value",
          name: "Entlastung in Euro",
          position: "left",
          axisLabel: {
            formatter: "{value}€",
          },
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
          
          // min: -80000,            max: 50000,
        }}
        options={[
          {
            yAxis: {
              min: -2000,
              max: 15000,
            },
            series: [
              {
                name: "",
                data: [
                  {value:["Die Linke", 6490], itemStyle: {color: colors[0]}},
                  {value:["CDU", 890], itemStyle: {color: colors[1]}},
                  {value:["FDP", 2910], itemStyle: {color: colors[2]}},
                  {value:["Die Grünen", 3420], itemStyle: {color: colors[3]}},
                  {value:["SPD", 3200], itemStyle: {color: colors[4]}},
                  {value:["AfD", 0], itemStyle: {color: colors[5]}},
                ],
              },
            ],
          },
          {
            yAxis: {
              min: -2000,
              max: 15000
            },
            series: [
              {
                name: "",
                type: "bar",
                data: [
                    {value: ["Die Linke", 5090], itemStyle: {color: colors[0]}},
                    {value:["CDU", 940], itemStyle: {color: colors[1]}},
                    {value:["FDP", 870], itemStyle: {color: colors[2]}},
                    {value:["Die Grünen", 3290], itemStyle: {color: colors[3]}},
                    {value:["SPD", 4030], itemStyle: {color: colors[4]}},
                    {value:["AfD", 20], itemStyle: {color: colors[5]}},
                ],
                itemStyle: {
                  color: "#000000",
                },
                colorBy: "series",
              },
            ],
          },
          {
            yAxis: {
              min: -2000,
              max: 15000
            },
            series: [
              {
                name: "",
                type: "bar",
                data: [
                    {value:["Die Linke", 5520],itemStyle: {color: colors[0]}},
                    {value:["CDU", 1090],itemStyle: {color: colors[1]}},
                    {value:["FDP", 1990],itemStyle: {color: colors[2]}},
                    {value:["Die Grünen", 1930],itemStyle: {color: colors[3]}},
                    {value:["SPD", 1020], itemStyle: {color: colors[4]}},
                    {value:["AfD", 1690],itemStyle: {color: colors[5]}}
                ],
                itemStyle: {
                  color: "#000000",
                },
                colorBy: "series",
              },
            ],
          },
          {
            yAxis: {
              min: -2000,
              max: 15000,
            },
            series: [
              {
                name: "",
                type: "bar",
                data: [
                    {value:["Die Linke", -1780],itemStyle: {color: colors[0]}},
                    {value:["CDU", 2290],itemStyle: {color: colors[1]}},
                    {value:["FDP", 6500],itemStyle: {color: colors[2]}},
                    {value:["Die Grünen", 750], itemStyle: {color: colors[3]}},
                    {value:["SPD", 1090],itemStyle: {color: colors[4]}},
                    {value:["AfD", 14130],itemStyle: {color: colors[5]}},
                ],
                itemStyle: {
                  color: "#000000",
                },
                colorBy: "series",
              },
            ],
          },
          {
            yAxis: {
              min: -80000,
              max: 50000,
            },
            series: [
              {
                name: "",
                type: "bar",
                data: [
                    {value:["Die Linke", -73250],itemStyle: {color: colors[0]}},
                    {value:["CDU", 10500],itemStyle: {color: colors[1]}},
                    {value:["FDP", 18160],itemStyle: {color: colors[2]}},
                    {value:["Die Grünen", -12990],itemStyle: {color: colors[3]}},
                    {value:["SPD", -12840],itemStyle: {color: colors[4]}},
                    {value:["AfD", 42620],itemStyle: {color: colors[5]}},
                ],
              },
            ],
          },
        ]}
      />
    </div>

  );
}
