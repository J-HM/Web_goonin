<template>
  <v-card width=400>
    <v-toolbar flat color="primary">
      <v-btn @click="back" icon class='mr-n5'>
        <v-icon>mdi-arrow-left-thick</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
   
      <v-btn @click="send" icon>
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-toolbar>
    
    <v-form>
      <v-rating 
        background-color='secondary'
        color='secondary'
        half-increments
        large
        class='text-center'
        v-model="rating"
      ></v-rating>
      <v-divider></v-divider>
      <v-textarea
        v-model="content"
        label="한줄평"
        counter
        maxlength="100"
        full-width
        single-line
      ></v-textarea>
    </v-form>
  </v-card>
</template>

<script>
  const firebase = require("firebase");
  require("firebase/firestore");
  
  firebase.initializeApp({
    apiKey: 'AIzaSyB2-2VJyRCRa3GYxBjlUwOUyakX_nstoOs',
    authDomain: 'goonin-e0c85.firebaseapp.com',
    projectId: 'goonin-e0c85'
  });

  var db = firebase.firestore();
  export default {
    data () {
      return {
        content: '',
        rating: 5
      }
    },
    
    methods: {
      send () {
        db.collection("평가").add({
          rating: this.rating,
          content: this.content,
        })
        .then(function(docRef) {
          this.$emit('back2')
          
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      },
      
      back () {
        this.$emit('back2')
      },
    }
  }
</script>