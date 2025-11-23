<script>
// ... (your existing script block remains the same)
import { useTheme } from 'vuetify'

export default {
    data: () => ({
        drawer: true,
        theme: useTheme(),

    }),
    
    computed: {
        items() {
        return [
            { text: this.$t('home.projectManagement'), icon: 'mdi-account-multiple', link: '/Home/Project_Management' },
            { text: this.$t('home.dashboard'), icon: 'mdi-account-multiple', link: '/Home/Dashboard' },
            { text: this.$t('home.invitation'), icon: 'mdi-account-multiple', link: '/Home/Invitation' },
    ]},
        nextTheme() {
            return this.theme.name === 'light' ? 'dark' : 'light'
        },
        nextLang() {
            return this.$i18n.locale === 'en' ? 'ar' : 'en'
        }
    },

    methods: {
        changeTheme() {
            localStorage.setItem('theme', this.nextTheme)
            this.theme.change(this.nextTheme)
        },
        changeLang() {
            localStorage.setItem('lang', this.nextLang)
            this.$i18n.locale = this.nextLang
        },
        GoTO() {
            this.$router.push("/MTR/Project_Management")
        },
    }
}
</script>

<template>
    <v-app id="inspire">
        <!-- ... (your existing v-app-bar code) ... -->
        <v-app-bar elevation="5">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    
            <v-app-bar-title>{{ $t('home.mainTitle') }}</v-app-bar-title>
    
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props">
                        <v-icon icon="mdi-dots-vertical"></v-icon>
                    </v-btn>
                </template>
    
                <v-list>
                    <v-list-item @click="changeTheme">
                        Change Theme to {{ nextTheme }}
                    </v-list-item>
    
                    <v-list-item @click="changeLang">
                        Change Language to {{ nextLang }}
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

    <v-img
      height="500"
      src="@/assets/img/Home-Project-Management.jpg"
      cover
    >
      <!-- Option 1: Use a transparent color overlay instead of just brightness filter -->
      <!-- This approach is generally more reliable across different browsers than backdrop-filter -->
      <div
        class="d-flex flex-column align-center justify-center text-center pa-4"
        style="height: 100%; background-color: rgba(0, 0, 0, 0.65);" 
      >
        <!-- Change text color to 'white' or 'primary' for better contrast -->
        <h2 class="text-h4 font-weight-bold text-white mb-6"> 
          It's easy, simple, and gets the job done —
          let us help you make your dream come true,
          because that's who we are: <strong>"MTR"</strong> — Make It Really
        </h2>

        <v-btn @click="GoTO" size="large" color="secondary">
          Get Started
        </v-btn>
      </div>
    </v-img>
    </v-app>
</template>
