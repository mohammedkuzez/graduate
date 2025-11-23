<script>
import { useTheme } from 'vuetify'
import projectManagementIcon from '../../assets/img/project-management.png'
import DarkprojectManagementIcon from '../../assets/img/Dark-project-management.png'
import invitationIcon from '../../assets/img/invitation.png'
import DarkinvitationIcon from '../../assets/img/Dark-invitation.png'
import statusIcon from '../../assets/img/status.png'
import DarkstatusIcon from '../../assets/img/Dark-status.png'

export default {
  data: () => ({
    hovered: false,
    theme: useTheme(),
    getimage: false,

    projectManagementIcon,
    DarkprojectManagementIcon,
    invitationIcon,
    DarkinvitationIcon,
    statusIcon,
    DarkstatusIcon,
  }),
  computed: {
      isMobile() {
    return this.$vuetify.display.smAndDown
  },
    nextTheme() {
      return this.theme.name === 'light' ? 'dark' : 'light'
    },
    nextLang() {
      return this.$i18n.locale === 'en' ? 'ar' : 'en'
    },
    drawerLocation() {
      return this.$i18n.locale === 'ar' ? 'right' : 'left'
    }
  },
  methods: {
    changeTheme() {
      this.getimage = this.nextTheme === 'dark' ? true : false
      localStorage.setItem('theme', this.nextTheme)
      this.theme.change(this.nextTheme)
    },
    changeLang() {
      localStorage.setItem('lang', this.nextLang)
      this.$i18n.locale = this.nextLang
    }
  },
  mounted() {
    this.getimage = this.theme.name === 'dark'
  }
}
</script>

<template>
  <v-app id="inspire">
    <!-- APP BAR -->
    <v-card>
      <v-layout>

    <!-- NAVIGATION DRAWER -->

        <v-navigation-drawer
          permanent
          :location="drawerLocation"
          :width="isMobile ? 72 : (hovered ? 256 : 72)"
          @mouseenter="!isMobile && (hovered = true)"
          @mouseleave="!isMobile && (hovered = false)"
        >
        <v-list nav>
          <v-list-item>
            <template v-slot:prepend>
              <v-img src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-light.png" width="50" />
            </template>
            <v-list-item-title class="ms-5" v-if="hovered">{{ $t('home.mainTitle') }}</v-list-item-title>
          </v-list-item>
        
        <v-divider></v-divider>
          <v-list-item :to="'/MTR/Project_Management'" color="primary">
            <template v-slot:prepend>
              <v-img :src="getimage ? projectManagementIcon : DarkprojectManagementIcon" width="50" />
            </template>
            <v-list-item-title class="ms-5" v-if="hovered">{{ $t('home.projectManagement') }}</v-list-item-title>
          </v-list-item>

          <v-list-item :to="'/MTR/Dashboard'" color="primary">
            <template v-slot:prepend>
              <v-img :src="getimage ? statusIcon : DarkstatusIcon" width="50" />
            </template>
            <v-list-item-title class="ms-5" v-if="hovered">{{ $t('home.dashboard') }}</v-list-item-title>
          </v-list-item>

          <v-list-item :to="'/MTR/Invitation'" color="primary">
            <template v-slot:prepend>
              <v-img :src="getimage ? invitationIcon : DarkinvitationIcon" width="45" />
            </template>
            <v-list-item-title class="ms-6" v-if="hovered">{{ $t('home.invitation') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!-- MAIN CONTENT -->
      <v-main>
        <v-container fluid>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
    
    </v-app>
</template>

