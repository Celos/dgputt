<template>
	<div>
		<div class="scoring__inputs">
			<v-btn x-large v-for="(val, idx) in discs + 1" :key="idx"
					color="primary" @click="sendScore(idx)" class="scoring__btn">
				{{idx}}
			</v-btn>
		</div>
	</div>
</template>

<script lang="ts">
	
	import Vue from "vue";
	
	const keymap: {[id: number] : number} = {
		48 : 0, 96 : 0,
		49 : 1, 97 : 1,
		50 : 2, 98 : 2,
		51 : 3, 99 : 3,
		52 : 4, 100 : 4,
		53 : 5, 101 : 5,
		54 : 6, 102 : 6,
		55 : 7, 103 : 7,
		56 : 8, 104 : 8,
		57 : 9, 105 : 9
	};
	
	export default Vue.extend({
		name: "ScoreInput",
		props: {
			discs: {
				type: Number,
				required: true
			}
		},
		methods: {
			onKeyUp(e: KeyboardEvent) {
				e.preventDefault();
				let key = e.keyCode || e.charCode || 0;
				if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
					let val = keymap[key];
					if (val != null && val <= this.discs) {
						this.sendScore(val);
					}
				}
			},
			sendScore(val: number): void {
				this.$emit("score", val);
			}
		},
		mounted(): void {
			window.addEventListener("keyup", this.onKeyUp);
		},
		beforeDestroy(): void {
			window.removeEventListener("keyup", this.onKeyUp);
		}
	});
</script>

<style scoped>
	.scoring__inputs {
		display: grid;
		grid-gap: 0.3rem;
		align-items: center;
		justify-content: center;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, 1fr);
	}
	.scoring__inputs .scoring__btn {
		height: 5rem;
	}
</style>
