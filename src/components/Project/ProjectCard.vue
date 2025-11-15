<script>
import { RouterLink } from "vue-router";
import { mapState, mapActions } from "pinia";
import { useDataStore } from "@/store/post";
import Delete from "../Genral/Delete.vue";
import AddAndUpateProject from "./AddAndUpateProject.vue";
export default {
  props: ["ProjectProps"],
  emits: ["UpdateMessage", "DeleteMessage"],
  data() {
    return {
      activeDialogDelete: false,
      activeDialogEdit: false,
      activeOwner: false,
    };
  },
  methods: {
    ...mapActions(useDataStore, ["GetProjectName"]),
    activeDelete() {
      this.activeDialogDelete = true;
    },
    activeEdit() {
      this.activeDialogEdit = true;
      console.log(this.ProjectProps);
    },
    GoToTasks() {
      localStorage.setItem("ProjectId", this.ProjectProps.id);
      this.$router.push(`/Home/${this.ProjectProps.id}`);
    },
    handleClose(message) {
      this.activeDialogEdit = false;
      this.$emit("UpdateMessage", message);
    },
    deleteClose(message) {
      this.activeDialogDelete = false;
      console.log("ProjectCard: ", message);
      this.$emit("DeleteMessage", message);
    },
  },
  computed: {
    ...mapState(useDataStore, ["userId"]),
    NOPinsideProject() {
      return (this.ProjectProps.assignedUsers?.length || 0) + 1;
    },
    CorrcetDate() {
      return new Date(this.ProjectProps.dueDate).toLocaleDateString();
    },
  },
  mounted() {
    if (this.ProjectProps.creator.id == this.userId) {
      this.activeOwner = true;
    } else {
    }
  },
  components: {
    Delete,
    AddAndUpateProject,
  },
};
</script>

<template>
  <v-card
    @click="GoToTasks"
    class="bg-white p-5 rounded-md shadow hover:shadow-lg transition pa-4"
  >
    <h3 class="text-xl font-semibold py-3 text-truncate">
      {{ ProjectProps.name }}
    </h3>
    <p class="text-blue-grey-darken-1 py-5 h-100 text-body-2 text-truncate">
      {{ ProjectProps.description }}
    </p>
    <div class="d-flex justify-space-between py-3">
      <p class="text-blue-grey-darken-3 mb-3">
        <v-icon icon="mdi-calendar-clock-outline"></v-icon
        >{{ " " + CorrcetDate }}
      </p>
      <p class="text-blue-grey-darken-3 mb-3">
        <v-icon icon="mdi-account-multiple-outline"></v-icon
        >{{ " " + NOPinsideProject }}
      </p>
    </div>
    <v-card-actions class="justify-center">
      <v-btn
        @click.stop="activeEdit"
        v-if="activeOwner"
        class="bg-warning w-50"
        >{{ $t("projectManagement.edit") }}</v-btn
      >
      <v-btn
        @click.stop="activeDelete"
        v-if="activeOwner"
        class="bg-red-accent-4 w-50"
        >{{ $t("projectManagement.delete") }}</v-btn
      >
    </v-card-actions>
    <Delete
      v-model="activeDialogDelete"
      @close="deleteClose"
      :ProjectId="ProjectProps.id"
      :Name="ProjectProps.name"
      POT="Project"
    ></Delete>
    <AddAndUpateProject
      v-model="activeDialogEdit"
      @close="handleClose"
      :ProjectId="ProjectProps.id"
      :ProjectName="ProjectProps.name"
      :ProjectDescription="ProjectProps.description"
      :ProjectDate="ProjectProps.dueDate"
    >
    </AddAndUpateProject>
  </v-card>
</template>
