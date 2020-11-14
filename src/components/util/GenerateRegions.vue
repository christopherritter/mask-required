<template>
  <v-btn @click="generateRegions" block>Generate Regions</v-btn>
</template>

<script>
import firebase from "@/firebase";
import * as fb from "@/firebase";

export default {
  name: "generate-regions",
  data() {
    return {
      starterRegions: [
        {
          createdOn: new Date(),
          formatted_address: "Beavercreek, OH, USA",
          geometry: {
            location: {
              lat: 39.7092262,
              lng: -84.06326849999999,
            },
            viewport: {
              northeast: {
                lat: 39.7790059,
                lng: -84.009098,
              },
              southwest: {
                lat: 39.680862,
                lng: -84.10651,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Beavercreek",
          place_id: "ChIJB-LwKg6bQIgRgu8TwuZQd7o",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Bellevue, WA, USA",
          geometry: {
            location: {
              lat: 47.6101497,
              lng: -122.2015159,
            },
            viewport: {
              northeast: {
                lat: 47.6606959,
                lng: -122.0793321,
              },
              southwest: {
                lat: 47.534614,
                lng: -122.222931,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Bellevue",
          place_id: "ChIJQWCmo89rkFQRZQfQ6oJUz7o",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Centerville, OH, USA",
          geometry: {
            location: {
              lat: 39.6283928,
              lng: -84.15938179999999,
            },
            viewport: {
              northeast: {
                lat: 39.673569,
                lng: -84.10873099999999,
              },
              southwest: {
                lat: -84.208829,
                lng: 39.5906138,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Centerville",
          place_id: "ChIJW2OqA9dYQIgRaIwsVS1hBbM",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Chattanooga, TN, USA",
          geometry: {
            location: {
              lat: 35.0456297,
              lng: -85.3096801,
            },
            viewport: {
              northeast: {
                lat: 35.2136671,
                lng: -85.0517979,
              },
              southwest: {
                lat: 34.9829239,
                lng: -85.425584,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Chattanooga",
          place_id: "ChIJheeDikBgYIgRqiiHiR8mcSQ",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Cincinnati, OH, USA",
          geometry: {
            location: {
              lat: 39.1031182,
              lng: -84.5120196,
            },
            viewport: {
              northeast: {
                lat: 39.2207591,
                lng: -84.36875479999999,
              },
              southwest: {
                lat: 39.051921,
                lng: -84.71204809999999,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Cincinnati",
          place_id: "ChIJ-SE43rFRQIgRF5PA5It--2k",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Dayton, OH, USA",
          geometry: {
            location: {
              lat: 39.7589478,
              lng: -84.1916069,
            },
            viewport: {
              northeast: {
                lat: 39.9208229,
                lng: -84.0929378,
              },
              southwest: {
                lat: 39.7018339,
                lng: -84.3113769,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Dayton",
          place_id: "ChIJAxTdrtWAQIgR5EwO8pLjQKY",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Franklin, OH 45005, USA",
          geometry: {
            location: {
              lat: 39.55894739999999,
              lng: -84.30410739999999,
            },
            viewport: {
              northeast: {
                lat: 39.5891638,
                lng: -84.253708,
              },
              southwest: {
                lat: 39.518977,
                lng: -84.3351189,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Franklin",
          place_id: "ChIJUW47rLJhQIgRn7z71tUJiYU",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Harmony, PA, USA",
          geometry: {
            location: {
              lat: 40.801454,
              lng: -80.1272826,
            },
            viewport: {
              northeast: {
                lat: 40.80925089999999,
                lng: -80.112121,
              },
              southwest: {
                lat: 40.7913609,
                lng: -80.131894,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Harmony",
          place_id: "ChIJE_OC6UB-NIgRY-JeuyfTPeg",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Huber Heights, OH, USA",
          geometry: {
            location: {
              lat: 39.84394699999999,
              lng: -84.12466080000002,
            },
            viewport: {
              northeast: {
                lat: 39.899155,
                lng: -84.051039,
              },
              southwest: {
                lat: 39.818351,
                lng: -84.17546,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Huber Heights",
          place_id: "ChIJv4Ktljl9P4gRwDzoFx-gGgc",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Kettering, OH, USA",
          geometry: {
            location: {
              lat: 39.68950359999999,
              lng: -84.1688274,
            },
            viewport: {
              northeast: {
                lat: 39.736801,
                lng: -84.1003269,
              },
              southwest: {
                lat: 39.6546169,
                lng: -84.21472899999999,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Kettering",
          place_id: "ChIJ8SLXDKSFQIgRpnJQASMjVq8",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Lebanon, OH 45036, USA",
          geometry: {
            location: {
              lat: 39.4353373,
              lng: -84.2029922,
            },
            viewport: {
              northeast: {
                lat: 39.467597,
                lng: -84.160212,
              },
              southwest: {
                lat: 39.3653729,
                lng: -84.27004099999999,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Lebanon",
          place_id: "ChIJSU5wSCf0QIgRlDsilDNt6KU",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Loveland, OH, USA",
          geometry: {
            location: {
              lat: 39.2689476,
              lng: -84.26382600000001,
            },
            viewport: {
              northeast: {
                lat: 39.288937,
                lng: -84.2329029,
              },
              southwest: {
                lat: 39.250554,
                lng: -84.306939,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Loveland",
          place_id: "ChIJK9z2ofxVQIgRLIZ2Io3s3XA",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Maineville, OH 45039, USA",
          geometry: {
            location: {
              lat: 39.3150592,
              lng: -84.22076969999999,
            },
            viewport: {
              northeast: {
                lat: 39.320702,
                lng: -84.2121629,
              },
              southwest: {
                lat: 39.3113929,
                lng: -84.2287399,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Maineville",
          place_id: "ChIJlfyOIjj4QIgRdDHPjEM6Pck",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Miamisburg, OH, USA",
          geometry: {
            location: {
              lat: 39.6428362,
              lng: -84.2866083,
            },
            viewport: {
              northeast: {
                lat: 39.661568,
                lng: -84.21510099999999,
              },
              southwest: {
                lat: 39.5966479,
                lng: -84.327636,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Miamisburg",
          place_id: "ChIJjVJnuoBiQIgR9yJWFI8WWg4",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Middletown, OH, USA",
          geometry: {
            location: {
              lat: 39.5150576,
              lng: -84.39827629999999,
            },
            viewport: {
              northeast: {
                lat: 39.548798,
                lng: -84.292515,
              },
              southwest: {
                lat: 39.4598159,
                lng: -84.42091080000002,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Middletown",
          place_id: "ChIJewQnqORdQIgRIAbP-R2gGgc",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Rapid City, SD, USA",
          geometry: {
            location: {
              lat: 44.0805434,
              lng: -103.2310149,
            },
            viewport: {
              northeast: {
                lat: 44.136807,
                lng: -103.0393968,
              },
              southwest: {
                lat: 44.002127,
                lng: -103.325763,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Rapid City",
          place_id: "ChIJ-6W7nqVCfYcRx7eTPlphccQ",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Springboro, OH, USA",
          geometry: {
            location: {
              lat: 39.5522815,
              lng: -84.2332718,
            },
            viewport: {
              northeast: {
                lat: 39.596857,
                lng: -84.1910291,
              },
              southwest: {
                lat: 39.520634,
                lng: -84.277092,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Springboro",
          place_id: "ChIJHTQQ4CeJQIgRKiJzNdF2-04",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Trotwood, OH, USA",
          geometry: {
            location: {
              lat: 39.7972788,
              lng: -84.3113334,
            },
            viewport: {
              northeast: {
                lat: 39.833579,
                lng: -84.25344179999999,
              },
              southwest: {
                lat: 39.7457889,
                lng: -84.3671408,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Trotwood",
          place_id: "ChIJHfwl405-QIgRAvuoojQyFRI",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Troy, OH 45373, USA",
          geometry: {
            location: {
              lat: 40.0394982,
              lng: -84.20327669999999,
            },
            viewport: {
              northeast: {
                lat: 40.0760379,
                lng: -84.1735889,
              },
              southwest: {
                lat: 40.009563,
                lng: -84.268427,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Troy",
          place_id: "ChIJI12RHwN3P4gRBQuOglWXaQM",
          types: [
            "locality",
            "political"
            ],
        },
        {
          createdOn: new Date(),
          formatted_address: "Vandalia, OH, USA",
          geometry: {
            location: {
              lat: 39.89061219999999,
              lng: -84.1988308,
            },
            viewport: {
              northeast: {
                lat: 39.9229798,
                lng: -84.1572229,
              },
              southwest: {
                lat: 39.834283,
                lng: -84.2554858,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
          name: "Vandalia",
          place_id: "ChIJaR9VEGB-P4gRPrKS33kdacY",
          types: [
            "locality",
            "political"
            ],
        },
      ],
    }
  },
  methods: {
    generateRegions() {
      this.starterRegions.map((region) => {
        return fb.regionsCollection.add(region);
      });
    },
  }
};
</script>
