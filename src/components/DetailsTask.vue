<script>
import { Field, Form, defineRule } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { useDataStore } from '@/store/post'
import { mapState, mapActions } from 'pinia';
import Snackbar from './Snackbar.vue';


export default {
  props: ['TaskProps'],
  data() {
    return {
        visible: true,
    };
  },
  methods: {
  },
  async mounted() {

},
  computed: {

      
  },

  components: {


  }
};

</script>




<template>
  <v-dialog v-model="visible" max-width="600" persistent>
    <v-card>
      <!-- Card Title -->
      <v-card-title class="headline grey lighten-2" >
        {{ TaskProps.name }}
      </v-card-title>

      <v-card-text>
        <!-- Project Name -->
        <v-row class="mb-2">
          <v-col cols="4" class="font-weight-medium">
            Project:
          </v-col>
          <v-col cols="8">
            {{ TaskProps.project.name }}
          </v-col>
        </v-row>

        <!-- Description -->
        <v-row class="mb-2">
          <v-col cols="4" class="font-weight-medium">
            Description:
          </v-col>
          <v-col cols="8">
            {{ TaskProps.description }}
          </v-col>
        </v-row>

        <!-- Creator -->
        <v-row class="mb-2">
          <v-col cols="4" class="font-weight-medium">
            Creator:
          </v-col>
          <v-col cols="8">
            {{ TaskProps.creator.name }}
          </v-col>
        </v-row>

        <!-- Status -->
        <v-row class="mb-2">
          <v-col cols="4" class="font-weight-medium">
            Status:
          </v-col>
          <v-col cols="8">
            {{ TaskProps.status.name }}
          </v-col>
        </v-row>

        <!-- Dates -->
        <v-row class="mb-2">
          <v-col cols="4" class="font-weight-medium">
            Start Date:
          </v-col>
          <v-col cols="8">
            {{ TaskProps.startDate }}
          </v-col>
        </v-row>

        <v-row class="mb-2">
          <v-col cols="4" class="font-weight-medium">
            End Date:
          </v-col>
          <v-col cols="8">
            {{ TaskProps.endDate }}
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <!-- Actions -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="$emit('close')">
          {{$t('cancel')}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

