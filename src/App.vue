<template>
  <div id="app">
    <v-app>
      <AppNavigation></AppNavigation>
      <v-container grid-list-md>
        <router-view></router-view>
      </v-container>

      <!-- loading dialog -->
      <v-dialog :value="isLoading" persistent width="400">
        <v-card color="primary" dark>
          <v-card-text>
            Loading ...
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- user form dialog -->
      <v-dialog :value="showUserForm" max-width="600px" persistent>
        <UserForm></UserForm>
      </v-dialog>

      <!-- alert box -->
      <v-dialog :value="canDisplayAlert" max-width="400" @input="closeAlert()">
        <v-card>
          <v-card-title class="headline">Message</v-card-title>

          <v-card-text>
            {{ alertMessage }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" flat="flat" @click="closeAlert()">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
import AppNavigation from './components/AppNavigation.vue';
import UserForm from './components/UserForm.vue';

import MutationTypes from './store/MutationTypes.js';
import DataModel from './api/index.js';
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'app',
    components: {
        AppNavigation,
        UserForm
    },
    data() {
        return {
            searchText: ''
        };
    },
    async mounted() {
      //  const result = await DataModel.Utility.fetchUserInfo();
      //  this[MutationTypes.SET_USER]({
      //      user: result.user
      //  });
    },
    methods: {
        // map mutations from store
        ...mapMutations([
            MutationTypes.CHANGE_IS_LOADING,
            MutationTypes.CHANGE_SHOW_USER_FORM,
            MutationTypes.CHANGE_IS_SIGN_UP,
            MutationTypes.CHANGE_ALERT_MESSAGE,
            MutationTypes.SET_USER
        ]),
        
        closeAlert() {
          this[MutationTypes.CHANGE_ALERT_MESSAGE]({
            text: ''
          });
        }
    },
    computed: {
        // map state from store
        ...mapState(['isLoading', 'showUserForm', 'isSignUp', 'alertMessage']),

        ...mapGetters(['userFormTitle', 'canDisplayAlert'])
    }
};
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
