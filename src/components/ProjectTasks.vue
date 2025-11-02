<script>
import { mapState, mapActions } from 'pinia';
import { useDataStore } from '@/store/post'
import AddAndUpateTask from './AddAndUpateTask.vue';
import TaskCard from './TaskCard.vue';
import Snackbar from './Snackbar.vue';

export default {
  data() {
    return {
      Projectid: localStorage.getItem('ProjectId'),
      ProjectName: '',
      activeAddingTask: false,
      Snackbar: false,
      message: '',
    }
  },
  methods: {
    ...mapActions(useDataStore, ['GetTasksByProjectId','GetProjectById']),
    async GetData() {
      await this.GetTasksByProjectId(this.Projectid);
      await this.GetProjectById(this.Projectid)
      console.log('GetTasksProject: ',this.GetTasksProject );
      this.ProjectName = this.GetTasksProject[0].project.name
      
    },
    handleClose(message){
      this.activeAddingTask = false
      this.Snackbar = true
      this.message = message
      
    },    
    SnackbarUpdate(message) {
      this.Snackbar = true
      this.message = message
    },
    SnackbarDelete(message) {
      console.log('ProjectManagement: ' , message);
      this.Snackbar = true
      this.message = message
    },
  },
  async mounted() {
    await this.GetData()
  },
  computed: {
    ...mapState(useDataStore, ['GetTasksProject', 'ProjectDate'])
    

  },
  components: {
    AddAndUpateTask,
    TaskCard,
    Snackbar
  }

}
</script>

<template>
  <div class="d-flex justify-space-between align-center mb-4">
    <h1>{{ ProjectName + " " + $t("ProjectTasks.Project") }}</h1>
    <v-btn @click="activeAddingTask = true" class="bg-secondary">{{$t("ProjectTasks.NewTask")}}</v-btn>
  </div>
    <v-container fluid>
    <v-row>
      <v-col
        v-for="Task in GetTasksProject"
        cols="12"
        sm="6"
        md="4"
      >
        <TaskCard :TaskProps="Task" :ProjectID="this.Projectid" :ProjectDueDate="this.ProjectDate" @UpdateMessage="SnackbarUpdate" @DeleteMessage="SnackbarDelete" />
      </v-col>
    </v-row>
  </v-container>
  <AddAndUpateTask v-model="activeAddingTask" :ProjectID="this.Projectid" :ProjectDueDate="this.ProjectDate" @close="handleClose"></AddAndUpateTask>
  <template><Snackbar v-model="Snackbar" @close="Snackbar = false" :Message="message"></Snackbar></template>
</template>


