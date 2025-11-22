<script>
import { Field, Form, defineRule } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { useDataStore } from '@/store/post'
import { mapState, mapActions } from 'pinia';
import Snackbar from '../Genral/Snackbar.vue';


export default {
  props: ['ProjectId', 'ProjectName', 'ProjectDescription', 'ProjectDate'],
  data() {
    return {
      visible: true,
      Project: {
        name: '',
        description: '',
        state: false,
        dueDate: '',
      },
      loading: false,
      currentDate: new Date().toISOString().split('T')[0],
      ActiveOrINAtive: 'Inactive',
    };
  },
  methods: {
    ...mapActions(useDataStore, ["Projectlist",'createProject','updateProject']),

    async save(values) {
      this.loading = true
      this.Project = { ...values, state: this.Project.state }
      
      if(this.ProjectName){
        console.log(this.ProjectId);
        await this.updateProject(this.ProjectId,this.Project.name,this.Project.description,this.Project.dueDate)
        await this.Projectlist()
        this.loading = false
        this.$emit('close','Project Update successfully')
        
      }
      else {
        await this.createProject(this.Project.name,this.Project.description,this.Project.dueDate)
        await this.Projectlist()
        this.loading = false
          this.$emit('close','Project Add successfully')
        }
      },
      switchactive() {
        this.Project.state = !this.Project.state
        this.ActiveOrINAtive = this.Project.state? 'Active' : 'Inactive'
      },
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
defineRule('ProjectName', function(value) {
  if (value.length < 3) return 'Must be at least 3 characters'
  if (value.length > 50 ) return 'Must be less then 50 characters'
  return true
})
defineRule('ProjectDescription', function(value) {
  if (value.length < 10) return 'Must be at least 10 characters'
  if (value.length > 500 ) return 'Must be less then 500 characters'
  return true
})
defineRule('FutureDate', function(value, [today]) {
  const selectedDate = new Date(value)
  const todayDate = new Date(today);
  if (selectedDate < todayDate) return `The Date Must be today or in Future`
  return true
})
</script>




<template>
  <v-dialog v-model="visible" max-width="600" persistent>
    <v-card>
      <Form @submit="save">
      <v-card-title class="text-body-1 text-md-h3">{{ $t('projectManagement.addingProject') }}</v-card-title>

      <v-card-text>
        <Field name="name" :rules="'required|ProjectName'" v-slot="{ field, errors }" :value="ProjectName">
        <v-text-field
        :hint="$t('hint.PlsEnterProjectName')" 
        class="pb-3"
        :label="$t('projectManagement.projectName')" 
        v-bind="field"
        density="prominent"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        :error="errors.length > 0"
        :error-messages="errors"/>
        </Field>
        <Field name="description" :rules="'required|ProjectDescription'" v-slot="{ field, errors }" :value="ProjectDescription">
        <v-text-field
        :hint="$t('hint.PlsEnterProjectdescription')"
        class="pb-3"
        :label="$t('projectManagement.description')"
        v-bind="field"
        density="prominent"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        :error="errors.length > 0"
        :error-messages="errors"/>
        </Field>
        <Field name="state" v-slot="{ field }">
          <v-switch color="secondary" v-model="field.value" @update:model-value="field.onChange" :label="field.value ? $t('AddAndUpateProject.active') : $t('AddAndUpateProject.inactive')"></v-switch>
        </Field>
        <Field name="dueDate" :rules="`required|FutureDate:${this.currentDate}`" v-slot="{ field, errors }" :value="ProjectDate">
        <v-text-field
        :hint="$t('hint.PlsEnterProjectdate')"
        :label="$t('projectManagement.date')"
        type="Date"
        v-bind="field"
        density="prominent"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        :error="errors.length > 0"
        :error-messages="errors"/>
        </Field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="$emit('closeWithoutUpdate')">{{$t('cancel')}}</v-btn>
        <v-btn color="secondary" text type="submit" :loading="loading" variant="text">{{$t('save')}}</v-btn>
      </v-card-actions>
      </Form>
    </v-card>
  </v-dialog>
</template>


