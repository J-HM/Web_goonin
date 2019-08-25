<template>
	<v-col cols=8 sm=12>
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
			<v-alert 
				border="top"
				colored-border
				color="" 
				type="error" 
				v-show='error_view'>
				제목과 건의사항은 필수입력 항목입니다.
			</v-alert>
		</v-card>
	</v-col>
</template>

<script>
	export default {
		data: () => ({
			reply: '',
			title: '',
			content: '',
			
			error_view: false,
		}),
		methods: {
			send() {
				if(this.title != '' && this.content != '') {
					firebase.firestore().collection("tend").add({
						reply: this.reply,
						title: this.title,
						rating: this.content,
					})
					this.back()
				} else {
					this.error_view = true
				}
				
			},
			back() {
				this.$emit('back1')
			},
		}
	}
</script>