import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const Graph = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const { data: statistics } = useQuery(
    "fetchStatistics",
    apiClient.fetchStatistics
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
    type: "line",
    labels: statistics?.map((statistic) =>
      new Date(statistic.date).toDateString()
    ),
    datasets: [
      {
        label: "Revenue",
        data: statistics?.map((statistic) => statistic.amount),
        backgroundColor: "#1f244d",
      },
      {
        label: "Bookings",
        data: statistics?.map((statistic) => statistic.quantity),
        backgroundColor: "#8bcf17",
      },
    ],
  };

  const totalAmount =
    statistics?.reduce((total, current) => total + current.amount, 0) || 0;

  const totalBookings =
    statistics?.reduce((total, current) => total + current.quantity, 0) || 0;

  return (
    <div className="">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="from-sky-500 graph-card border-sky-500">
          <h3 className="text-xl font-bold">Total Amount</h3>
          <span className="text-4xl font-bold">${totalAmount}</span>
        </div>
        <div className="from-blue-500 graph-card border-blue-500">
          <h3 className="text-xl font-bold">Total Bookings </h3>
          <span className="text-4xl font-bold">{totalBookings}</span>
        </div>
        <div className="from-cyan-500 graph-card border-cyan-500">
          <h3 className="text-xl font-bold">Average </h3>
          <span className="text-4xl font-bold">
            $
            {isNaN(totalAmount / totalBookings)
              ? 0
              : (totalAmount / totalBookings).toFixed(2)}
          </span>
        </div>
        <div className="from-purple-500 graph-card border-purple-500">
          <h3 className="text-xl font-bold">Commission (10%)</h3>
          <span className="text-4xl font-bold">${totalAmount * 0.1}</span>
        </div>
      </div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default Graph;
