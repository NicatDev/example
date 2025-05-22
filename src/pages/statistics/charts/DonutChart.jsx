import { Pie } from "@ant-design/plots";

const DonutChart = ({ chartData }) => {
    const config = {
        height:320,
        data: [
          { type: 'type1', value: 27 },
          { type: 'type2', value: 25 },
          { type: 'type1', value: 18 },
          { type: 'type2', value: 15 },
          { type: 'type1', value: 10 },
          { type: 'type2', value: 5 },
        ],
        angleField: 'value',
        colorField: 'type',
        innerRadius: 0.8,
        label: {
          text: 'value',
          style: {
            fontWeight: 'bold',
          },
        },
        legend: {
          color: {
            title: false,
            position: 'bottom',
            rowPadding: 5,
          },
        },
        annotations: [
          {
            type: 'text',
            style: {
              text: '35',
              x: '50%',
              y: '50%',
              textAlign: 'center',
              fontSize: 40,
              fontStyle: 'bold',
            },
          },
        ],
      };
  return <>
  <Pie {...config} />
  </>;
};

export default DonutChart;
