<script>
import { Field, Form, defineRule } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { useDataStore } from '@/store/post'
import { mapState, mapActions } from 'pinia';
import Snackbar from './Snackbar.vue';


export default {
  props: ['TaskId','ProjectDueDate','ProjectID',"TaskName","TaskDescription","TaskSelect","TaskStartDate","TaskEndDate"],
  data() {
    return {
      visible: true,
      Invitation: {
        email: '',
        Project: '',
      },
      ProjcetId: 0,
      projectsName: [],
      userId: localStorage.getItem('userId')
    };
  },
  methods: {
    ...mapActions(useDataStore, ['SendInvitation']),
    
    async save(values) {
        this.Invitation = { ...values }
        console.log(this.Invitation);
        this.ProjcetId = (this.ProjectManag.filter(Project => Project.name == this.Invitation.Project))[0].id
        console.log('email: ', this.Invitation.email);
        console.log('ProjectId: ', this.ProjcetId);
        let sccuss = await this.SendInvitation(this.Invitation.email,this.ProjcetId)
        if(sccuss) {
            this.$emit('close','Send Invitation successfully')
        } else {
            this.$emit('close','Send Invitation Denied')
        }
        
        
    },
    GetProjects() {
            this.projectsName = this.ProjectManag.map(Project => Project.name) 
        },
  },
  async mounted() {
    await this.GetProjects()
},
  computed: {
      ...mapState(useDataStore, ['ProjectManag']),
      
  },

  components: {
    Field,
    Form,
    Snackbar,

  }
};


defineRule('required', required)
defineRule('email', email)
</script>




<template>
  <v-dialog v-model="visible" max-width="600" persistent>
    <v-card>
      <Form @submit="save">
      <v-card-title>{{ $t('ProjectTasks.addingTask') }}</v-card-title>

      <v-card-text>
        <Field class="mt-2" name="email" :rules="'required|email'" v-slot="{ field, errors }">
            <v-text-field
                class="mt-2"
                :label="$t('signUp.emailAddress')"
                :hint="$t('hint.PlsEnterUEmail')"
                hint="Like: Moazkuzez5@gmail.com"
                v-bind="field"
                density="compact"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                :error="errors.length > 0"
                :error-messages="errors"
            ></v-text-field>
        </Field>
        <Field name="Project" v-slot="{ field }">
        <v-select
            v-bind="field"
            :label="$t('ProjectTasks.TaskState')"
            :items="projectsName"
        ></v-select>
        </Field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="$emit('close')">{{$t('cancel')}}</v-btn>
        <v-btn color="secondary" text type="submit">{{$t('send')}}</v-btn>
      </v-card-actions>
      </Form>
    </v-card>
  </v-dialog>
</template>


