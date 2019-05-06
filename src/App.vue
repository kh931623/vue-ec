<template>
  <div id="app">
    <v-app>
      <AppNavigation></AppNavigation>
      <v-container grid-list-md>
        <v-layout row wrap>
          <!-- test area -->
          <v-flex xs12>
            <v-btn @click="loadingHandler()">Loading la!</v-btn>
          </v-flex>

          <!-- search bar -->
          <v-flex xs12>
            <v-form>
              <v-text-field solo v-model="searchText" label="Search" append-icon="search" clearable></v-text-field>
            </v-form>
          </v-flex>

          <!-- left quick menu -->
          <v-flex xs12 md4>
            <v-card>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>

          <!-- main content -->
          <v-flex xs12 md8>
            <v-card>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <!-- loading dialog -->
      <v-dialog :value="isLoading" persistent width="600">
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
    </v-app>
  </div>
</template>

<script>
import AppNavigation from './components/AppNavigation.vue';
import UserForm from './components/UserForm.vue'

import MutationTypes from './store/MutationTypes.js';
import { mapMutations, mapState, mapGetters } from 'vuex';

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
    methods: {
        // map mutations from store
        ...mapMutations([
            MutationTypes.CHANGE_IS_LOADING,
            MutationTypes.CHANGE_SHOW_USER_FORM,
            MutationTypes.CHANGE_IS_SIGN_UP
        ]),
        loadingHandler() {
            this[MutationTypes.CHANGE_IS_LOADING]({
                flag: true
            });

            setTimeout(() => {
                this[MutationTypes.CHANGE_IS_LOADING]({
                    flag: false
                });
            }, 3 * 1000);
        },
        signUpHandler() {
          this[MutationTypes.CHANGE_IS_SIGN_UP]({
            flag: true
          });
        },
        signInHandler() {
          this[MutationTypes.CHANGE_IS_SIGN_UP]({
            flag: false
          });
        },
        closeUserForm() {
            console.log(123);
            this[MutationTypes.CHANGE_SHOW_USER_FORM]({
                flag: false
            });
        }
    },
    computed: {
        // map state from store
        ...mapState([
          'isLoading', 
          'showUserForm',
          'isSignUp'
        ]),

        ...mapGetters([
          'userFormTitle'
        ])
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
