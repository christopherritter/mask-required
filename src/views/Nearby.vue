<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col>
          <h1>{{ $route.params.name }} Nearby</h1>
          <!-- <p>{{ $route.params.location }}</p>
          <p>{{ $route.params.type }}</p> -->
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Nearby",
  computed: {
    ...mapState([["reviews"]]),
  },
}
</script>
