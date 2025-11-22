<script>
import { useDataStore } from "@/store/post";
import { mapState, mapActions } from "pinia";

export default {
    props: ['ProjectId','TaskId','Name','POT'],
    data(){
      return {
        loading: false
      }
    },
 methods: {
  ...mapActions(useDataStore, ["Projectlist","deleteProject","GetTasksByProjectId",'deleteTask']),
    async DeleteFun() {
      this.loading = true
      if(this.POT == "Project"){
        
        let sccuss= await this.deleteProject(this.ProjectId)
        if(sccuss) {
          await this.Projectlist()
          this.loading = false
          this.$emit('close','Project Delete successfully')
        } else {
          this.loading = false
          this.$emit('close','Project Delete Deined')
        }
      }
      else {
        
        let sccuss= await this.deleteTask(this.TaskId)
        if(sccuss) {
          await this.GetTasksByProjectId(this.ProjectId)
          
          this.loading = false
          this.$emit('close','Task Delete successfully')
          
        } else {
          this.loading = false
          this.$emit('close','Task Delete Deined')
        }
      }
    },
 },
 computed: {
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
        <v-btn color="primary" text @click="$emit('closeWithoutUpdate')">Cancel</v-btn>
        <v-btn @click="DeleteFun" color="red" text :loading="loading" variant="text">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>