<script>
import { Field, Form, defineRule } from "vee-validate";
import { required, email, min } from "@vee-validate/rules";
import { useDataStore } from "@/store/post";
import { mapState, mapActions } from "pinia";
import ProjectDialog from "./ProjectDialog.vue";
import ProjectCard from "./ProjectCard.vue";

export default {
  data() {
    return {
      activeDialog: false,
    };
  },
  components: {
    ProjectDialog,
    ProjectCard,
  },
  computed: {
    ...mapState(useDataStore, ["ProjectManag"]),
  },
  methods: {
    activeProjectDialog() {
      this.activeDialog = true;
    },
  },
};
</script>

<template>
  <div class="d-flex justify-space-between align-center mb-4">
    <h1>{{ $t("projectManagement.yourProjects") }}</h1>
    <v-btn @click="activeProjectDialog" class="bg-secondary">{{ $t("projectManagement.addProject") }}</v-btn>
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
  <ProjectDialog
    v-if="activeDialog"
    :update="false"
    @close="activeDialog = false"
  ></ProjectDialog>
</template>
