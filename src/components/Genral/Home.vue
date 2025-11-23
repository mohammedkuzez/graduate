<script>
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
        }
    }
}
</script>



<template>
    <v-app id="inspire">
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
                        Change Theme to {{ 
                             }}
                    </v-list-item>
    
                    <v-list-item @click="changeLang">
                        Change Language to {{ nextLang }}
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-img src="../../assets/img/Home-Project-Management.jpg">
            <v-btn class="bg-secondary">
                get Start
            </v-btn>
            <v-btn>

            </v-btn>
        </v-img>
    </v-app>
</template>
