<template>
  <v-container grid-list-md>
    <v-layout wrap>
      <v-flex xs12>
        <v-text-field
          label="User Name*"
          :value="username"
          @input="$emit('update:username', $event);checkUserExistence($event)"
          :rules="usernameRules"
          :error-messages="usernameErrorMessage"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          label="Password*"
          type="password"
          :value="password"
          @input="$emit('update:password', $event)"
          :rules="passwordRules"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          label="Password Confirmation*"
          type="password"
          :value="passwordConfirmation"
          @input="$emit('update:passwordConfirmation', $event)"
          :rules="passwordConfirmationRules"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field
          label="First Name*"
          :value="firstName"
          @input="$emit('update:firstName', $event)"
          :rules="firstNameRules"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field
          label="Last Name*"
          :value="lastName"
          @input="$emit('update:lastName', $event)"
          :rules="lastNameRules"
          required
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash';
import createRequiredText from '../helpers/createRequiredText.js';
import DataModel from '../api/index.js';

import MutationTypes from '../store/MutationTypes.js';
import { mapMutations } from 'vuex';

export default {
    name: 'SignUpForm',
    props: {
        username: String,
        password: String,
        passwordConfirmation: String,
        firstName: String,
        lastName: String
    },
    data() {
        return {
            usernameRules: [
                v => !!v || createRequiredText('User Name')
            ],
            passwordRules: [
                v => !!v || createRequiredText('Password')
            ],
            passwordConfirmationRules: [
                v => !!v || createRequiredText('Password Confirmation')
            ],
            firstNameRules: [
                v => !!v || createRequiredText('First Name')
            ],
            lastNameRules: [
                v => !!v || createRequiredText('Last Name')
            ],
            usernameErrorMessage: ''
        };
    },
    methods: {
        ...mapMutations([MutationTypes.CHANGE_ALERT_MESSAGE]),
        checkUserExistence: _.debounce(async function(username) {
            try {
                const result = await DataModel.User.fetchUserList({
                    username
                });

                if (result.users.length) {
                    this.usernameErrorMessage = 'User Name exsited!';
                }
                else {
                    this.usernameErrorMessage = '';
                }
            } catch (error) {
                this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                    text: error.message
                });
            }
        }, 500)
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
