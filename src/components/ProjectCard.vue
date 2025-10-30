<script>
import { RouterLink } from "vue-router";
import Delete from "./Delete.vue";
import AddAndUpateProject from "./AddAndUpateProject.vue";
export default {
  props: ["ProjectProps"],
  data() {
    return {
      activeDialogDelete: false,
      activeDialogEdit: false,
    };
  },
  methods: {
    activeDelete() {
      this.activeDialogDelete = true;
    },
    activeEdit() {
      this.activeDialogEdit = true
    },
    GoToTasks() {
      this.$router.push(`/Home/${this.ProjectProps.id}`);
    },
  },
  computed: {
    NOPinsideProject() {
      return (this.ProjectProps.assignedUsers?.length || 0) + 1;
    },
    CorrcetDate() {
      return new Date(this.ProjectProps.dueDate).toLocaleDateString();
    },
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
    <h3 class="text-xl font-semibold py-3">{{ ProjectProps.name }}</h3>
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
      <v-btn @click.stop="activeEdit" class="bg-warning w-50">{{ $t("projectManagement.edit") }}</v-btn>
      <v-btn @click.stop="activeDelete" class="bg-red-accent-4 w-50">{{ $t("projectManagement.delete") }}</v-btn>
    </v-card-actions>
    <Delete
      v-model="activeDialogDelete"
      @close="activeDialogDelete = false"
      :Name="ProjectProps.name"
      POT="Project"
    ></Delete>
    <AddAndUpateProject v-model="activeDialogEdit" @close="activeDialogEdit = false" :ProjectName="ProjectProps.name" :ProjectDescription="ProjectProps.description" :ProjectDate="ProjectProps.dueDate"></AddAndUpateProject>
  </v-card>
</template>
