<script>
import { Field, Form, defineRule } from "vee-validate";
import { required, email, min } from "@vee-validate/rules";
import { useDataStore } from "@/store/post";
import { mapState, mapActions } from "pinia";
import AddAndUpateProject from "./AddAndUpateProject.vue";
import ProjectCard from "./ProjectCard.vue";
import Snackbar from "./Snackbar.vue";

export default {
  data() {
    return {
      activeDialog: false,
      Snackbadd: false,
      message: ''
    };
  },
  components: {
    AddAndUpateProject,
    ProjectCard,
    Snackbar
  },
  computed: {
    ...mapState(useDataStore, ["ProjectManag"]),
  },
  methods: {
    ...mapActions(useDataStore, ["Projectlist"]),
    handleClose(message) {
      this.activeDialog = false
      this.Snackbadd = true
      this.message = message
    },
    activeProjectDialog() {
      this.activeDialog = true;
    },
  },
  async mounted() {
    await this.Projectlist()
  }
};
</script>

<template>
  <div class="d-flex justify-space-between align-center mb-4">
    <h1>{{ $t("projectManagement.yourProjects") }}</h1>
    <v-btn @click="activeProjectDialog" class="bg-secondary">{{
      $t("projectManagement.addProject")
    }}</v-btn>
  </div>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="project in ProjectManag"
        :key="project.name"
        cols="12"
        sm="6"
        md="4"
      >
        <ProjectCard :ProjectProps="project" />
      </v-col>
    </v-row>
  </v-container>
  <AddAndUpateProject
    v-if="activeDialog"
    :update="false"
    @close="handleClose"
  ></AddAndUpateProject>
    <template><Snackbar v-model="Snackbadd" :Message="this.message"></Snackbar></template>
</template>
