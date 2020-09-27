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
          coordinates: new firebase.firestore.GeoPoint(39.5594079, -84.2391289),
          createdOn: new Date(),
          formatted_address: "240 W Central Ave, Springboro, OH 45066, USA",
          g: {
            geopoint: new firebase.firestore.GeoPoint(39.5594079, -84.2391289),
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
              types: ["country", "political"],
            },
            {
              long_name: "45066",
              short_name: "45066",
              types: ["postal_code"],
            },
          ],
          coordinates: new firebase.firestore.GeoPoint(39.5608822, -84.2582096),
          createdOn: new Date(),
          formatted_address: "725 W Central Ave, Springboro, OH 45066, USA",
          g: {
            geopoint: new firebase.firestore.GeoPoint(39.5608822, -84.2582096),
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
        {
          address_components: [
            {
              long_name: "Space C - 122",
              short_name: "Space C - 122",
              types: ["subpremise"],
            },
            {
              long_name: "4427",
              short_name: "4427",
              types: ["street_number"],
            },
            {
              long_name: "Glengarry Drive",
              short_name: "Glengarry Dr",
              types: ["route"],
            },
            {
              long_name: "Beavercreek",
              short_name: "Beavercreek",
              types: ["locality", "political"],
            },
            {
              long_name: "Beavercreek Township",
              short_name: "Beavercreek Township",
              types: ["administrative_area_level_3", "political"],
            },
            {
              long_name: "Greene County",
              short_name: "Greene County",
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
              long_name: "45440",
              short_name: "45440",
              types: ["postal_code"],
            },
          ],
          coordinates: new firebase.firestore.GeoPoint(39.693321, -84.102154),
          createdOn: new Date(),
          formatted_address: "4427 Glengarry Dr Space C - 122, Beavercreek, OH 45440, USA",
          g: {
            geopoint: new firebase.firestore.GeoPoint(39.693321, -84.102154),
            geohash: "dph1y1ywmg",
          },
          geohash: "dph1y1ywmg",
          geometry: {
            location: {
              lng: "-84.102154",
              lat: "39.693321",
            },
            viewport: {
              northeast: {
                lng: "-84.10081411970849",
                lat: "39.6947821302915",
              },
              southwest: {
                lng: "-84.10351208029151",
                lat: "39.6920841697085",
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
          name: "Eddie Bauer",
          place_id: "ChIJpdwUhTOFQIgRLuXt_Rrr2Nw",
          plus_code: {
            compound_code: "MVVX+84 Beavercreek, OH, USA",
            global_code: "86FQMVVX+84",
          },
          review: 0,
          types: ["shoe_store", "clothing_store"],
        },
        {
          address_components: [
            {
              long_name: "103",
              short_name: "103",
              types: ["street_number"],
            },
            {
              long_name: "South Shore Drive",
              short_name: "S Shore Dr",
              types: ["route"],
            },
            {
              long_name: "Surf City",
              short_name: "Surf City",
              types: ["locality", "political"],
            },
            {
              long_name: "Topsail",
              short_name: "Topsail",
              types: ["administrative_area_level_3", "political"],
            },
            {
              long_name: "Pender County",
              short_name: "Pender County",
              types: ["administrative_area_level_2", "political"],
            },
            {
              long_name: "North Carolina",
              short_name: "NC",
              types: ["administrative_area_level_1", "political"],
            },
            {
              long_name: "28445",
              short_name: "28445",
              types: ["postal_code"],
            },
          ],
          coordinates: new firebase.firestore.GeoPoint(34.4257187, -77.5454196),
          createdOn: new Date(),
          formatted_address: "103 S Shore Dr, Surf City, NC 28445, USA",
          g: {
            geopoint: new firebase.firestore.GeoPoint(34.4257187, -77.5454196),
            geohash: "dq0gg7j0kg",
          },
          geohash: "dq0gg7j0kg",
          geometry: {
            location: {
              lng: "-77.5454196",
              lat: "34.4257187",
            },
            viewport: {
              northeast: {
                lng: "-77.5440013697085",
                lat: "34.4269888802915",
              },
              southwest: {
                lng: "-77.5466993302915",
                lat: "34.4242909197085",
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          name: "HOT DIGGITY DOGZ",
          place_id: "ChIJz9ZSmJaiqYkRKYlRFYLqiqw",
          plus_code: {
            compound_code: "CFG3+7R Surf City, NC, USA",
            global_code: "8764CFG3+7R",
          },
          review: 0,
          types: ["restaurant"],
        },
        {
          address_components: [
            {
              long_name: "279",
              short_name: "279",
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
              types: ["country", "political"],
            },
            {
              long_name: "45066",
              short_name: "45066",
              types: ["postal_code"],
            },
          ],
          coordinates: new firebase.firestore.GeoPoint(39.55857699999999, -84.24081300000002),
          createdOn: new Date(),
          formatted_address: "279 W Central Ave, Springboro, OH 45066, USA",
          g: {
            geopoint: new firebase.firestore.GeoPoint(39.55857699999999, -84.24081300000002),
            geohash: "dph1513tqv",
          },
          geohash: "dph1513tqv",
          geometry: {
            location: {
              lng: "-84.24081300000002",
              lat: "39.55857699999999",
            },
            viewport: {
              northeast: {
                lng: "-84.2394468697085",
                lat: "39.5599769302915",
              },
              southwest: {
                lng: "-84.24214483029152",
                lat: "39.5572789697085",
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          name: "Marco's Pizza",
          place_id: "ChIJC5tV_VqKQIgRo0s3A1FXiKs",
          plus_code: {
            compound_code: "HQ55+CM Springboro, OH, USA",
            global_code: "86FQHQ55+CM",
          },
          review: 0,
          types: ["meal_takeaway", "restaurant"],
        },
        {
          address_components: [
            {
              long_name: "2145",
              short_name: "2145",
              types: ["street_number"],
            },
            {
              long_name: "South Breiel Boulevard",
              short_name: "S Breiel Blvd",
              types: ["route"],
            },
            {
              long_name: "Middletown",
              short_name: "Middletown",
              types: ["locality", "political"],
            },
            {
              long_name: "Butler County",
              short_name: "Butler County",
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
              long_name: "45042",
              short_name: "45042",
              types: ["postal_code"],
            },
          ],
          coordinates: new firebase.firestore.GeoPoint(39.4920769, -84.3529326),
          createdOn: new Date(),
          formatted_address: "2145 S Breiel Blvd, Middletown, OH 45042, USA",
          g: {
            geopoint: new firebase.firestore.GeoPoint(39.4920769, -84.3529326),
            geohash: "dph08t2440",
          },
          geohash: "dph08t2440",
          geometry: {
            location: {
              lng: "-84.3529326",
              lat: "39.4920769",
            },
            viewport: {
              northeast: {
                lng: "-84.35145746970849",
                lat: "39.4936832302915",
              },
              southwest: {
                lng: "-84.3541554302915",
                lat: "39.4909852697085",
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
          name: "Middletown Pickleball Association",
          place_id: "ChIJ5ztOBZpnQIgRPiUDWvlSJhQ",
          plus_code: {
            compound_code: "FJRW+RR Middletown, OH, USA",
            global_code: "86FQFJRW+RR",
          },
          review: 0,
          types: [],
        },
        {
          address_components: [
            {
              long_name: "E",
              short_name: "E",
              types: ["subpremise"],
            },
            {
              long_name: "2765",
              short_name: "2765",
              types: ["street_number"],
            },
            {
              long_name: "",
              short_name: "",
              types: [""],
            },
            {
              long_name: "North Carolina 210",
              short_name: "NC-210",
              types: ["route"],
            },
            {
              long_name: "Hampstead",
              short_name: "Hampstead",
              types: ["locality", "political"],
            },
            {
              long_name: "Topsail",
              short_name: "Topsail",
              types: ["administrative_area_level_3", "political"],
            },
            {
              long_name: "Pender County",
              short_name: "Pender County",
              types: ["administrative_area_level_2", "political"],
            },
            {
              long_name: "North Carolina",
              short_name: "NC",
              types: ["administrative_area_level_1", "political"],
            },
            {
              long_name: "United States",
              short_name: "US",
              types: ["country", "political"],
            },
            {
              long_name: "28443",
              short_name: "28443",
              types: ["postal_code"],
            },
          ],
          coordinates: new firebase.firestore.GeoPoint(34.451406, -77.5645136),
          createdOn: new Date(),
          formatted_address: "2765 NC-210 E, Hampstead, NC 28443, USA",
          g: {
            geopoint: new firebase.firestore.GeoPoint(34.451406, -77.5645136),
            geohash: "dq0gfzxjzz",
          },
          geohash: "dq0gfzxjzz",
          geometry: {
            location: {
              lng: "-77.5645136",
              lat: "34.451406",
            },
            viewport: {
              northeast: {
                lng: "-77.5627448697085",
                lat: "-77.5627448697085",
              },
              southwest: {
                lng: "-77.56544283029152",
                lat: "34.4500776697085",
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
          name: "Publix Super Market at Arboretum at Surf City",
          place_id: "ChIJxy1WPgCZqYkRkeRpkzpTOFk",
          plus_code: {
            compound_code: "FC2P+H5 Hampstead, NC, USA",
            global_code: "8764FC2P+H5",
          },
          review: 0,
          types: ["supermarket", "bakery", "liquor_store"],
        },
        {
          address_components: [
            {
              long_name: "100",
              short_name: "100",
              types: ["street_number"],
            },
            {
              long_name: "Stumer Road",
              short_name: "Stumer Rd",
              types: ["route"],
            },
            {
              long_name: "Rapid City",
              short_name: "Rapid City",
              types: ["locality", "political"],
            },
            {
              long_name: "Pennington County",
              short_name: "Pennington County",
              types: ["administrative_area_level_2", "political"],
            },
            {
              long_name: "South Dakota",
              short_name: "SD",
              types: ["administrative_area_level_1", "political"],
            },
            {
              long_name: "United States",
              short_name: "US",
              types: ["country", "political"],
            },
            {
              long_name: "57701",
              short_name: "57701",
              types: ["postal_code"],
            },
          ],
          coordinates: new firebase.firestore.GeoPoint(44.03380569999999, -103.2183798),
          createdOn: new Date(),
          formatted_address: "100 Stumer Rd, Rapid City, SD 57701, USA",
          g: {
            geopoint: new firebase.firestore.GeoPoint(44.03380569999999, -103.2183798),
            geohash: "9xyde0net2",
          },
          geohash: "9xyde0net2",
          geometry: {
            location: {
              lng: "-103.2183798",
              lat: "44.03380569999999",
            },
            viewport: {
              northeast: {
                lng: "-103.2165147197085",
                lat: "44.0350050302915",
              },
              southwest: {
                lng: "-103.2192126802915",
                lat: "44.03230706970851",
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
          name: "Walmart Supercenter",
          place_id: "ChIJBcgcNU1CfYcR3i78H4GdpK0",
          plus_code: {
            compound_code: "2QMJ+GJ Rapid City, SD, USA",
            global_code: "85PR2QMJ+GJ",
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
    };
  },
  methods: {
    generatePlaces() {
      this.starterPlaces.map((place) => {
        return fb.placesCollection.add(place);
      });
    },
  },
};
</script>
