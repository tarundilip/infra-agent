import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ChartView({ reports }) {
  const sorted = [...reports].sort((a, b) => a.filename.localeCompare(b.filename));
  const labels = sorted.map(r => r.filename);
  const cpuData = sorted.map(r => r.cpu_percent);
  const memData = sorted.map(r => r.memory_percent);

  const data = {
    labels,
    datasets: [
      {
        label: 'CPU %',
        data: cpuData,
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Memory %',
        data: memData,
        borderColor: '#8e44ad',
        backgroundColor: 'rgba(142, 68, 173, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="chart-container" style={{ height: '400px' }}>
      <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>
        CPU & Memory Trends
      </h2>
      <Line data={data} options={options} />
    </div>
  );
}
