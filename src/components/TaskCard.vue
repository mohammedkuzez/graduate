<script>
import { RouterLink } from "vue-router";
import { mapState, mapActions } from 'pinia';
import { useDataStore } from '@/store/post'
import Delete from "./Delete.vue";
import AddAndUpateTask from "./AddAndUpateTask.vue";
export default {
  props: ['TaskProps','ProjectID','ProjectDueDate'],
  emits: ['UpdateMessage', 'DeleteMessage'],
  data() {
    return {
      activeDialogDelete: false,
      activeDialogEdit: false,
      activeOwner: false
    };
  },
  methods: {
    ...mapActions(useDataStore, ['GetProjectName']),
    activeDelete() {
      this.activeDialogDelete = true;
    },
    activeEdit() {
      this.activeDialogEdit = true
      
    },
    GoToTaskDeitals() {
      localStorage.setItem('ProjectId', this.TaskProps.id)
      this.$router.push(`/Home/${this.TaskProps.id}`);
    },
    handleClose(message) {
      this.activeDialogEdit = false
      this.$emit('UpdateMessage', message)

    },
    deleteClose(message) {
      this.activeDialogDelete = false 
      console.log('ProjectCard: ' , message);
      this.$emit('DeleteMessage', message)
      
    }
  },
  computed: {
    ...mapState(useDataStore, ['userId']),
    ForWhoThisTask() {
      return this.TaskProps.creator.name;
    },
    EndDate() {
      return new Date(this.TaskProps.endDate).toLocaleDateString();
    },
  },
  mounted() {
    if(this.TaskProps.creator.id == this.userId) {
      this.activeOwner = true
    }
    else {

    }
  },
  components: {
    Delete,
    AddAndUpateTask,
  },
};
</script>

<template>
  <v-card
    @click="GoToTaskDeitals"
    class="bg-white p-5 rounded-md shadow hover:shadow-lg transition pa-4"
  >
    <h3 class="text-xl font-semibold py-3">{{ TaskProps.name }}</h3>
    <p class="text-blue-grey-darken-1 py-5 h-100 text-body-2 text-truncate">
      {{ TaskProps.description }}
    </p>
    <div class="d-flex justify-space-between py-3">
        <p class="text-blue-grey-darken-3 mb-3">
          <v-icon icon="mdi-account-multiple-outline"></v-icon
          >{{ " " + ForWhoThisTask }}
        </p>
      <p class="text-blue-grey-darken-3 mb-3">
        <v-icon icon="mdi-calendar-clock-outline"></v-icon
        >{{ EndDate }}
      </p>
    </div>
    <v-card-actions class="justify-center">
      <v-btn @click.stop="activeEdit" v-if="activeOwner" class="bg-warning w-50">{{ $t("ProjectTasks.edit") }}</v-btn>
      <v-btn @click.stop="activeDelete" v-if="activeOwner" class="bg-red-accent-4 w-50">{{ $t("ProjectTasks.delete") }}</v-btn>
    </v-card-actions>
    <Delete
      v-model="activeDialogDelete"
      @me="deleteClose"
      :TaskId="TaskProps.id"
      :ProjectId="ProjectID"
      :Name="TaskProps.name"
      POT="Task"
    ></Delete>
    <AddAndUpateTask
      v-model="activeDialogEdit" 
      @close="handleClose"
      :TaskId="this.TaskProps.id"
      :ProjectID="ProjectID"
      :ProjectDueDate="ProjectDueDate"
      :TaskName="TaskProps.name" 
      :TaskDescription="TaskProps.description" 
      :TaskSelect="TaskProps.status.name" 
      :TaskStartDate="TaskProps.startDate"
      :TaskEndDate="TaskProps.endDate">
    </AddAndUpateTask>
  </v-card>
</template>
