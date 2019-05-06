<template>
  <v-form 
    :value="valid"
    @input="$emit('update:valid', $event)"
  >
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex xs12>
          <v-text-field 
            label="User Name*"
            :value="username"
            :rules="usernameRules"
            @input="$emit('update:username', $event)"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field 
            label="Password*" 
            type="password" 
            :value="password"
            :rules="passwordRules"
            @input="$emit('update:password', $event)"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import createRequiredText from '../helpers/createRequiredText.js';

export default {
    name: 'SignInForm',
    props: {
      username: String,
      password: String,
      valid: Boolean
    },
    data() {
        return {
            usernameRules: [
              v => !!v || createRequiredText('User Name')
            ],
            passwordRules: [
              v => !!v || createRequiredText('Password')
            ]
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
