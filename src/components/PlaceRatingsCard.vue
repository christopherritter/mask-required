<template>
  <div>
    <v-card v-if="place.reviews && place.reviews.length > 0">
      <v-card-title>Ratings and reviews</v-card-title>
      <v-card-actions class="px-4 pb-4">
        <v-avatar color="teal" size="64">
          <span class="white--text headline">{{ place.ratings.general }}</span>
        </v-avatar>
        <v-spacer></v-spacer>
        <v-rating
          v-model="place.ratings.general"
          background-color="yellow"
          color="yellow accent-4"
          length="5"
          dense
          half-increments
          hover
          size="18"
          readonly
        ></v-rating>
        <v-spacer></v-spacer>
        <span class="caption mr-2 font-weight-medium">
          ( {{ place.reviews.length }} reviews )
        </span>
      </v-card-actions>
      <v-divider class="my-0"></v-divider>
      <v-list dense class="pl-2">
        <v-subheader>RATINGS</v-subheader>
        <v-list-item>
          <v-list-item-icon class="mr-2">
            <v-icon v-text="ratings[0].icon" small></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Compliance</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content class="py-0">
            <v-rating
              v-model="place.ratings.compliance"
              background-color="purple lighten-3"
              color="purple"
              length="5"
              dense
              small
              readonly
            ></v-rating>
          </v-list-item-content>
          <v-list-item-icon class="mr-2">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" small>mdi-information</v-icon>
              </template>
              <span>{{ ratings[0].description }}</span>
            </v-tooltip>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-2">
            <v-icon v-text="ratings[1].icon" small></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ ratings[1].label }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content class="py-0">
            <v-rating
              v-model="place.ratings.notifications"
              background-color="purple lighten-3"
              color="purple"
              length="5"
              dense
              small
              readonly
            ></v-rating>
          </v-list-item-content>
          <v-list-item-icon class="mr-2">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" small>mdi-information</v-icon>
              </template>
              <span>{{ ratings[1].description }}</span>
            </v-tooltip>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-2">
            <v-icon v-text="ratings[2].icon" small></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ ratings[2].label }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content class="py-0">
            <v-rating
              v-model="place.ratings.enforcement"
              background-color="purple lighten-3"
              color="purple"
              length="5"
              dense
              small
              readonly
            ></v-rating>
          </v-list-item-content>
          <v-list-item-icon class="mr-2">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" small>mdi-information</v-icon>
              </template>
              <span>{{ ratings[2].description }}</span>
            </v-tooltip>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
    <v-card v-else>
      <v-card-title>Ratings and reviews</v-card-title>
      <v-card-actions class="px-4 pb-4">
        <v-avatar color="teal" size="64">
          <span class="white--text headline">0</span>
        </v-avatar>
        <v-spacer></v-spacer>
        <v-rating
          background-color="gray"
          color="gray darken-3"
          length="5"
          dense
          half-increments
          hover
          size="18"
          readonly
        ></v-rating>
        <v-spacer></v-spacer>
        <span class="caption mr-2 font-weight-medium">
          ( 0 reviews )
        </span>
      </v-card-actions>
      <v-divider class="my-0"></v-divider>
      <v-list dense class="pl-2">
        <v-subheader>RATINGS</v-subheader>
        <v-list-item>
          <v-list-item-icon class="mr-2">
            <v-icon v-text="ratings[0].icon" small></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ ratings[0].label }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content class="py-0">
            <v-rating
              background-color="gray lighten-3"
              color="gray"
              length="5"
              dense
              small
              readonly
            ></v-rating>
          </v-list-item-content>
          <v-list-item-icon class="mr-2">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" small>mdi-information</v-icon>
              </template>
              <span>{{ ratings[0].description }}</span>
            </v-tooltip>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-2">
            <v-icon v-text="ratings[1].icon" small></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ ratings[1].label }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content class="py-0">
            <v-rating
              background-color="gray lighten-3"
              color="gray"
              length="5"
              dense
              small
              readonly
            ></v-rating>
          </v-list-item-content>
          <v-list-item-icon class="mr-2">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" small>mdi-information</v-icon>
              </template>
              <span>{{ ratings[1].description }}</span>
            </v-tooltip>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-2">
            <v-icon v-text="ratings[2].icon" small></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ ratings[2].label }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content class="py-0">
            <v-rating
              background-color="gray lighten-3"
              color="gray"
              length="5"
              dense
              small
              readonly
            ></v-rating>
          </v-list-item-content>
          <v-list-item-icon class="mr-2">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" small>mdi-information</v-icon>
              </template>
              <span>{{ ratings[2].description }}</span>
            </v-tooltip>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "place-ratings",
  props: {
    place: Object,
  },
  computed: {
    ...mapState([["ratings"]]),
  },
};
</script>
