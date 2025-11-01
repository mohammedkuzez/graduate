<script>
import { useDataStore } from "@/store/post";
import { mapState, mapActions } from "pinia";

export default {
    props: ['ProjectId','Name','POT'],
 methods: {
  ...mapActions(useDataStore, ["Projectlist","deleteProject"]),
    async DeleteFun() {
      console.log(this.ProjectId);
      
        let sccuss= await this.deleteProject(this.ProjectId)
        await this.Projectlist()
        this.$emit('close')
    },
 },
 computed: {
    ...mapState(useDataStore, ["ProjectManag"]),
 }
}

</script>

<template>
  <v-dialog v-model="visible" max-width="600" persistent>
    <v-card>
      <v-card-title class="text-red-accent-4">Delete {{ POT }}</v-card-title>

      <v-card-text>
        <div class="text-blue-grey-lighten-2">
          Are you sure you want to delete
          <span class="text-red-accent-4">{{ Name}}</span> {{ POT }}?
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('close')">Cancel</v-btn>
        <v-btn @click="DeleteFun" color="red" text>Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>