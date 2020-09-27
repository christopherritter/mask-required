<template>
  <v-btn @click="generateReviews">Generate Reviews</v-btn>
</template>

<script>
import firebase from "@/firebase";
import * as fb from "@/firebase";

export default {
  name: "generate-reviews",
  data() {
    return {
      starterReviews: [
        {
          agreement: true,
          content: "Seems like more people are getting tired of the regulations and choosing to be more lax with them inside the stores. I saw a number of customers choosing not to wear them at all. And a few of the employees put them on when I walked by.",
          createdOn: new Date(),
          likes: 0,
          masks: {
            customers: "Most of the customers were wearing masks",
            employees: "Most of the employees were wearing some kind of mask"
          },
          place: {
            types: [
              "department_store",
              "supermarket",
              "electronics_store",
              "home_goods_store",
              "clothing_store"
            ],
            place_id: "ChIJE0gEqdthQIgRcrpG-2TQ2cI"
          },
          questions: [
            {
              id: 0,
              value: "yes"
            },
            {
              id: 1,
              value: "no"
            },
            {
              id: 2,
              value: "yes"
            },
            {
              id: 3,
              value: "unsure"
            },
            {
              id: 4,
              value: "unsure"
            },
            {
              id: 5,
              value: "unsure"
            },
            {
              id: 6,
              value: "yes"
            },
            {
              id: 7,
              value: "no"
            },
            {
              id: 8,
              value: "no"
            },
            {
              id: 9,
              value: "no"
            },
            {
              id: 10,
              value: "no"
            },
            {
              id: 11,
              value: "yes"
            },
          ],
          rating: 1,
          ratings: [
            {
              id: 0,
              value: 3
            },
            {
              id: 1,
              value: 4
            },
            {
              id: 2,
              value: 2
            },
          ],
          reviewId: "E98kWybZBIWJA667pqxoLpnewVh2_vzYsrpqXSsHonU9LJ0dJ",
          title: "Going downhill fast with their enforcement",
          userId: "E98kWybZBIWJA667pqxoLpnewVh2",
          userName: "Christopher Ritter"
        },
        {
          agreement: true,
          content: "I was immediately greeted by staff at entry, so I assumed the number of shoppers in the store was monitored. Directional signs were on the floor. The store was not crowded. I've shopped there pre-COVID and there was less room between tables and racks at that time, so it looks like they have limited some of their fixtures to allow more space while shopping. I had an item to return. They had an extended space between cashier and customer to enforce 6' as well as a plexiglass barrier. Returns required you to self-bag your item into a plastic bag provided, then hand it to them to scan for the return. Then, you place it aside in a designated bin. You have to sign the card reader for transactions, but they have a pump bottle of hand sanitizer right next to it - and it's the good kind, not that watery cheap stuff. They have only one fitting room open that they regularly wipe down.",
          createdOn: new Date(),
          likes: 0,
          masks: {
            customers: "All of the customers were wearing masks",
            employees: "All of the employees were properly wearing masks"
          },
          place: {
            types: [
              "shoe_store",
              "clothing_store"
            ],
            place_id: "ChIJpdwUhTOFQIgRLuXt_Rrr2Nw"
          },
          questions: [
            {
              id: 0,
              value: "yes"
            },
            {
              id: 1,
              value: "yes"
            },
            {
              id: 2,
              value: "yes"
            },
            {
              id: 3,
              value: "yes"
            },
            {
              id: 4,
              value: "no"
            },
            {
              id: 5,
              value: "unsure"
            },
            {
              id: 6,
              value: "unsure"
            },
            {
              id: 7,
              value: "yes"
            },
            {
              id: 8,
              value: "yes"
            },
            {
              id: 9,
              value: "yes"
            },
            {
              id: 10,
              value: "yes"
            },
            {
              id: 11,
              value: "yes"
            },
          ],
          rating: 1,
          ratings: [
            {
              id: 0,
              value: 5
            },
            {
              id: 1,
              value: 5
            },
            {
              id: 2,
              value: 4
            },
          ],
          reviewId: "KC9f7Oy0i5W3tVTDJq2ECjNCe6I3_uY84nDOvjHqroVbr4IaT",
          title: "Good compliance. I didn't see any customers enter without masks.",
          userId: "KC9f7Oy0i5W3tVTDJq2ECjNCe6I3",
          userName: "Dorie Watts"
        },
        {
          agreement: true,
          content: "When I walked in an off-duty manager was helping a trainee ring up her order. Neither of them were wearing masks. The rest of the employees were all wearing masks in some fashion -- under their noses, under their chins. Only a few had them covering their faces while everyone was packed tightly together, screaming about putting the pizzas in boxes properly.",
          createdOn: new Date(),
          id: "dqD7kzSJdAPqwtq1Vbpe",
          likes: 0,
          masks: {
            customers: "I didn't see any customers.",
            employees: "Only a few employees were wearing their masks properly"
          },
          place: {
            types: [
              "meal_takeaway",
              "restaurant"
            ],
            place_id: "ChIJC5tV_VqKQIgRo0s3A1FXiKs"
          },
          questions: [
            {
              id: 0,
              value: "no"
            },
            {
              id: 1,
              value: "no"
            },
            {
              id: 2,
              value: "no"
            },
            {
              id: 3,
              value: "no"
            },
            {
              id: 4,
              value: "no"
            },
            {
              id: 5,
              value: "no"
            },
            {
              id: 6,
              value: "yes"
            },
            {
              id: 7,
              value: "no"
            },
            {
              id: 8,
              value: "no"
            },
            {
              id: 9,
              value: "no"
            },
            {
              id: 10,
              value: "no"
            },
            {
              id: 11,
              value: "no"
            },
          ],
          rating: 1,
          ratings: [
            {
              id: 0,
              value: 2
            },
            {
              id: 1,
              value: 1
            },
            {
              id: 2,
              value: 2
            },
          ],
          reviewId: "E98kWybZBIWJA667pqxoLpnewVh2_dqD7kzSJdAPqwtq1Vbpe",
          title: "Everyone was doing their own thing as far as wearing masks goes. ",
          userId: "E98kWybZBIWJA667pqxoLpnewVh2",
          userName: "Christopher Ritter"
        },
        {
          agreement: true,
          content: "The store does a really good job at protecting customers from the spread of the virus. Great messaging, free masks, folks wiping down carts, and wipes to do it yourself. The customers even appear to respect one another by wearing their masks properly. I only saw noses peeking out over their masks, and they were primarily employee noses. ",
          createdOn: new Date(),
          likes: 0,
          masks: {
            customers: "All of the customers were wearing masks",
            employees: "Most of the employees were wearing some kind of mask"
          },
          place: {
            types: [],
            place_id: "ChIJIVgmb2WKQIgRdM_tezuq6v4"
          },
          questions: [
            {
              id: 0,
              value: "no"
            },
            {
              id: 1,
              value: "no"
            },
            {
              id: 2,
              value: "yes"
            },
            {
              id: 3,
              value: "yes"
            },
            {
              id: 4,
              value: "yes"
            },
            {
              id: 5,
              value: "yes"
            },
            {
              id: 6,
              value: "yes"
            },
            {
              id: 7,
              value: "yes"
            },
            {
              id: 8,
              value: "no"
            },
            {
              id: 9,
              value: "no"
            },
            {
              id: 10,
              value: "no"
            },
            {
              id: 11,
              value: "no"
            },
          ],
          rating: 1,
          ratings: [
            {
              id: 0,
              value: 4
            },
            {
              id: 1,
              value: 5
            },
            {
              id: 2,
              value: 2
            },
          ],
          reviewId: "E98kWybZBIWJA667pqxoLpnewVh2_39SNC6JVZAOQ7e8SV3gZ",
          title: "I only saw a few noses peeking out over their masks, primarily employee noses.",
          userId: "E98kWybZBIWJA667pqxoLpnewVh2",
          userName: "Christopher Ritter"
        },
        {
          agreement: true,
          content: "Shoppers appeared to comply with the mask requirement and keep their distance from one another.",
          createdOn: new Date(),
          id: "QAXKd5gFAFhSga4NJxBd",
          likes: 0,
          masks: {
            customers: "All of the customers were wearing masks",
            employees: "All of the employees were properly wearing masks"
          },
          place: {
            types: [
              "department_store",
              "supermarket",
              "electronics_store",
              "home_goods_store",
              "clothing_store"
            ],
            place_id: "ChIJBcgcNU1CfYcR3i78H4GdpK0"
          },
          questions: [
            {
              id: 0,
              value: "yes"
            },
            {
              id: 1,
              value: "no"
            },
            {
              id: 2,
              value: "yes"
            },
            {
              id: 3,
              value: "yes"
            },
            {
              id: 4,
              value: "unsure"
            },
            {
              id: 5,
              value: "unsure"
            },
            {
              id: 6,
              value: "yes"
            },
            {
              id: 7,
              value: "yes"
            },
            {
              id: 8,
              value: "yes"
            },
            {
              id: 9,
              value: "unsure"
            },
            {
              id: 10,
              value: "unsure"
            },
            {
              id: 11,
              value: "unsure"
            },
          ],
          rating: 1,
          ratings: [
            {
              id: 0,
              value: 5
            },
            {
              id: 1,
              value: 5
            },
            {
              id: 2,
              value: 5
            },
          ],
          reviewId: "CvypfRkwJmNacM30u8jFFCZZHvf2_QAXKd5gFAFhSga4NJxBd",
          title: "Masks required",
          userId: "CvypfRkwJmNacM30u8jFFCZZHvf2",
          userName: "Molly J Wray"
        },
        {
          agreement: true,
          content: "This store does a nice job requiring and enforcing masks",
          createdOn: new Date(),
          id: "wyayQgLIW4wrWIKE50Yn",
          likes: 0,
          masks: {
            customers: "All of the customers were wearing masks",
            employees: "All of the employees were properly wearing masks"
          },
          place: {
            types: [
              "department_store",
              "supermarket",
              "electronics_store",
              "home_goods_store",
              "clothing_store",
            ],
            place_id: "ChIJBcgcNU1CfYcR3i78H4GdpK0"
          },
          questions: [
            {
              id: 0,
              value: "yes"
            },
            {
              id: 1,
              value: "no"
            },
            {
              id: 2,
              value: "yes"
            },
            {
              id: 3,
              value: "yes"
            },
            {
              id: 4,
              value: "unsure"
            },
            {
              id: 5,
              value: "unsure"
            },
            {
              id: 6,
              value: "yes"
            },
            {
              id: 7,
              value: "yes"
            },
            {
              id: 8,
              value: "yes"
            },
            {
              id: 9,
              value: "unsure"
            },
            {
              id: 10,
              value: "unsure"
            },
            {
              id: 11,
              value: "yes"
            },
          ],
          rating: 1,
          ratings: [
            {
              id: 0,
              value: 5
            },
            {
              id: 1,
              value: 5
            },
            {
              id: 2,
              value: 5
            },
          ],
          reviewId: "CvypfRkwJmNacM30u8jFFCZZHvf2_wyayQgLIW4wrWIKE50Yn",
          title: "Yes to masks",
          userId: "CvypfRkwJmNacM30u8jFFCZZHvf2",
          userName: "Molly J Wray"
        },
        {
          agreement: true,
          content: "Your right to wear a mask is respected. Some people do, some don't. Social distancing is practiced by the majority of the players and there are plenty of places to sit in between games to keep your space from others. Hand sanitizer stations are available throughout the complex and a notice is on the fence that requires those who feel sick to stay home.This website is particularly for stores so the “store” procedure ratings that follow in this review are not that applicable. ",
          createdOn: new Date(),
          likes: 0,
          masks: {
            customers: "Only a few customers were wearing masks",
            employees: "Only a few employees were wearing their masks properly"
          },
          place: {
            types: [],
            place_id: "ChIJ5ztOBZpnQIgRPiUDWvlSJhQ"
          },
          questions: [
            {
              id: 0,
              value: "unsure"
            },
            {
              id: 1,
              value: "unsure"
            },
            {
              id: 2,
              value: "unsure"
            },
            {
              id: 3,
              value: "unsure"
            },
            {
              id: 4,
              value: "unsure"
            },
            {
              id: 5,
              value: "unsure"
            },
            {
              id: 6,
              value: "unsure"
            },
            {
              id: 7,
              value: "yes"
            },
            {
              id: 8,
              value: "no"
            },
            {
              id: 9,
              value: "unsure"
            },
            {
              id: 10,
              value: "unsure"
            },
            {
              id: 11,
              value: "no"
            },
          ],
          rating: 1,
          ratings: [
            {
              id: 0,
              value: 4
            },
            {
              id: 1,
              value: 4
            },
            {
              id: 2,
              value: 3
            },
          ],
          reviewId: "CvypfRkwJmNacM30u8jFFCZZHvf2_SX1nxTjA04UyUX20VZNN",
          title: "Good place to play",
          userId: "CvypfRkwJmNacM30u8jFFCZZHvf2",
          userName: "Molly J Wray"
        },
        {
          agreement: true,
          content: "Despite adequate signage, both customers and employees alike were either not wearing or incorrectly wearing masks. It was scary!",
          createdOn: new Date(),
          id: "",
          likes: 0,
          masks: {
            customers: "Only a few customers were wearing masks",
            employees: "Only a few employees were wearing their masks properly"
          },
          place: {
            types: [
              "supermarket",
              "bakery",
              "liquor_store"
            ],
            place_id: "ChIJxy1WPgCZqYkRkeRpkzpTOFk",
          },
          questions: [
            {
              id: 0,
              value: "no"
            },
            {
              id: 1,
              value: "no"
            },
            {
              id: 2,
              value: "yes"
            },
            {
              id: 3,
              value: "no"
            },
            {
              id: 4,
              value: "no"
            },
            {
              id: 5,
              value: "no"
            },
            {
              id: 6,
              value: "yes"
            },
            {
              id: 7,
              value: "yes"
            },
            {
              id: 8,
              value: "no"
            },
            {
              id: 9,
              value: "no"
            },
            {
              id: 10,
              value: "no"
            },
            {
              id: 11,
              value: "no"
            },
          ],
          rating: 1,
          ratings: [
            {
              id: 0,
              value: 1
            },
            {
              id: 1,
              value: 4
            },
            {
              id: 2,
              value: 1
            },
          ],
          reviewId: "RDFemBYtpNgdK3OApRdGthAPTSx1_CVOo3a3HgeAj3P86IraV",
          title: "Masks? Who uses those any more?",
          userId: "RDFemBYtpNgdK3OApRdGthAPTSx1",
          userName: "Noel Levine"
        },
        {
          agreement: true,
          content: "We were the only folks with a mask. We ended up eating our hot dogs in the car with the windows up. There were tables and tables of folks with no mask on and employees were unmasked.",
          createdOn: new Date(),
          likes: 0,
          masks: {
            customers: "None of the customers were wearing masks",
            employees: "None of the employees were properly wearing masks"
          },
          place: {
            types: [
              "restaurant"
            ],
            place_id: "ChIJz9ZSmJaiqYkRKYlRFYLqiqw"
          },
          questions: [
            {
              id: 0,
              value: "no"
            },
            {
              id: 1,
              value: "no"
            },
            {
              id: 2,
              value: "yes"
            },
            {
              id: 3,
              value: "no"
            },
            {
              id: 4,
              value: "no"
            },
            {
              id: 5,
              value: "no"
            },
            {
              id: 6,
              value: "no"
            },
            {
              id: 7,
              value: "no"
            },
            {
              id: 8,
              value: "no"
            },
            {
              id: 9,
              value: "no"
            },
            {
              id: 10,
              value: "no"
            },
            {
              id: 11,
              value: "no"
            },
          ],
          rating: 1,
          ratings: [
            {
              id: 0,
              value: 1
            },
            {
              id: 1,
              value: 1
            },
            {
              id: 2,
              value: 1
            },
          ],
          reviewId: "RDFemBYtpNgdK3OApRdGthAPTSx1_z02dyhSLJ2n65HIGKDbI",
          title: "No one else with a mask...",
          userId: "RDFemBYtpNgdK3OApRdGthAPTSx1",
          userName: "Noel Levine"
        },
      ],
    }
  },
  methods: {
    generateReviews() {
      this.starterReviews.map((review) => {
        return fb.reviewsCollection.add(review);
      });
    },
  }
};
</script>
