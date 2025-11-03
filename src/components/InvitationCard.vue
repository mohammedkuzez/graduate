<script>
import { RouterLink } from "vue-router";
import { mapState, mapActions } from 'pinia';
import { useDataStore } from '@/store/post'
import Delete from "./Delete.vue";
import AddAndUpateProject from "./AddAndUpateProject.vue";
export default {
  props: ['ProjectProps'],
  emits: ['UpdateMessage', 'DeleteMessage'],
  data() {
    return {
      activeDialogDelete: false,
      activeDialogEdit: false,
      activeOwner: false
    };
  },
  methods: {
    ...mapActions(useDataStore, ['AccesptInvitation','GetInvitations','RejectInvitation']),
    async activeDelete() {
        await this.RejectInvitation(this.ProjectProps.id)
        await this.GetInvitations()
        this.$emit('DeleteMessage', 'Your Reject Send successfully')
    },
    async activeEdit() {
      await this.AccesptInvitation(this.ProjectProps.id)
      await this.GetInvitations()
      console.log(this.ProjectProps);
      this.$emit('UpdateMessage', 'Your Accespt Send successfully')
    },
    handleClose(message) {
      this.activeDialogEdit = false

    },
    deleteClose(message) {
      this.activeDialogDelete = false 
      console.log('ProjectCard: ' , message);
      
    }
  },
  computed: {
    ...mapState(useDataStore, ['userId']),
    NOPinsideProject() {
      return (this.ProjectProps.assignedUsers?.length || 0) + 1;
    },
    CorrcetDate() {
      return new Date(this.ProjectProps.createdAt).toLocaleDateString();
    },
  },
  mounted() {
  },
  components: {
    Delete,
    AddAndUpateProject,
  },
};
</script>

<template>
  <v-card v-if="this.ProjectProps.status == 'PENDING'"
    class="bg-white p-5 rounded-md shadow hover:shadow-lg transition pa-4"
  >
    <h3 class="text-xl font-semibold py-3 text-truncate">{{ $t('projectManagement.projectName') + ': ' + ProjectProps.project.name }}</h3>
    <p class="text-blue-grey-darken-1 py-5 h-100 text-body-2 text-truncate">
      {{ $t('projectManagement.description') + ': ' + ProjectProps.project.description }}
    </p>
    <p class="text-blue-grey-darken-1 h-100 text-body-2 text-truncate">
      {{ $t('Invitation.senderName') + ': ' + ProjectProps.sender.name }}
    </p>
    <p class="text-blue-grey-darken-1 py-5 h-100 text-body-2 text-truncate">
      {{ $t('Invitation.senderEmail') + ': ' + ProjectProps.sender.email }}
    </p>
    <p class="text-blue-grey-darken-3 mb-3">
        {{ $t('Invitation.senderEmail') + ': ' + CorrcetDate }}<v-icon icon="mdi-calendar-clock-outline"></v-icon>
    </p>

    <v-card-actions class="justify-center">
      <v-btn @click="activeEdit" class="bg-warning w-50">{{ $t("accept") }}</v-btn>
      <v-btn @click="activeDelete" class="bg-red-accent-4 w-50">{{ $t("reject") }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
