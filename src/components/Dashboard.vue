<script setup>
import { useDataStore } from '@/store/post'

const store = useDataStore()

// Call the action on mount
store.DashboardCharts()

// Function to call on button click
function runCharts() {
  store.DashboardCharts()
}
</script>

<template>
  <h1>Dashboard</h1>
  <v-btn @click="runCharts">Run DashboardCharts</v-btn>
</template>
