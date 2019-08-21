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

		<v-form class='mx-1'>
			<v-rating 
				background-color='secondary' 
				color='secondary' 
				half-increments 
				large class='text-center' 
				v-model="rating"
			></v-rating>
			<v-divider class='mx-3'></v-divider>
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
	export default {
		data: () => ({
			content: '',
			rating: 5
		}),
		methods: {
			send() {
				firebase.firestore().collection("eval").add({
					content: this.content,
					rating: this.rating,
				}).then(function(docRef) {
					console.log("Document written with ID: ", docRef.id);
				}).catch(function(error) {
					console.error("Error adding document: ", error);
				});
				this.back()
			},
			
			back() {
				this.$emit('back2')
			},
		}
	}
</script>