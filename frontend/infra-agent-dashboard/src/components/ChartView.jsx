import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,  
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale, 
  Title,
  Tooltip,
  Legend
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
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Memory %',
        data: memData,
        borderColor: 'rgba(153,102,255,1)',
        fill: false,
      },
    ],
  };

  return (
    <div style={{ background: '#fff', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
      <h2>CPU & Memory Trends</h2>
      <Line data={data} />
    </div>
  );
}