<template>
	<v-card>
		<v-card-text class="game-selection__container">
			<template v-for="rule in rules">
				<v-btn color="primary" :key="rule.id + '-btn'" class="game-selection__btn"
						@click="startGame(rule.id)">
					{{$t(rule.id)}}
				</v-btn>
				<div :key="rule.id + '-desc'" class="game-selection__description">
					{{$t(rule.id + ".description")}}
				</div>
			</template>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
	import Vue from "vue";
	import Rules from './rules/Rules';
	import {ADD_GAME} from "@/store/action-types";
	import GameFactory from "@/components/GameFactory";
	import Rule from "@/types/Rule";

	export default Vue.extend({
		computed: {
			rules(): Rule[] {
				return Rules.all();
			}
		},
		methods: {
			startGame(ruleId: string): void {
				let rule = Rules.byId(ruleId);
				if (rule) {
					let game = GameFactory.create(rule, this.$store.getters.user);
					this.$store.dispatch(ADD_GAME, game)
						.then(() => this.$router.push({name: "game", params: {"id": game.id}}));
				}
			}
		}
	});
</script>

<style scoped>
	.game-selection__container {
		display: grid;
		grid-template-columns: max-content 1fr;
		grid-gap: 0.6rem;
	}
	
	.game-selection__container .game-selection__btn {
		min-width: 5rem;
		min-height: 5rem;
	}
	
	.game-selection__description {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
