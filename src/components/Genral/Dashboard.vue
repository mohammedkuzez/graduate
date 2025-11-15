<template>
  <div>
    <h1 class="text-center mb-4">{{ $t('Dashboard.YourStatus') }}</h1>
    <div class="d-flex justify-center ga-15 mb-4">
        <P>{{ $t('Dashboard.totalProjects') + ': ' + this.Data.totalProjects }}</P>
        <P>{{ $t('Dashboard.totalTasks') + ': ' + this.Data.totalTasks }}</P>
    </div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          <Bar :data="TaskStatus" :key="chartKey" />
        </v-col>

        <v-col cols="12" md="6">
          <Bar :data="dailyStats" :key="dailyKey" />
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { useDataStore } from '@/store/post'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
        Data: {},
        ToDo: 0,
        InProgess: 0,
        Review: 0,
        Done: 0,
        date: [],
        finished: [],
        created: [],
        chartKey: 0,
        dailyKey: 0,
      TaskStatus: {
        labels: [ 'To Do', 'In Progress', 'Review', 'Done'],
        datasets: [
          {
            label: 'Task Status',
            backgroundColor: '#66BB6A',
            data: [this.ToDo, this.InProgess, this.Review, this.Done]
          }
        ]
    },
      dailyStats: {
        labels: [ 'To Do', 'In Progress', 'Review', 'Done'],
        datasets: [
          {
            label: 'Daily Stats',
            backgroundColor: '#66BB6A',
            data: [this.ToDo, this.InProgess, this.Review, this.Done]
          }
        ]
    }
}
},
methods: {
async getData() {
  const store = useDataStore();
  this.Data = await store.DashboardCharts();


  this.ToDo = this.Data.statusCounts[0].count;
  this.InProgess = this.Data.statusCounts[1].count;
  this.Review = this.Data.statusCounts[2].count;
  this.Done = this.Data.statusCounts[3].count;

  this.TaskStatus.datasets[0].data = [
    this.ToDo,
    this.InProgess,
    this.Review,
    this.Done
  ];
  this.chartKey++;


  this.date = this.Data.dailyStats.map(object => object.date);
  this.finished = this.Data.dailyStats.map(object => object.finished);
  this.created = this.Data.dailyStats.map(object => object.created);

  this.dailyStats.labels = this.date;

  this.dailyStats.datasets = [
    {
      label: "Created Tasks",
      backgroundColor: "#42A5F5",
      data: this.created
    },
    {
      label: "Finished Tasks",
      backgroundColor: "#66BB6A",
      data: this.finished
    }
  ];
  this.dailyKey++;
}

},
  async mounted() {
    await this.getData()
  }
}

</script>
