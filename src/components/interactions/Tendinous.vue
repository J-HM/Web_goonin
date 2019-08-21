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
			<v-text-field 
				v-model="reply" 
				label="답장받을 메일주소 (선택)" 
				single-line 
				full-width 
				hide-details
				clearable
			></v-text-field>
			
			<v-divider class='mx-3'></v-divider>
			
			<v-text-field 
				v-model="title" 
				label="제목" 
				single-line 
				full-width 
				hide-details 
				clearable
			></v-text-field>
			
			<v-divider class='mx-3'></v-divider>
			
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
	export default {
		data: () => ({
			reply: '',
			title: '',
			content: '',
		}),
		methods: {
			send() {
				firebase.firestore().collection("tend").add({
					reply: this.reply,
					title: this.title,
					rating: this.content,
				}).then(function(docRef) {
					this.$emit('back1')
					console.log("Document written with ID: ", docRef.id);
				}).catch(function(error) {
					this.$emit('back1')
					console.error("Error adding document: ", error);
				});
			},
			back() {
				this.$emit('back1')
			},
		}
	}
</script>