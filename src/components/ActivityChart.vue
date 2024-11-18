<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const data = [25, 46, 24, 60, 20];
const backgroundColor = data.map(point => point >= 40 ? '#6550cf' : '#d8d0ff');
const borderRadius = data.map(() => 10);

const chartData = {
  labels: [ '1-6', '7-12', '13-18', '19-24', '25-31' ],
  datasets: [ { xAxisID: 'xAxis', data, backgroundColor, borderRadius } ]
};
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    xAxis: {
      grid: {
        display: false,
      }
    },
  }
};
</script>

<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>