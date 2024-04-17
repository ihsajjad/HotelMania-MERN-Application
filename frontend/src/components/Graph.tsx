import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const days = [
  { date: "2024-03-01", amount: 531, quantity: 8 },
  { date: "2024-03-02", amount: 688, quantity: 6 },
  { date: "2024-03-03", amount: 819, quantity: 3 },
  { date: "2024-03-04", amount: 647, quantity: 9 },
  { date: "2024-03-05", amount: 573, quantity: 2 },
  { date: "2024-03-06", amount: 719, quantity: 7 },
  { date: "2024-03-07", amount: 821, quantity: 8 },
  { date: "2024-03-08", amount: 956, quantity: 5 },
  { date: "2024-03-09", amount: 898, quantity: 10 },
  { date: "2024-03-10", amount: 679, quantity: 3 },
  { date: "2024-03-11", amount: 727, quantity: 4 },
  { date: "2024-03-12", amount: 934, quantity: 7 },
  { date: "2024-03-13", amount: 743, quantity: 2 },
  { date: "2024-03-14", amount: 531, quantity: 6 },
  { date: "2024-03-15", amount: 850, quantity: 1 },
  { date: "2024-03-16", amount: 901, quantity: 9 },
  { date: "2024-03-17", amount: 785, quantity: 5 },
  { date: "2024-03-18", amount: 623, quantity: 8 },
  { date: "2024-03-19", amount: 789, quantity: 4 },
  { date: "2024-03-20", amount: 535, quantity: 10 },
  { date: "2024-03-21", amount: 694, quantity: 2 },
  { date: "2024-03-22", amount: 713, quantity: 6 },
  { date: "2024-03-23", amount: 527, quantity: 1 },
  { date: "2024-03-24", amount: 813, quantity: 3 },
  { date: "2024-03-25", amount: 975, quantity: 7 },
  { date: "2024-03-26", amount: 523, quantity: 8 },
  { date: "2024-03-27", amount: 611, quantity: 10 },
  { date: "2024-03-28", amount: 801, quantity: 4 },
  { date: "2024-03-29", amount: 698, quantity: 5 },
  { date: "2024-03-30", amount: 567, quantity: 9 },
  { date: "2024-03-31", amount: 605, quantity: 3 },
];

const Graph = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Daily Revenue",
      },
    },
  };

  const data = {
    labels: days.map((day) => day.date),
    datasets: [
      {
        label: "Revenue $",
        data: days.map((day) => day.amount),
        backgroundColor: "#1f244d",
      },
    ],
  };

  return (
    <div className="border">
      <Bar options={options} data={data} />
    </div>
  );
};

export default Graph;
