<script>
import { mapState, mapActions } from "pinia";
import { useDataStore } from "@/store/post";
import TaskCard from "./TaskCard.vue";
import AddAndUpateTask from "./AddAndUpateTask.vue";
import Snackbar from "./Snackbar.vue";
import draggable from "vuedraggable";

export default {
  components: { TaskCard, AddAndUpateTask, Snackbar, draggable },
  data() {
    return {
      Projectid: localStorage.getItem("ProjectId"),
      ProjectName: "",
      activeAddingTask: false,
      Snackbar: false,
      message: "",
      loader: false,
      board: {
        1: [],
        2: [],
        3: [],
        4: [],
      },
      columns: [
        { id: 1, title: "To Do" },
        { id: 2, title: "In Progress" },
        { id: 3, title: "Review" },
        { id: 4, title: "Done" },
      ],
    };
  },
  computed: {
    ...mapState(useDataStore, ["GetTasksProject", "ProjectDate"]),
  },
  methods: {
    ...mapActions(useDataStore, ["GetTasksByProjectId", "GetProjectById", "updateTask","updateStatus"]),

    async GetData() {
      this.loader = true;
      await this.GetTasksByProjectId(this.Projectid);
      await this.GetProjectById(this.Projectid);
      console.log('GetTasksProject2:', this.GetTasksProject);
      
      if (this.GetTasksProject && this.GetTasksProject.length > 0) {
        this.ProjectName = this.GetTasksProject[0].project?.name || "Unnamed Project";
        
        
        this.board[1] = this.GetTasksProject.filter((Task) => Task.status.name === "To Do");
        this.board[2] = this.GetTasksProject.filter((Task) => Task.status.name === "In Progress");
        this.board[3] = this.GetTasksProject.filter((Task) => Task.status.name === "Review");
        this.board[4] = this.GetTasksProject.filter((Task) => Task.status.name === "Done");
        console.log('board[1]:', this.board[1]);
        console.log('board[2]:', this.board[2]);
        console.log('board[3]:', this.board[3]);
        console.log('board[4]:', this.board[4]);
        this.loader = false;
      }
    },

    handleClose(message) {
      console.log('this is from this.handleClose');
      
      this.activeAddingTask = false;
      this.Snackbar = true;
      this.message = message;
      this.GetData();
    },

    SnackbarUpdate(message) {
      this.Snackbar = true;
      this.message = message;
      this.GetData();
    },

    SnackbarDelete(message) {
      this.Snackbar = true;
      this.message = message;
      this.GetData();
    },

async onMove(evt, newColumnId) {
  if (!evt) return;

  let movedTask;
  if (evt.moved) movedTask = evt.moved.element;
  else if (evt.added) movedTask = evt.added.element;
  else return;

  const newStatusId = this.columns.find(col => col.id === newColumnId).id;


  console.log("Task", movedTask.id, "new status:", newStatusId);

  
  await this.updateTask(
    movedTask.id,
    movedTask.name,
    movedTask.description,
    movedTask.startDate,
    movedTask.endDate,
    movedTask.userId || Number(localStorage.getItem('userId')),
    newStatusId
  );

  await this.GetData();
}

  },
  async mounted() {
    await this.GetData();
  },
};
</script>

<template>
  <div class="d-flex justify-space-between align-center mb-4">
    <h1>{{ ProjectName + " " + $t("ProjectTasks.Project") }}</h1>
    <v-btn @click="activeAddingTask = true" class="bg-secondary">{{$t("ProjectTasks.NewTask")}}</v-btn>
  </div>
    
 <v-container fluid class="pa-0">
      <v-row class="flex-wrap">
        <v-col
          v-for="col in columns"
          :key="col.id"
          class="flex-shrink-0 "
          xs="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          
        >
          <v-card class="pa-3 bg-blue-grey-lighten-2" elevation="3" rounded="lg">
            <h3 class="text-center text-subtitle-1 font-medium mb-4">{{ col.title }}</h3>
                <template v-if="loader">
                  <v-skeleton-loader
                    v-for="i in 3"
                    :key="i"
                    type="list-item-two-line"
                    class="mb-3"
                  />
                </template>
                <template v-else>
            <draggable 
              v-model="board[col.id]"
              group="tasks"
              item-key="id"
              animation="200"
              @change="(evt) => onMove(evt, col.id)"
              :fallbackOnBody="true"
              :emptyInsertThreshold="5"
            >
              <template #item="{ element }">
                <TaskCard
                  class="mt-5"
                  :TaskProps="element"
                  :ProjectID="Projectid"
                  :ProjectDueDate="ProjectDate"
                  @UpdateMessage="SnackbarUpdate"
                  @DeleteMessage="SnackbarDelete"
                />
              </template>

              <template #footer>
                <v-sheet
                  v-if="board[col.id].length === 0"
                  class="d-flex justify-center align-center py-12"
                  color="grey lighten-4"
                  rounded="lg"
                  elevation="0"
                  outlined
                >
                  {{ $t("ProjectTasks.DropHere") }}
                </v-sheet>
              </template>
            </draggable>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-container>



  <AddAndUpateTask v-model="activeAddingTask" :ProjectID="this.Projectid" :ProjectDueDate="this.ProjectDate" @close="handleClose"></AddAndUpateTask>
  <template><Snackbar v-if="message" v-model="Snackbar" @close="Snackbar = false" :Message="message"></Snackbar></template>
</template>

