<script>
import { Field, Form, defineRule } from "vee-validate";
import { required, email, min } from "@vee-validate/rules";
import { useDataStore } from "@/store/post";
import { mapState, mapActions } from "pinia";
import AddAndUpateProject from "./AddAndUpateProject.vue";
import ProjectCard from "./ProjectCard.vue";
import Snackbar from "../Genral/Snackbar.vue";

export default {
  data() {
    return {
      activeDialog: false,
      Snackbar: false,
      SnackbUpdate: false,
      message: "",
      loader: false,
    };
  },
  components: {
    AddAndUpateProject,
    ProjectCard,
    Snackbar,
  },
  computed: {
    ...mapState(useDataStore, ["ProjectManag"]),
  },
  methods: {
    ...mapActions(useDataStore, ["Projectlist"]),
    handleClose(message) {
      console.log("massage: ", message);
      this.activeDialog = false;
      this.Snackbar = true;
      this.message = message;
    },
    SnackbarUpdate(message) {
      console.log("massage: ", message);
      this.Snackbar = true;
      this.message = message;
    },
    SnackbarDelete(message) {
      console.log("massage: ", message);
      console.log("ProjectManagement: ", message);
      this.Snackbar = true;
      this.message = message;
    },
    async fun() {
      this.loader = true;
      await this.Projectlist();
      this.loader = false;
    },
  },
  async mounted() {
    await this.fun();
  },
};
</script>

<template>
  <div class="d-flex justify-space-between align-center mb-4">
    <h1>{{ $t("projectManagement.yourProjects") }}</h1>
    <v-btn @click="activeDialog = true" class="bg-secondary">{{
      $t("projectManagement.addProject")
    }}</v-btn>
  </div>
  <v-container fluid>
    <v-row>
      <template v-if="loader">
        <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
          <v-skeleton-loader
            type="card"
            elevation="5"
            color="blue-grey-lighten-1"
          />
        </v-col>
      </template>

      <template v-else>
        <v-col
          v-for="project in ProjectManag"
          :key="project.id || project.name"
          cols="12"
          sm="6"
          md="4"
        >
          <ProjectCard
            :ProjectProps="project"
            @UpdateMessage="SnackbarUpdate"
            @DeleteMessage="SnackbarDelete"
          />
        </v-col>
      </template>
    </v-row>
  </v-container>
  <AddAndUpateProject
    v-if="activeDialog"
    :update="false"
    @close="handleClose"
  ></AddAndUpateProject>
  <template
    ><Snackbar v-if="message" v-model="Snackbar" :Message="message"></Snackbar
  ></template>
</template>
