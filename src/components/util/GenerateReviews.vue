<template>
  <v-btn @click="generateReviews" block>Generate Reviews</v-btn>
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
          content:
            "I was immediately greeted by staff at entry, so I assumed the number of shoppers in the store was monitored. Directional signs were on the floor. The store was not crowded. I've shopped there pre-COVID and there was less room between tables and racks at that time, so it looks like they have limited some of their fixtures to allow more space while shopping. I had an item to return. They had an extended space between cashier and customer to enforce 6' as well as a plexiglass barrier. Returns required you to self-bag your item into a plastic bag provided, then hand it to them to scan for the return. Then, you place it aside in a designated bin. You have to sign the card reader for transactions, but they have a pump bottle of hand sanitizer right next to it - and it's the good kind, not that watery cheap stuff. They have only one fitting room open that they regularly wipe down.",
          createdOn: new Date(),
          docId: "uY84nDOvjHqroVbr4IaT",
          likes: 0,
          masks: {
            customers: "All of the customers were wearing masks",
            employees: "All of the employees were properly wearing masks",
          },
          place: {
            types: ["shoe_store", "clothing_store"],
            place_id: "ChIJpdwUhTOFQIgRLuXt_Rrr2Nw",
          },
          questions: [
            { id: 0, value: "yes" },
            { id: 1, value: "yes" },
            { id: 2, value: "yes" },
            { id: 3, value: "yes" },
            { id: 4, value: "no" },
            { id: 5, value: "unsure" },
            { id: 6, value: "unsure" },
            { id: 7, value: "yes" },
            { id: 8, value: "yes" },
            { id: 9, value: "yes" },
            { id: 10, value: "yes" },
            { id: 11, value: "yes" },
          ],
          rating: 1,
          ratings: [
            { id: 0, value: 5 },
            { id: 1, value: 5 },
            { id: 2, value: 4 },
          ],
          reviewId: "KC9f7Oy0i5W3tVTDJq2ECjNCe6I3_uY84nDOvjHqroVbr4IaT",
          title:
            "Good compliance. I didn't see any customers enter without masks.",
          userId: "KC9f7Oy0i5W3tVTDJq2ECjNCe6I3",
          userName: "Dorie Watts",
        },
        {
          agreement: true,
          content:
            "Everyone is wearing masks and social distancing. I was there on a Saturday afternoon and it was very busy but everyone did follow the rules!!",
          createdOn: new Date(),
          docId: "5qgpzGnzZ7euqcBj2P4n",
          likes: 0,
          masks: {
            customers: "All of the customers were wearing masks",
            employees: "All of the employees were properly wearing masks",
          },
          place: {
            place_id: "ChIJJ9OKMgJ9P4gRNH60GsLIPpo",
            types: ["department_store"],
          },
          questions: [
            { id: 0, value: "unsure" },
            { id: 1, value: "yes" },
            { id: 2, value: "yes" },
            { id: 3, value: "unsure" },
            { id: 4, value: "unsure" },
            { id: 5, value: "yes" },
            { id: 6, value: "yes" },
            { id: 7, value: "yes" },
            { id: 8, value: "yes" },
            { id: 9, value: "yes" },
            { id: 10, value: "no" },
            { id: 11, value: "no" },
          ],
          rating: 5,
          ratings: [
            { id: 0, value: 5 },
            { id: 1, value: 5 },
            { id: 2, value: 5 },
          ],
          reviewId: "tFW5Z0AakNOq68tD7gbBXm0a38T2_5qgpzGnzZ7euqcBj2P4n",
          title: "I felt very safe here.",
          userId: "tFW5Z0AakNOq68tD7gbBXm0a38T2",
          userName: "Susie Gay",
        },
        {
          agreement: true,
          content:
            "I had visited during the day and found most shoppers to be compliant. However, when the sun comes down, the masks come off. Doesn't even look like they enforce the rules anymore.",
          createdOn: new Date(),
          docId: "2stRcgLNCZktZIn3czeH",
          likes: 0,
          masks: {
            customers: "Only a few customers were wearing masks",
            employees: "Most of the employees were wearing some kind of mask",
          },
          place: {
            place_id: "ChIJE0gEqdthQIgRcrpG-2TQ2cI",
            types: [
              "department_store",
              "supermarket",
              "electronics_store",
              "home_goods_store",
              "clothing_store",
            ],
          },
          questions: [
            { id: 0, value: "yes" },
            { id: 1, value: "no" },
            { id: 2, value: "no" },
            { id: 3, value: "no" },
            { id: 4, value: "unsure" },
            { id: 5, value: "yes" },
            { id: 6, value: "yes" },
            { id: 7, value: "unsure" },
            { id: 8, value: "no" },
            { id: 9, value: "no" },
            { id: 10, value: "no" },
            { id: 11, value: "yes" },
          ],
          rating: 2,
          ratings: [
            { id: 0, value: 2 },
            { id: 1, value: 3 },
            { id: 2, value: 1 },
          ],
          reviewId: "E98kWybZBIWJA667pqxoLpnewVh2_2stRcgLNCZktZIn3czeH",
          title: "The freaks come out at night!",
          userId: "E98kWybZBIWJA667pqxoLpnewVh2",
          userName: "Christopher Ritter",
        },
        {
          agreement: true,
          content:
            "Walmart has been working hard to protect their customer since the beginning of the pandemic. When Ohio passed the mandate, they were first to restrict the number of customers inside the store. They also appointed special people to enforce the mask requirement in their stores. Most of the employees take it seriously as well although there are a few who think they're exempt!",
          createdOn: new Date(),
          docId: "b39egAGP4wR3OZvz9s0w",
          likes: 0,
          masks: {
            customers: "All of the customers were wearing masks",
            employees: "Most of the employees were wearing some kind of mask",
          },
          place: {
            place_id: "ChIJE0gEqdthQIgRcrpG-2TQ2cI",
            types: [
              "department_store",
              "supermarket",
              "grocery_or_supermarket",
              "electronics_store",
              "home_goods_store",
              "food",
              "clothing_store",
            ],
          },
          questions: [
            { id: 0, value: "yes" },
            { id: 1, value: "yes" },
            { id: 2, value: "yes" },
            { id: 3, value: "yes" },
            { id: 4, value: "unsure" },
            { id: 5, value: "unsure" },
            { id: 6, value: "yes" },
            { id: 7, value: "yes" },
            { id: 8, value: "yes" },
            { id: 9, value: "yes" },
            { id: 10, value: "yes" },
            { id: 11, value: "yes" },
          ],
          rating: 5,
          ratings: [
            { id: 0, value: 5 },
            { id: 1, value: 5 },
            { id: 2, value: 5 },
          ],
          reviewId: "E98kWybZBIWJA667pqxoLpnewVh2_b39egAGP4wR3OZvz9s0w",
          title: "Way better than you might expect!",
          userId: "E98kWybZBIWJA667pqxoLpnewVh2",
          userName: "Christopher Ritter",
        },
        {
          agreement: true,
          content:
            "Initially walking in, only one set of doors (grocery entrance) were available to enter and exit from. Barriers were setup to corral traffic into the store. Inside the barriers, an employee wearing a mask was stationed to confirm each shopper was wearing a mask upon entrance. I did hear the employee instruct a shopper to “makes sure you put on your mask before you enter the store.” Walking into the store itself, there were large signs to remind you to remain 6 feet apart. On the floor, were stickers with directions for traffic flow. I did see a handful of shoppers with their masks removed and roughly 15% with their noses not being covered. Even with a small level of noncompliance, I felt much more comfortable than I initially thought I would shopping at Walmart during this time.",
          createdOn: new Date(),
          docId: "fWCcWEiTnfC2rD77Qfzx",
          likes: 0,
          masks: {
            customers: "Most of the customers were wearing masks",
            employees: "All of the employees were properly wearing masks",
          },
          place: {
            place_id: "ChIJE0gEqdthQIgRcrpG-2TQ2cI",
            types: [
              "department_store",
              "supermarket",
              "grocery_or_supermarket",
              "electronics_store",
              "home_goods_store",
              "food",
              "clothing_store",
            ],
          },
          questions: [
            { id: 0, value: "yes" },
            { id: 1, value: "yes" },
            { id: 2, value: "yes" },
            { id: 3, value: "yes" },
            { id: 4, value: "unsure" },
            { id: 5, value: "no" },
            { id: 6, value: "yes" },
            { id: 7, value: "yes" },
            { id: 8, value: "yes" },
            { id: 9, value: "no" },
            { id: 10, value: "no" },
            { id: 11, value: "yes" },
          ],
          rating: 4,
          ratings: [
            { id: 0, value: 4 },
            { id: 1, value: 5 },
            { id: 2, value: 4 },
          ],
          reviewId: "4gSEFUvazVgYQUxfE8xb8of3zhN2_fWCcWEiTnfC2rD77Qfzx",
          title: "Surprisingly Comfortable",
          userId: "4gSEFUvazVgYQUxfE8xb8of3zhN2",
          userName: "Betsy Pickett",
        },
        {
          agreement: true,
          content:
            "Seems like more people are getting tired of the regulations and choosing to be more lax with them inside the stores. I saw a number of customers choosing not to wear them at all. And a few of the employees put them on when I walked by.",
          createdOn: new Date(),
          docId: "vzYsrpqXSsHonU9LJ0dJ",
          likes: 0,
          masks: {
            customers: "Most of the customers were wearing masks",
            employees: "Most of the employees were wearing some kind of mask",
          },
          place: {
            types: [
              "department_store",
              "supermarket",
              "electronics_store",
              "home_goods_store",
              "clothing_store",
            ],
            place_id: "ChIJE0gEqdthQIgRcrpG-2TQ2cI",
          },
          questions: [
            { id: 0, value: "yes" },
            { id: 1, value: "no" },
            { id: 2, value: "yes" },
            { id: 3, value: "unsure" },
            { id: 4, value: "unsure" },
            { id: 5, value: "unsure" },
            { id: 6, value: "yes" },
            { id: 7, value: "no" },
            { id: 8, value: "no" },
            { id: 9, value: "no" },
            { id: 10, value: "no" },
            { id: 11, value: "yes" },
          ],
          rating: 1,
          ratings: [
            { id: 0, value: 3 },
            { id: 1, value: 4 },
            { id: 2, value: 2 },
          ],
          reviewId: "E98kWybZBIWJA667pqxoLpnewVh2_vzYsrpqXSsHonU9LJ0dJ",
          title: "Going downhill fast with their enforcement",
          userId: "E98kWybZBIWJA667pqxoLpnewVh2",
          userName: "Christopher Ritter",
        },
        {
          agreement: true,
          content:
            "Shoppers appeared to comply with the mask requirement and keep their distance from one another.",
          createdOn: new Date(),
          docId: "QAXKd5gFAFhSga4NJxBd",
          likes: 0,
          masks: {
            customers: "All of the customers were wearing masks",
            employees: "All of the employees were properly wearing masks",
          },
          place: {
            types: [
              "department_store",
              "supermarket",
              "electronics_store",
              "home_goods_store",
              "clothing_store",
            ],
            place_id: "ChIJBcgcNU1CfYcR3i78H4GdpK0",
          },
          questions: [
            { id: 0, value: "yes" },
            { id: 1, value: "no" },
            { id: 2, value: "yes" },
            { id: 3, value: "yes" },
            { id: 4, value: "unsure" },
            { id: 5, value: "unsure" },
            { id: 6, value: "yes" },
            { id: 7, value: "yes" },
            { id: 8, value: "yes" },
            { id: 9, value: "unsure" },
            { id: 10, value: "unsure" },
            { id: 11, value: "unsure" },
          ],
          rating: 1,
          ratings: [
            { id: 0, value: 5 },
            { id: 1, value: 5 },
            { id: 2, value: 5 },
          ],
          reviewId: "CvypfRkwJmNacM30u8jFFCZZHvf2_QAXKd5gFAFhSga4NJxBd",
          title: "Masks required",
          userId: "CvypfRkwJmNacM30u8jFFCZZHvf2",
          userName: "Molly J Wray",
        },
        {
          agreement: true,
          content: "This store does a nice job requiring and enforcing masks",
          createdOn: new Date(),
          docId: "wyayQgLIW4wrWIKE50Yn",
          likes: 0,
          masks: {
            customers: "All of the customers were wearing masks",
            employees: "All of the employees were properly wearing masks",
          },
          place: {
            place_id: "ChIJBcgcNU1CfYcR3i78H4GdpK0",
            types: [
              "department_store",
              "supermarket",
              "electronics_store",
              "home_goods_store",
              "clothing_store",
            ],
          },
          questions: [
            { id: 0, value: "yes" },
            { id: 1, value: "no" },
            { id: 2, value: "yes" },
            { id: 3, value: "yes" },
            { id: 4, value: "unsure" },
            { id: 5, value: "unsure" },
            { id: 6, value: "yes" },
            { id: 7, value: "yes" },
            { id: 8, value: "yes" },
            { id: 9, value: "unsure" },
            { id: 10, value: "unsure" },
            { id: 11, value: "yes" },
          ],
          rating: 5,
          ratings: [
            { id: 0, value: 5 },
            { id: 1, value: 5 },
            { id: 2, value: 5 },
          ],
          reviewId: "CvypfRkwJmNacM30u8jFFCZZHvf2_wyayQgLIW4wrWIKE50Yn",
          title: "Yes to masks",
          userId: "CvypfRkwJmNacM30u8jFFCZZHvf2",
          userName: "Molly J Wray",
        },
        {
          agreement: true,
          content:
            "Despite adequate signage, both customers and employees alike were either not wearing or incorrectly wearing masks. It was scary!",
          createdOn: new Date(),
          docId: "CVOo3a3HgeAj3P86IraV",
          likes: 0,
          masks: {
            customers: "Only a few customers were wearing masks",
            employees: "Only a few employees were wearing their masks properly",
          },
          place: {
            types: ["supermarket", "bakery", "liquor_store"],
            place_id: "ChIJxy1WPgCZqYkRkeRpkzpTOFk",
          },
          questions: [
            { id: 0, value: "no" },
            { id: 1, value: "no" },
            { id: 2, value: "yes" },
            { id: 3, value: "no" },
            { id: 4, value: "no" },
            { id: 5, value: "no" },
            { id: 6, value: "yes" },
            { id: 7, value: "yes" },
            { id: 8, value: "no" },
            { id: 9, value: "no" },
            { id: 10, value: "no" },
            { id: 11, value: "no" },
          ],
          rating: 1,
          ratings: [
            { id: 0, value: 1 },
            { id: 1, value: 4 },
            { id: 2, value: 1 },
          ],
          reviewId: "RDFemBYtpNgdK3OApRdGthAPTSx1_CVOo3a3HgeAj3P86IraV",
          title: "Masks? Who uses those any more?",
          userId: "RDFemBYtpNgdK3OApRdGthAPTSx1",
          userName: "Noel Levine",
        },
        {
          agreement: false,
          content:
            "There were only two people in the shop, not including myself, and they were all wearing masks. There wasn't any signs posted that I can remember.",
          createdOn: new Date(),
          docId: "kAhtGtWAmtrRTtoh7Bto",
          likes: 0,
          masks: {
            customers: "All of the customers were wearing masks",
            employees: "All of the employees were properly wearing masks",
          },
          place: { place_id: "ChIJGWxv5eqOQIgRjBwJMhn74dI", types: [] },
          questions: [
            { id: 0, value: "unsure" },
            { id: 1, value: "no" },
            { id: 2, value: "no" },
            { id: 3, value: "no" },
            { id: 4, value: "no" },
            { id: 5, value: "unsure" },
            { id: 6, value: "unsure" },
            { id: 7, value: "no" },
            { id: 8, value: "no" },
            { id: 9, value: "no" },
            { id: 10, value: "no" },
            { id: 11, value: "no" },
          ],
          rating: 5,
          ratings: [
            { id: 0, value: 4 },
            { id: 1, value: 2 },
            { id: 2, value: 2 },
          ],
          reviewId: "E98kWybZBIWJA667pqxoLpnewVh2_kAhtGtWAmtrRTtoh7Bto",
          title: "Small shop but they respect the mask mandate.",
          userId: "E98kWybZBIWJA667pqxoLpnewVh2",
          userName: "Christopher Ritter",
        },
      ],
    };
  },
  methods: {
    async generateReviews() {
      for (let r = 0; r < this.starterReviews.length; r++) {
        let review = this.starterReviews[r];

        const places = await fb.placesCollection
          .where("place_id", "==", review.place.place_id)
          .get();

        if (!places) {
          return;
        }

        places.forEach((doc) => {
          return fb.placesCollection
            .doc(doc.id)
            .collection("reviews")
            .doc(review.docId)
            .set(review);
        });
      }
    },
  },
};
</script>
