import { Line } from '@ant-design/plots';

const DonutChart = ({ chartData }) => {
    const data = [
        { year: '1991', value: 3, c:2},
        { year: '1992', value: 4, c:2 },
        { year: '1993', value: 5, c:2 },
        { year: '1991', value: 5, c:1 },
        { year: '1992', value: 4.9, c:1 },
        { year: '1993', value: 6, c:1 },
        { year: '1991', value: 7, c:3 },
        { year: '1992', value: 9, c:3 },
        { year: '1993', value: 13, c:3 },
      ];
      
      const config = {
        data,
        height:320,
        xField: 'year',
        yField: 'value',
        seriesField: 'c',
        point: {
          shapeField: 'square',
          sizeField: 4,
        },
        interaction: {
          tooltip: {
            marker: false,
          },
        },
        style: {
          lineWidth: 2,
        },
      };
  return <>
  <Line {...config} />
  </>;
};

export default DonutChart;
