<script>
import { Field, Form, defineRule } from "vee-validate";
import { required, email, min } from "@vee-validate/rules";
import { useDataStore } from "@/store/post";
import { mapState, mapActions } from "pinia";
import AddInvitation from "./AddInvitation.vue";
import ProjectCard from "../Project/ProjectCard.vue";
import Snackbar from "../Genral/Snackbar.vue";
import InvitationCard from "./InvitationCard.vue";

export default {
  data() {
    return {
      activeDialog: false,
      Snackbar: false,
      SnackbUpdate: false,
      message: '',
      allInvitations: [],
      PENDING: [],
      loader: false,
    };
  },
  components: {
    AddInvitation,
    ProjectCard,
    Snackbar,
    InvitationCard
  },
  computed: {
    ...mapState(useDataStore, ["getInvitations"]),
  },
  methods: {
    ...mapActions(useDataStore, ["Projectlist","GetInvitations"]),
    handleClose(message) {
      console.log('massage: ',message);
      this.activeDialog = false
      this.Snackbar = true
      this.message = message
    },
    SnackbarUpdate(message) {
      console.log('massage: ',message);
      this.Snackbar = true
      this.message = message
    },
    SnackbarDelete(message) {
      console.log('massage: ',message);
      console.log('ProjectManagement: ' , message);
      this.Snackbar = true
      this.message = message
    },
    async GetInvitationsfun() {
      this.loader = true
      
      await this.Projectlist()
      await this.GetInvitations()
      this.loader = false
      
    
    }

  },
  async mounted() {
    await this.GetInvitationsfun()
  }
};
</script>

<template>
  <div class="d-flex justify-space-between align-center mb-4">
    <h1>{{ $t("Invitation.Invitation") }}</h1>
    <v-btn @click="activeDialog = true" class="bg-secondary">{{
      $t("Invitation.NewInvitation")
    }}</v-btn>
  </div>
  <v-container fluid>
    <v-row>
      <template v-if="loader">
        <v-col v-for="n in 9" :key="n" cols="12" sm="6" md="4">
          <v-skeleton-loader type="card" elevation="5" color="blue-grey-lighten-1" />
        </v-col>
      </template>
      <template v-else>
        <v-col
        v-for="Invitation in getInvitations"
        :key="Invitation.id"
        cols="12"
        sm="6"
        md="4"
        >
        <InvitationCard :ProjectProps="Invitation" @UpdateMessage="SnackbarUpdate" @DeleteMessage="SnackbarDelete" />
      </v-col>
    </template>
    </v-row>
  </v-container>
  <AddInvitation
    v-if="activeDialog"
    :update="false"
    @close="handleClose"
  ></AddInvitation>
    <template><Snackbar v-if="message" v-model="Snackbar" :Message="message"></Snackbar></template>
</template>
