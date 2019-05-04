<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <v-card>
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
        aspect-ratio="2.75"
      ></v-img>

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
          <div> {{ card_text }} </div>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn flat color="orange">Share</v-btn>
        <v-btn flat color="orange">Explore</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
