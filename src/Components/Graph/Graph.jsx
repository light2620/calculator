import { Chart } from 'primereact/chart';
import { useMemo } from 'react';
import './style.css';

const JDTrendChart = ({ crData }) => {
  const { labels, values } = useMemo(() => {
    const years = [];
    const vals = [];

    Object.entries(crData || {}).forEach(([key, value]) => {
      if (key.startsWith('JD')) {
        const year = key.replace('JD ', '').trim();
        const numVal = Number(String(value).replace(/[^\d.]/g, ''));
        if (year && !isNaN(numVal)) {
          years.push(year);
          vals.push(numVal);
        }
      }
    });

    const sorted = years
      .map((year, i) => ({ year: Number(year), value: vals[i] }))
      .sort((a, b) => a.year - b.year);

    return {
      labels: sorted.map((item) => item.year),
      values: sorted.map((item) => item.value),
    };
  }, [crData]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'JD Value',
        data: values,
        fill: false,
        borderColor: '#5D5FEF',
        tension: 0.4,
        pointBackgroundColor: '#5D5FEF',
        pointBorderColor: '#5D5FEF',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#5D5FEF',
        pointHoverBorderColor: '#fff',
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toLocaleString()}`,
        },
        backgroundColor: '#6366F1',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
          color: '#555',
        },
        grid: {
          borderDash: [5, 5],
          color: '#eee',
        },
      },
      x: {
        ticks: {
          color: '#555',
        },
        grid: {
          display: false,
        },
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  };

  return (
    <div className="jd-chart-card">
      <h4 className="chart-title">JD Trend</h4>
      <div className="chart-wrapper">
        {labels.length && values.length ? (
          <div className="chart-scroll-container">
            <Chart
              type="line"
              data={chartData}
              options={chartOptions}
              height={350}
            />
          </div>
        ) : (
          <div className="no-data">No Data Available</div>
        )}
      </div>
    </div>
  );
};

export default JDTrendChart;
