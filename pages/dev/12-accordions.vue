<script setup>
	const paused = ref(true)
	const tween = ref(false)

	const onTweenUpdated = (t) => {
		tween.value = t
	}

	const toAnimationValue = ref(0)

	const toggleTween = () => {
		paused.value = !paused.value
	}

	const playTween = () => {
		tween.value?.seek(0)
		paused.value = false
	}

	const plus = () => {
		toAnimationValue.value += 100
	}

	const minus = () => {
		toAnimationValue.value -= 100
	}
</script>

<template>
	<main class="p-20 grid gap-8 grid-cols-2">
		<section class="basis-1/2 bg-slate-100 p-4">
			<ContentDoc path="/tween" />
		</section>

		<section class="basis-1/2">
			<h2 class="mb-8">Demos:</h2>

			<!-- SIMPLE DEMO -->
			<div class="mb-8">
				<h4>Simple tween animation</h4>
				<s-tween
					:from="{ opacity: 0, x: 200 }"
					:to="{ opacity: 1, x: 0, duration: 2 }">
					Hello I am animated using the Synchronized Tween component!
				</s-tween>
			</div>

			<!-- CONTROLS DEMO -->
			<div class="mb-8 border-y-black">
				<h4>Control tween animation</h4>

				<s-tween
					:paused="paused"
					@updated="onTweenUpdated"
					:from="{ opacity: 0, x: 200 }"
					:to="{ opacity: 1, x: 0, duration: 2 }">
					Hello I am animated using the Synchronized Tween component!
				</s-tween>

				<button @click="toggleTween">Play/pause</button>
				<br />
				<button @click="playTween">Play from start</button>
			</div>

			<!-- JS OBJECT DEMO -->
			<div class="mb-8 border-y-black">
				<h4>Animate JS objects</h4>

				<s-tween
					:html="false"
					:paused="false"
					v-slot="{ target }"
					:from="{
						x: 50
					}"
					:to="{
						x: 20,
						duration: 10,
						roundProps: 'x'
					}">
					current animated x:{{ target.x }}
				</s-tween>

				<hr />

				<s-tween
					:html="false"
					:paused="false"
					v-slot="{ target }"
					:continuous="false"
					:to="{
						duration: 3,
						val: toAnimationValue
					}">
					controled value:{{ target.val }} / target value: {{ toAnimationValue }}

					<div
						:style="{
							transform: `translateX(${target.val}px) `
						}">
						Animate with controls / {{ `translateX(${target.val}px) ` }}
					</div>

					<br />
					<button @click="minus">Minus</button> /
					<button @click="plus">Plus</button>
				</s-tween>
			</div>
		</section>
	</main>
</template>
