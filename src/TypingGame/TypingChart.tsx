import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { useTypingData } from "../Contexts/TypingGameContext";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const TypingChart: React.FC<Props> = () => {
  const { time } = useTypingData();
  const [labels, setLabels] = useState<number[]>([]);

  useEffect(() => {
    setLabels([...labels, time]);
    console.log(labels);
  }, [time]);

  const data = {
    labels: ["Red", "blue", "siema", "elo"],
    datasets: [
      {
        data: [12, 51, 12, 5],
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
  };
  return (
    <Line type="line" data={data} width={700} height={200} options={options} />
  );
};

export default TypingChart;
