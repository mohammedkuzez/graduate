<script>
import { Field, Form, defineRule } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import { useDataStore } from '@/store/post'
import { mapState, mapActions } from 'pinia';

export default {
  components: {
    Form,
    Field 
  },
  data() {
    return {
      showPassword: false,
      ConfirmPassword: false,
    }
  },
  mounted() {
    defineRule('uniqueEmail', (value) => {
      if (!value) return true
      const exists = this.users.find(user => user.email.toLowerCase() === value.toLowerCase())
      return exists ? 'This email is already taken' : true
    })
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    ConfirmtogglePassword() {
      this.ConfirmPassword = !this.ConfirmPassword
    },
    onSubmit(values) {
      alert('Form Submitted:\n' + JSON.stringify(values, null, 2))
    },
  },
  computed: {
    ...mapState(useDataStore, ['users']),
  },

}

// -----------------------------------
// تعريف حقول تحقق غير موجودة بالمكتبة 
defineRule('required', required)
defineRule('email', email)

defineRule('strongPassword', function(value) {
  if (!value) return 'Password is required'
  if (value.length < 8) return 'Must be at least 8 characters'
  if (!/[A-Z]/.test(value)) return 'Must include an uppercase letter'
  if (!/[a-z]/.test(value)) return 'Must include a lowercase letter'
  if (!/[0-9]/.test(value)) return 'Must include a number'
  return true
})
defineRule('minName', function(value) {
  if (value.length < 3) return 'Must be at least 3 characters'
  if (/[0-9]/.test(value)) return 'Must not include a number'
  return true
})
defineRule('confirmPassword', (value, params) => {
  if (!value) return 'Confirm Password is required'
  if (value !== params.password) return 'Passwords do not match'
  return true
})
</script>



<template>
    <v-container class="py-8">
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
    <Form @submit="onSubmit" v-slot="{ values }">
        <Field class="mt-2" name="Name" :rules="'required|minName'" v-slot="{ field, errors }">
      <v-text-field
      class="mt-2"
        :label="$t('signUp.fullName')"
        :hint="$t('hint.PlsEnterUName')"
        v-bind="field"
        density="compact"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        :error="errors.length > 0"
        :error-messages="errors"
      ></v-text-field>
        </Field>

        <Field class="mt-2" name="email" :rules="'required|email|uniqueEmail'" v-slot="{ field, errors }">
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
      <Field class="mt-2" name="password" :rules="'required|strongPassword'" v-slot="{ field, errors }">
      <v-text-field
      class="mt-2"
       :label="$t('signUp.password')"
       :hint="$t('hint.PlsEnterUPassword')"
        v-bind="field"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'"
        density="compact"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="togglePassword"
        :error="errors.length > 0"
        :error-messages="errors"
      ></v-text-field>
        </Field>
      <Field class="mt-2" name="Confirm password" :rules="{ confirmPassword: { password: values.password } }" v-slot="{ field, errors }">
      <v-text-field
      class="mt-2"
       :label="$t('signUp.confirmPassword')"
       :hint="$t('hint.PlsEnterUConfrimPassword')"
        v-bind="field"
        :append-inner-icon="ConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="ConfirmPassword ? 'text' : 'password'"
        density="compact"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="ConfirmtogglePassword"
        :error="errors.length > 0"
        :error-messages="errors"
      ></v-text-field>
        </Field>

      <v-btn
        class="mb-8 mt-2"
        color="blue"
        size="large"
        variant="tonal"
        block
      >
        {{ $t('signUp.signUp') }}
      </v-btn>
      </Form>
    </v-card>
  </div>
  </v-container>
</template>



