      
      <script>
      import { Field, Form, defineRule } from 'vee-validate'
      import { required, email, min } from '@vee-validate/rules'
      import { useDataStore } from '@/store/post'
      import { useAuthStore } from '@/store/auth'
      import { mapState, mapActions } from 'pinia';
      
      export default {
        components: {
          Form,
          Field 
        },
        data() {
          return {
            showPassword: false,
            getProject: {
              Account: '',
              Password: '',
            },
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
          ...mapActions(useAuthStore, ['login']),
          
          togglePassword() {
            this.showPassword = !this.showPassword
          },
          async onSubmit(values) {
            this.getProject = { ...values }
            await this.getLogin()
          },
          async getLogin() {

            const success = await this.login(this.getProject.Account, this.getProject.Password)

            if (success) {
              this.$router.push("/Home")
            } else {
              alert("Login failed")
            }
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
      defineRule('min', min)
      
      defineRule('LogstrongPassword', function(value) {
        if (!value) return 'Password is required'
        if (value.length < 8) return 'Must be at least 8 characters'
        if (!/[A-Z]/.test(value)) return 'Must include an uppercase letter'
        if (!/[a-z]/.test(value)) return 'Must include a lowercase letter'
        if (!/[0-9]/.test(value)) return 'Must include a number'
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
    <Form @submit="onSubmit">
      <div class="text-subtitle-1 text-medium-emphasis">{{ $t('signUp.account') }}</div>
        <Field name="Account" :rules="'required|email'" v-slot="{ field, errors }">
      <v-text-field
        v-bind="field"
        density="compact"
        :placeholder="$t('signUp.emailAddress')"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        :error="errors.length > 0"
        :error-messages="errors"
      ></v-text-field>
        </Field>
      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">{{ $t('signUp.password') }}
        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          {{ $t('signUp.forgotPassword') }}</a>
      </div>
      <Field name="Password" :rules="'required|LogstrongPassword'" v-slot="{ field, errors }">
      <v-text-field
        v-bind="field"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'"
        density="compact"
        :placeholder="$t('signUp.password')"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="togglePassword"
        :error="errors.length > 0"
        :error-messages="errors"
      ></v-text-field>
        </Field>

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
        type="submit"
      >
        {{ $t('signUp.logIn') }}
      </v-btn>
      </Form>
      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="/"
          rel="noopener noreferrer"
          target="_blank"
        >
          {{ $t('signUp.signUpNow') }} <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
  </v-container>
</template>


