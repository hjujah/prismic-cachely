<script setup>
	const paused = ref(true)
	let tween

	const onTweenUpdated = (t) => {
		tween = t

		tween.eventCallback("onUpdate", () => {
			progress.value = tween.progress()
		})
	}

	const toggleTween = () => {
		paused.value = !paused.value
	}

	const playTween = () => {
		tween?.seek(0)
		paused.value = false
	}

	const toAnimationValue = ref(0)
	const plus = () => {
		toAnimationValue.value += 100
	}

	const minus = () => {
		toAnimationValue.value -= 100
	}

	const progress = ref(0)
	const duration = ref(2)

	watch(toAnimationValue, (val) => {
		if (typeof val != "number") toAnimationValue.value = 0
	})
</script>

<template>
	<main class="grid grid-cols-2 p-10">
		<section class="p-4 bg-slate-200">
			<!-- <ContentDoc
				class="prose prose-slate prose-sm"
				path="/tween" /> -->
		</section>

		<section class="p-4 bg-slate-100 overflow-hidden">
			<div class="prose prose-slate prose-sm">
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

				<hr />

				<!-- CONTROLS DEMO -->
				<div class="mb-8 border-y-black">
					<h4>Control tween animation</h4>

					<s-tween-controls />
				</div>

				<hr />

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

					<s-tween
						:html="false"
						:paused="false"
						v-slot="{ target }"
						:continuous="false"
						:to="{
							duration: duration,
							val: toAnimationValue,
							overwrite: true
						}">
						controled value:{{ target.val }} / target value: {{ toAnimationValue }}

						<div
							:style="{
								transform: `translateX(${target.val}px) `
							}">
							Animate with controls / {{ `translateX(${target.val}px) ` }}
						</div>

						Val:
						<input
							type="number"
							v-model="toAnimationValue" />

						Duration:
						<input
							type="number"
							v-model="duration" />

						<br />

						<button @click="minus">Minus 100</button> /
						<button @click="plus">Plus 100</button>
					</s-tween>
				</div>
			</div>
		</section>
	</main>
</template>
