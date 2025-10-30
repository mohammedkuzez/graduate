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
            { text: this.$t('home.taskManagement'), icon: 'mdi-account-multiple', link: '/Home/Task_Management' },
            { text: this.$t('home.taskStatusManagement'), icon: 'mdi-account-multiple', link: '/Home/Task_Status_Management' },
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
        <v-navigation-drawer v-model="drawer" theme="dark" class="" app>

            <div class="d-flex align-center gap-4 py-4 px-6">
                <v-img src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-light.png" contain width="32"
                    height="32"></v-img>

                <div>
                    <div class="text-h6 mt-2">{{ $t('home.mainTitle') }}</div>
                    <div class="text-subtitle-2 font-weight-light">{{ $t('home.projectManagement') }}</div>
                </div>

            </div>

            <v-divider></v-divider>

            <v-list nav>
                <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" color="primary">
                    <template v-slot:675>
                        <v-icon :icon="item.icon"></v-icon>
                    </template>

                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>


        <v-main>
            <v-container>
                <RouterView />
            </v-container>
        </v-main>
    </v-app>
</template>
