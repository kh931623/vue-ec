<template>
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
</template>

<script>
import { mapMutations } from 'vuex';
import MutationTypes from '../store/MutationTypes.js';

export default {
    name: 'MainPage',
    data() {
        return {
            searchText: '',
        };
    },
    methods: {
        ...mapMutations([MutationTypes.CHANGE_IS_LOADING]),
        loadingHandler() {
            this[MutationTypes.CHANGE_IS_LOADING]({
                flag: true,
            });

            setTimeout(() => {
                this[MutationTypes.CHANGE_IS_LOADING]({
                    flag: false,
                });
            }, 3 * 1000);
        },
    },
};
</script>

