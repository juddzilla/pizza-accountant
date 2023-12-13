import React from 'react';
import {
  ArcElement,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
);

export const Area = (results, currency, unit) => {
  if (results.length < 2) {
    return null;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: `Sq ${ unit } / pizza`,
      },
    },
  };
  const backgroundColors = ['#e64001', '#E6E6E6', '#C2C3C5'];
  const datasetData = results.map((result, index) => ({
    label: `Pizza ${result.pizza + 1}`,
    data: [result.area],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    backgroundColor: backgroundColors[index],
    tension: 0.1
  }))

  const data = {
    labels: ['Pizzas'],
    datasets: datasetData
  };

  return (<Bar options={options} data={data} />)
}

export const Per = (results, currency, unit) => {
  if (results.length < 2) {
    return null;
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${ currency.symbol } / sq ${ unit }`,
      },
    }
  };

  const data = {
    labels: results.map((r, index) => `Pizza ${r.pizza + 1}`),
    datasets: [{
      fill: true,
      data:  results.map(r => r.per),
      backgroundColor: '#fd9d04',
      borderColor: '#e64001',
    }]
  };
  return (<Line data={ data } options={ options } />)
};

export const Tastiness = () => {
  const data = {
    labels: ['People'],
    datasets: [
      {
        label: '% Pizza Obsessionados',
        data: [100],
        backgroundColor: [
          '#fd9d04'
        ],
        borderColor: [
          '#fd9d04'
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: '% Pizza Maniacs',
      },
    },
  };
  return (<Pie data={ data } options={ options } />)
}