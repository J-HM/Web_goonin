<template>
	<v-col cols=8 sm=12>
		<v-card width=400>
			<v-card-title>평가하기</v-card-title>
			<v-form class='mx-1'>
				<v-rating 
					background-color='#80DEEA' 
					color='#80DEEA' 
					half-increments 
					large 
					class='text-center' 
					v-model="rating"
				></v-rating>
				<v-divider class='mx-3'></v-divider>
				<v-textarea 
					v-model="content" 
					label="한줄평 (선택)" 
					counter 
					maxlength="100" 
					full-width 
					single-line
				></v-textarea>
			</v-form>
			<v-card-actions flat color="primary">
				<v-btn @click="back" icon class='mr-n5'>
					<v-icon color='secondary'>mdi-arrow-left-thick</v-icon>
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn @click="send" icon>
					<v-icon color='secondary'>mdi-send</v-icon>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-col>
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