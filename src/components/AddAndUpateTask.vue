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
      Task: {
        name: '',
        description: '',
        state: '',
        startDate: '',
        endDate: '',
      },
      selectNumber: 0,
      defaultselect: 'To Do',
      selectedTask: this.TaskSelect || 'To Do',
      currentDate: new Date().toISOString().split('T')[0],
      ActiveOrINAtive: 'Inactive',
      userId: localStorage.getItem('userId')
    };
  },
  methods: {
    ...mapActions(useDataStore, ['createTask','GetTasksByProjectId','updateTask']),

    async save(values) {

        
        this.Task = { ...values, state: this.selectedTask }
        
        this.selectNumber = this.FindSelect()
        if(this.TaskName){
          await this.updateTask(this.TaskId,this.Task.name,this.Task.description,this.Task.startDate,this.Task.endDate,Number(this.userId),this.selectNumber)
          await this.GetTasksByProjectId(this.ProjectID)
          this.$emit('update:modelValue', false);
          this.$emit('close','Task update successfully')
          
        }
        else {
            console.log(this.selectedTask);
            console.log(this.Task.state);
            console.log(this.selectNumber);
            
            await this.createTask(this.Task.name,this.Task.description,this.Task.startDate,this.Task.endDate,Number(this.ProjectID),Number(this.userId),this.selectNumber)
            await this.GetTasksByProjectId(this.ProjectID)
            this.$emit('update:modelValue', false);
            this.$emit('close','Task add successfully')
        }
      },
      FindSelect() {
        if(this.Task.state == "To Do") {return 1}
        else if(this.Task.state == "In Progress"){ return 2}
        else if(this.Task.state == "In Review") {return 3}
        else if(this.Task.state == "Done") {return 4}
      },
  },
  computed: {

  },

  components: {
    Field,
    Form,
    Snackbar,

  }
};


defineRule('required', required)
defineRule('email', email)
defineRule('TaskName', function(value) {
  if (value.length < 3) return 'Must be at least 3 characters'
  if (value.length > 100 ) return 'Must be less then 100 characters'
  return true
})
defineRule('TaskDescription', function(value) {
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
defineRule('EndCrossStart', function(value, [startDate]) {
  const selectedDate = new Date(value)
  const TaskStartDate = new Date(startDate);
  if (selectedDate < TaskStartDate) return `The End Date Must Not Cross the Start Date`
  return true
})
defineRule('NotCrossProjectDate', function(value, [ProjectDue]) {
  const selectedDate = new Date(value)
  const ProjectDueDate = new Date(ProjectDue);
  if (selectedDate > ProjectDueDate) return `The Date Must Not Cross Project End Date`
  return true
})
</script>




<template>
  <v-dialog v-model="visible" max-width="600" persistent>
    <v-card>
      <Form @submit="save">
      <v-card-title>{{ $t('ProjectTasks.addingTask') }}</v-card-title>

      <v-card-text>
        <Field name="name" :rules="'required|TaskName'" v-slot="{ field, errors }" :value="TaskName">
        <v-text-field
        :hint="$t('hint.PlsEnterTaskName')" 
        class="pb-3"
        :label="$t('ProjectTasks.TaskName')" 
        v-bind="field"
        density="prominent"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        :error="errors.length > 0"
        :error-messages="errors"/>
        </Field>
        <Field name="description" :rules="'required|TaskDescription'" v-slot="{ field, errors }" :value="TaskDescription">
        <v-text-field
        :hint="$t('hint.PlsEnterTaskdescription')"
        class="pb-3"
        :label="$t('ProjectTasks.description')"
        v-bind="field"
        density="prominent"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        :error="errors.length > 0"
        :error-messages="errors"/>
        </Field>
        <Field name="state">
        <v-select
            v-model="selectedTask" 
            :label="$t('ProjectTasks.TaskState')"
            :items="['To DO', 'In Progress', 'In Review', 'Done']"
        ></v-select>
        </Field>
        <Field 
        name="startDate" 
        :rules="`required|FutureDate:${this.currentDate}|NotCrossProjectDate:${this.ProjectDueDate}`" 
        v-slot="{ field, errors }" 
        :value="TaskStartDate">
        <v-text-field
        :hint="$t('hint.PlsEnterTaskStartDate')"
        :label="$t('ProjectTasks.TaskStartDate')"
        type="Date"
        v-bind="field"
        density="prominent"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        :error="errors.length > 0"
        :error-messages="errors"/>
        </Field>
        <Field 
        name="endDate" 
        :rules="`required|FutureDate:${this.currentDate}|NotCrossProjectDate:${this.ProjectDueDate}|EndCrossStart:@startDate`" 
        v-slot="{ field, errors }" 
        :value="TaskEndDate">
        <v-text-field
        :hint="$t('hint.PlsEnterTaskDueDate')"
        :label="$t('ProjectTasks.TaskDueDate')"
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
        <v-btn color="error" text @click="$emit('close')">{{$t('cancel')}}</v-btn>
        <v-btn color="secondary" text type="submit">{{$t('save')}}</v-btn>
      </v-card-actions>
      </Form>
    </v-card>
  </v-dialog>
</template>


