<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ userFormTitle }}</span>
      <v-spacer></v-spacer>
      <v-btn flat color="blue" v-if="isSignUp" @click="signInHandler()">Sign In</v-btn>
      <v-btn flat color="blue" v-else @click="signUpHandler()">Sign Up</v-btn>
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="form">
        <!-- sign up form -->
        <SignUpForm v-if="isSignUp" v-bind.sync="signUpData"></SignUpForm>

        <!-- sign in form -->
        <SignInForm v-else v-bind.sync="signInData"></SignInForm>
      </v-form>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click="closeUserForm()">Close</v-btn>
      <v-btn color="blue darken-1" flat @click="signUp()" v-if="isSignUp">Sign Up</v-btn>
      <v-btn color="blue darken-1" flat @click="signIn()" v-else>Sign In</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import SignUpForm from './SignUpForm.vue';
import SignInForm from './SignInForm.vue';

import { mapMutations, mapGetters, mapState } from 'vuex';
import MutationTypes from '../store/MutationTypes.js';

export default {
    name: 'Userform',
    components: {
        SignUpForm,
        SignInForm
    },
    data() {
        return {
            signUpData: {
                username: '',
                password: '',
                passwordConfirmation: '',
                firstName: '',
                lastName: ''
            },
            signInData: {
                username: '',
                password: ''
            },
            valid: false,
        };
    },
    methods: {
        ...mapMutations([
            MutationTypes.CHANGE_SHOW_USER_FORM,
            MutationTypes.CHANGE_IS_SIGN_UP
        ]),
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
            this.$refs.form.reset();

            // clear form data
            const targets = [this.signUpData, this.signInData];
            targets.forEach(data => {
                Object.keys(data).forEach(key => {
                    data[key] = '';
                })
            })
        },
        signIn() {
            if (this.$refs.form.validate()) {
                console.log('sign in!');
            }
        },
        signUp() {
            if (this.$refs.form.validate()) {
                console.log('sign up!');
            }
        }
    },
    computed: {
        // map state from store
        ...mapState(['isSignUp']),

        ...mapGetters(['userFormTitle'])
    }
};
</script>

