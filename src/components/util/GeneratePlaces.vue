
<template>
  <v-btn @click="generatePlaces">Generate Places</v-btn>
</template>

<script>
import firebase from "@/firebase";
import * as fb from "@/firebase";

export default {
  name: "generate-places",
  data() {
    return {
      starterPlaces: [
        {
          address_components: [
            {
              long_name: "282",
              short_name: "282",
              types: ["street_number"],
            },
            {
              long_name: "West Central Avenue",
              short_name: "W Central Ave",
              types: ["route"],
            },
            {
              long_name: "Springboro",
              short_name: "Springboro",
              types: ["locality", "political"],
            },
            {
              long_name: "Clearcreek Township",
              short_name: "Clearcreek Township",
              types: ["administrative_area_level_3", "political"],
            },
            {
              long_name: "Warren County",
              short_name: "Warren County",
              types: ["administrative_area_level_2", "political"],
            },
            {
              long_name: "Ohio",
              short_name: "OH",
              types: ["administrative_area_level_3", "political"],
            },
            {
              long_name: "United States",
              short_name: "US",
              types: ["country", "political"],
            },
            {
              long_name: "45066",
              short_name: "45066",
              types: ["postal_code"],
            },
            {
              long_name: "1104",
              short_name: "1104",
              types: ["postal_code_suffix"],
            },
          ],
          coordinates: new firebase.firestore.GeoPoint(
            39.55989399999999,
            -84.24116649999999
          ),
          createdOn: new Date(),
          formatted_address: "282 W Central Ave, Springboro, OH 45066, USA",
          g: {
            geopoint: new firebase.firestore.GeoPoint(
              39.55989399999999,
              -84.24116649999999
            ),
            geohash: "dph1519mn",
          },
          geohash: "dph1519mn",
          geometry: {
            location: {
              lng: "-84.24116649999999",
              lat: "39.55989399999999",
            },
            viewport: {
              northeast: {
                lng: "-84.2398593197085",
                lat: "39.5612434802915",
              },
              southwest: {
                lng: "-84.2425572802915",
                lat: "39.5585455197085",
              },
            },
          },
          icon:
            "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          name: "Roma's Pizza and Pasta",
          place_id: "ChIJPeugCgyLQIgRU21YUOUFr1g",
          plus_code: {
            compound_code: "HQ55+XG Springboro, OH, USA",
            global_code: "86FQHQ55+XG",
          },
          review: 0,
          types: ["restaurant"],
        },
        {
          address_components: [
            {
              long_name: "752",
              short_name: "752",
              types: ["street_number"],
            },
            {
              long_name: "Gardner Road",
              short_name: "Gardner Road",
              types: ["route"],
            },
            {
              long_name: "Springboro",
              short_name: "Springboro",
              types: ["locality", "political"],
            },
            {
              long_name: "Clearcreek Township",
              short_name: "Clearcreek Township",
              types: ["administrative_area_level_3", "political"],
            },
            {
              long_name: "Warren County",
              short_name: "Warren County",
              types: ["administrative_area_level_2", "political"],
            },
            {
              long_name: "Ohio",
              short_name: "OH",
              types: ["administrative_area_level_1", "political"],
            },
            {
              long_name: "United States",
              short_name: "US",
              types: ["country", "political"],
            },
            {
              long_name: "45066",
              short_name: "45066",
              types: ["postal_code"],
            },
          ],
          coordinates: new firebase.firestore.GeoPoint(
            39.5774497,
            -84.23137849999999
          ),
          createdOn: new Date(),
          formatted_address: "752 Gardner Rd, Springboro, OH 45066, USA",
          g: {
            geopoint: new firebase.firestore.GeoPoint(
              39.5774497,
              -84.23137849999999
            ),
            geohash: "dph15kbe6e",
          },
          geohash: "dph15kbe6e",
          geometry: {
            location: {
              lng: "-84.23137849999999",
              lat: "39.5774497",
            },
            viewport: {
              northeast: {
                lng: "-84.23003681970849",
                lat: "39.57872028029149",
              },
              southwest: {
                lng: "-84.2327347802915",
                lat: "39.57602231970849",
              },
            },
          },
          icon:
            "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          name: "Dickey's Barbecue Pit",
          place_id: "ChIJichDvzOKQIgR6rrlWtUXfb8",
          plus_code: {
            compound_code: "HQG9+XC Springboro, OH, USA",
            global_code: "86FQHQG9+XC",
          },
          review: 0,
          types: ["meal_delivery", "restaurant"],
        },
        {
          address_components: [
            {
              long_name: "240",
              short_name: "240",
              types: ["street_number"],
            },
            {
              long_name: "West Central Avenue",
              short_name: "W Central Ave",
              types: ["route"],
            },
            {
              long_name: "Springboro",
              short_name: "Springboro",
              types: ["locality", "political"],
            },
            {
              long_name: "Clearcreek Township",
              short_name: "Clearcreek Township",
              types: ["administrative_area_level_3", "political"],
            },
            {
              long_name: "Warren County",
              short_name: "Warren County",
              types: ["administrative_area_level_2", "political"],
            },
            {
              long_name: "Ohio",
              short_name: "OH",
              types: ["administrative_area_level_1"],
            },
            {
              long_name: "United States",
              short_name: "US",
              types: ["country", "political"],
            },
            {
              long_name: "45066",
              short_name: "45066",
              types: ["country", "political"],
            },
          ],
          coordinates: new firebase.firestore.GeoPoint(
            39.5594079,
            -84.2391289
          ),
          createdOn: new Date(),
          formatted_address: "240 W Central Ave, Springboro, OH 45066, USA",
          g: {
            geopoint: new firebase.firestore.GeoPoint(
              39.5594079,
              -84.2391289
            ),
            geohash: "dph151dfq0",
          },
          geohash: "dph151dfq0",
          geometry: {
            location: {
              lng: "-84.2391289",
              lat: "39.5594079",
            },
            viewport: {
              northeast: {
                lng: "-84.2376250697085",
                lat: "39.5606546302915",
              },
              southwest: {
                lng: "-84.2403230302915",
                lat: "39.5579566697085",
              },
            },
          },
          icon:
            "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
          name: "Discount Drug Mart",
          place_id: "ChIJAU12jFqKQIgRd5majb1KA-w",
          plus_code: {
            compound_code: "86FQHQ56+Q8",
            global_code: "HQ56+Q8 Springboro, OH, USA",
          },
          review: 0,
          types: ["drugstore", "convenience_store", "pharmacy"],
        },
        {
          address_components: [
            {
              long_name: "725",
              short_name: "725",
              types: ["street_number"],
            },
            {
              long_name: "West Central Avenue",
              short_name: "W Central Ave",
              types: ["route"],
            },
            {
              long_name: "Springboro",
              short_name: "Springboro",
              types: ["locality", "political"],
            },
            {
              long_name: "Clearcreek Township",
              short_name: "Clearcreek Township",
              types: ["administrative_area_level_3", "political"],
            },
            {
              long_name: "Warren County",
              short_name: "Warren County",
              types: ["administrative_area_level_2", "political"],
            },
            {
              long_name: "Ohio",
              short_name: "OH",
              types: ["administrative_area_level_1", "political"],
            },
            {
              long_name: "United States",
              short_name: "US",
              types: ["county", "political"],
            },
            {
              long_name: "45066",
              short_name: "45066",
              types: ["postal_code"],
            },
          ],
          coordinates: new firebase.firestore.GeoPoint(
            39.5608822,
            -84.2582096
          ),
          createdOn: new Date(),
          formatted_address: "725 W Central Ave, Springboro, OH 45066, USA",
          g: {
            geopoint: new firebase.firestore.GeoPoint(
              39.5608822,
              -84.2582096
            ),
            geohash: "dph149v4c",
          },
          geohash: "dph149v4c",
          geometry: {
            location: {
              lng: "-84.2582096",
              lat: "39.5608822",
            },
            viewport: {
              northeast: {
                lng: "-84.25683816970849",
                lat: "39.5623795302915",
              },
              southwest: {
                lng: "-84.2595361302915",
                lat: "39.5596815697085",
              },
            },
          },
          icon:
            "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
          name: "Kroger",
          place_id: "ChIJIVgmb2WKQIgRdM_tezuq6v4",
          plus_code: {
            compound_code: "HP6R+9P Springboro, OH, USA",
            global_code: "86FQHP6R+9P",
          },
          review: 0,
          types: [],
        },
        {
          address_components: [
            {
              long_name: "1425",
              short_name: "1425",
              types: ["street_number"],
            },
            {
              long_name: "East 2nd Street",
              short_name: "E 2nd St",
              types: ["route"],
            },
            {
              long_name: "Franklin",
              short_name: "Franklin",
              types: ["locality", "political"],
            },
            {
              long_name: "Franklin Township",
              short_name: "Franklin Township",
              types: ["administrative_area_level_3", "political"],
            },
            {
              long_name: "Warren County",
              short_name: "Warren County",
              types: ["administrative_area_level_2", "political"],
            },
            {
              long_name: "Ohio",
              short_name: "OH",
              types: ["administrative_area_level_1", "political"],
            },
            {
              long_name: "United States",
              short_name: "US",
              types: ["country", "political"],
            },
            {
              long_name: "45005",
              short_name: "45005",
              types: ["postal_code"],
            },
          ],
          coordinates: new firebase.firestore.GeoPoint(
            39.56397570000001,
            -84.2744453
          ),
          createdOn: new Date(),
          formatted_address: "1425 E 2nd St, Franklin, OH 45005, USA",
          g: {
            geopoint: new firebase.firestore.GeoPoint(
              39.56397570000001,
              -84.2744453
            ),
            geohash: "dph1463hz5",
          },
          geohash: "dph1463hz5",
          geometry: {
            location: {
              lng: "-84.2744453",
              lat: "39.56397570000001",
            },
            viewport: {
              northeast: {
                lng: "-84.2731727197085",
                lat: "39.5626348197085",
              },
              southwest: {
                lng: "-84.2758706802915",
                lat: "39.5626348197085",
              },
            },
          },
          icon:
            "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          name: "McDonald's",
          place_id: "ChIJ8_2tk9lhQIgRqRfdn95lDL8",
          plus_code: {
            compound_code: "HP7G+H6 Franklin, OH, USA",
            global_code: "86FQHP7G+H6",
          },
          review: 0,
          types: ["cafe", "restaurant"],
        },
        {
          address_components: [
            {
              long_name: "1275",
              short_name: "1275",
              types: ["street_number"],
            },
            {
              long_name: "East 2nd Street",
              short_name: "E 2nd St",
              types: ["route"],
            },
            {
              long_name: "Franklin",
              short_name: "Franklin",
              types: ["locality", "political"],
            },
            {
              long_name: "Franklin Township",
              short_name: "Franklin Township",
              types: ["administrative_area_level_3", "political"],
            },
            {
              long_name: "Warren County",
              short_name: "Warren County",
              types: ["administrative_area_level_2", "political"],
            },
            {
              long_name: "Ohio",
              short_name: "OH",
              types: ["administrative_area_level_1", "political"],
            },
            {
              long_name: "United States",
              short_name: "US",
              types: ["country", "political"],
            },
            {
              long_name: "45005",
              short_name: "45005",
              types: ["postal_code"],
            },
          ],
          coordinates: new firebase.firestore.GeoPoint(
            39.5662579,
            -84.27773719999999
          ),
          createdOn: new Date(),
          formatted_address: "1275 E 2nd St, Franklin, OH 45005, USA",
          g: {
            geopoint: new firebase.firestore.GeoPoint(
              39.5662579,
              -84.27773719999999
            ),
            geohash: "dph144yf4m",
          },
          geohash: "dph144yf4m",
          geometry: {
            location: {
              lng: "-84.27773719999999",
              lat: "39.5662579",
            },
            viewport: {
              northeast: {
                lng: "-84.27606795",
                lat: "39.5672721802915",
              },
              southwest: {
                lng: "-84.27921135",
                lat: "39.5645742197085",
              },
            },
          },
          icon:
            "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
          name: "Walmart Supercenter",
          place_id: "ChIJE0gEqdthQIgRcrpG-2TQ2cI",
          plus_code: {
            compound_code: "HP8C+GW Franklin, OH, USA",
            global_code: "86FQHP8C+GW",
          },
          review: 0,
          types: [
            "department_store",
            "supermarket",
            "electronics_store",
            "home_goods_store",
            "clothing_store",
          ],
        },
      ],
    }
  },
  methods: {
    generatePlaces() {
      this.starterPlaces.map((place) => {
        return fb.placesCollection.add(place);
      });
      console.log("Start places have been generated.")
    },
  }
};
</script>
