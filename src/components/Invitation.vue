<script>
import { Field, Form, defineRule } from "vee-validate";
import { required, email, min } from "@vee-validate/rules";
import { useDataStore } from "@/store/post";
import { mapState, mapActions } from "pinia";
import AddInvitation from "./AddInvitation.vue";
import ProjectCard from "./ProjectCard.vue";
import Snackbar from "./Snackbar.vue";
import InvitationCard from "./InvitationCard.vue";

export default {
  data() {
    return {
      activeDialog: false,
      Snackbar: false,
      SnackbUpdate: false,
      message: '',
      allInvitations: [],
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
      await this.Projectlist()
      this.allInvitations = await this.GetInvitations()

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
      <v-col
        v-for="Invitation in getInvitations"
        :key="Invitation.id"
        cols="12"
        sm="6"
        md="4"
      >
        <InvitationCard :ProjectProps="Invitation" @UpdateMessage="SnackbarUpdate" @DeleteMessage="SnackbarDelete" />
      </v-col>
    </v-row>
  </v-container>
  <AddInvitation
    v-if="activeDialog"
    :update="false"
    @close="handleClose"
  ></AddInvitation>
    <template><Snackbar v-if="message" v-model="Snackbar" :Message="message"></Snackbar></template>
</template>
