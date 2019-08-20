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
      <v-text-field
        v-model="reply"
        label="답장받을 메일주소 (선택)"
        single-line
        full-width
        hide-details
      ></v-text-field>
      <v-divider></v-divider>
      <v-text-field
        v-model="title"
        label="제목"
        single-line
        full-width
        hide-details
      ></v-text-field>
      <v-divider></v-divider>
      <v-textarea
        v-model="content"
        label="건의사항"
        counter
        maxlength="150"
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
        reply: '',
        title: '',
        content: '',
      }
    },
    
    methods: { 
      send() {
        db.collection("건의").add({
          reply: this.reply,
          title: this.title,
          content: this.content,
        })
        .then(function(docRef) {
          this.$emit('back1')
          
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      },
      
      back () {
        this.$emit('back1')
      },
    }
  }
</script>