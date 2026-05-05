<script setup></script>

<template>
	<main class="row">
		<div class="basis-1/2">
			<ContentDoc
				class="p-20 prose prose-slate prose-sm"
				path="/tween-preset" />
		</div>

		<div class="basis-1/2">
			<s-tween-preset preset="fadeUp">
				Hello I am animated using the Synchronized Tween component!
			</s-tween-preset>

			<s-tween-preset
				:from="{
					x: 500
				}"
				:to="{
					x: 0,
					duration: 5
				}"
				preset="fadeUp">
				You can override or add the options too!
			</s-tween-preset>
		</div>
	</main>
</template>
