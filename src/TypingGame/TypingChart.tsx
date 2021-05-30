import { useEffect, useState } from "react";
import { Line, defaults } from "react-chartjs-2";
import styled from "styled-components";
import { useData } from "../Contexts/DataContext";
import { useTypingData } from "../Contexts/TypingGameContext";
import { font } from "../Shared/Global/Font";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const TypingChart: React.FC<Props> = () => {
  const { theme } = useData();
  const { time, results, wpm, raw, errors } = useTypingData();
  const [labels, setLabels] = useState<number[]>([]);
  const [wpms, setWPMS] = useState<number[]>([]);
  const [raws, setRaws] = useState<number[]>([]);
  const [err, setErr] = useState<number[]>([]);
  // const [errs, setErrs] = useState<number[]>([]);

  useEffect(() => {
    if (time === 0) return;
    setWPMS([...wpms, wpm]);
    setRaws([...raws, raw]);
    setLabels([...labels, time]);
    setErr([...err, errors]);
  }, [raw]);

  defaults.font.family = font;
  defaults.font.size = 14;
  defaults.color = theme.sub;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "wpm",
        data: wpms,
        borderColor: "rgba(125, 125, 125, 1)",
        borderWidth: 2,
        yAxisID: "wpm",
        order: 2,
        radius: 2,
      },
      {
        label: "raw",
        data: raws,
        borderColor: "rgba(125, 125, 125, 1)",
        borderWidth: 2,
        yAxisID: "raw",
        order: 3,
        radius: 2,
      },
      {
        label: "errors",
        data: err,
        borderColor: "rgba(255, 125, 125, 1)",
        pointBackgroundColor: "rgba(255, 125, 125, 1)",
        borderWidth: 2,
        order: 1,
        yAxisID: "error",
        maxBarThickness: 10,
        type: "scatter",
        pointStyle: "crossRot",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            autoSkipPadding: 40,
          },
          display: true,
          scaleLabel: {
            display: false,
            labelString: "Seconds",
          },
        },
      ],
      yAxes: [
        {
          id: "wpm",
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  if (!results) return null;
  return (
    <Chart>
      <Line type="line" id="chart" data={data} options={options} />
    </Chart>
  );
};

export default TypingChart;

const Chart = styled.div`
  width: 100%;
  height: 100%;
  max-height: 200px;

  #chart {
    width: 100% !important;
    height: 100% !important;
  }
`;
