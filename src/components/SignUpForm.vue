<template>
  <v-container grid-list-md>
    <v-layout wrap>
      <v-flex xs12>
        <v-text-field 
            label="User Name*" 
            required
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field 
            label="Password*" 
            type="password" required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field
          label="First Name*"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field
          label="Last Name*"
          required
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    name: 'SignUpForm'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
