<script setup>
	const props = defineProps({
		total: {
			type: Number,
			required: true
		},
		pageSize: {
			type: Number,
			default: 3
		},
		onPageChange: {
			type: Function,
			default: () => {}
		},
		currentPage: {
			type: Number,
			default: 1
		},
		visiblePages: {
			type: Number,
			// should be odd number
			default: 5
		},
		showPrevNext: {
			type: Boolean,
			default: true
		}
	})

	const _total = computed(() => props.total)

	const { currentPage, currentPageSize, pageCount, isFirstPage, isLastPage, prev, next } =
		useOffsetPagination({
			total: _total,
			page: props.currentPage,
			pageSize: props.pageSize,
			onPageChange: props.onPageChange
		})

	watch(
		() => props.currentPage,
		(cp) => {
			currentPage.value = cp
		}
	)

	// MAKING PAGINATION ITEMS
	let pagesArray = []

	for (let i = 1; i <= pageCount.value; i++) {
		pagesArray.push(i)
	}

	let from = computed(() => {
		return currentPage.value <= props.visiblePages
			? 1
			: // check if the current page is les or equal to the number of pages minus visible pages
				currentPage.value <= pageCount.value - props.visiblePages
				? currentPage.value - Math.round(props.visiblePages / 2)
				: pageCount.value - props.visiblePages - 1
	})

	let to = computed(() => {
		return currentPage.value < pageCount.value - props.visiblePages
			? props.visiblePages + from.value + 1
			: pageCount.value - 1
	})

	const pagesToRender = computed(() => pagesArray.slice(from.value, to.value))
</script>

<template>
	<div
		:class="{
			invisible: pageCount == 1
		}"
		class="pagination row justify-between lg:justify-start items-center">
		<!-- CURRENTPAGE: {{ currentPage }} <br />
		CURRENTPAGESIZE: {{ currentPageSize }} <br />
		PAGECOUNT: {{ pageCount }} <br />
		ISFIRSTPAGE: {{ isFirstPage }} <br />
		ISLASTPAGE: {{ isLastPage }} <br />
		TOTAL: {{ total }} <br />
		MASTER TOTAL: {{ _total }}

		PTR: {{ pagesToRender }} -->

		<!-- FROM {{ from }} / TO {{ to }} <br /> -->
		<!-- RES: {{ currentPage < pageCount - visiblePages }} // {{ currentPage }} /
		{{ pageCount }}/ {{ visiblePages }} -->

		<!-- {{ currentPage < pageCount }}
		CP: {{ currentPage }} / {{ pageCount }} -->

		<!-- LEFT SECTION -->
		<div
			v-if="showPrevNext"
			class="flex items-center">
			<button
				class="btn btn--prev hidden md:flex items-center"
				@click="prev"
				:class="{ disabled: currentPage === 1 }">
				<span class="me-2">PREV</span>

				<div>
					<img
						src="/img/arrow-right-black.svg"
						class="arrow"
						alt="arrow" />
				</div>
			</button>
		</div>
		<!-- END :: LEFT SECTION -->

		<!-- CENTER SECTION -->
		<div
			class="flex items-center flex-grow justify-center text-20 sm:text-22 lg:text-30 font-anton">
			<!-- FIRST PAGE -->
			<a-pagination-link
				@click="currentPage = 1"
				:page="1"
				:active="currentPage === 1"
				:class="[
					'pagination__page',
					{
						'pagination__page--active': currentPage === 1
					}
				]" />
			<!-- END :: FIRST PAGE -->

			<!-- DIVIDER -->
			<p
				class="px-4 leading-none"
				v-if="currentPage > visiblePages">
				...
			</p>
			<!-- END :: DIVIDER -->

			<!-- PAGES -->
			<a-pagination-link
				:page="page"
				:active="currentPage === page"
				v-for="page in pagesToRender"
				:key="page"
				:class="[
					'pagination__page',
					{
						'pagination__page--active': currentPage === page
					}
				]"
				@click="currentPage = page" />
			<!-- END :: ALL PAGES -->

			<!-- DIVIDER -->
			<p
				class="px-4 leading-none"
				v-if="currentPage < pageCount - visiblePages">
				...
			</p>
			<!-- END :: DIVIDER -->

			<!-- LAST PAGE -->
			<a-pagination-link
				v-if="pageCount > 1"
				@click="currentPage = pageCount"
				:page="pageCount"
				:active="currentPage === pageCount"
				:class="[
					'pagination__page',
					{
						'pagination__page--active': currentPage === pageCount
					}
				]" />
			<!-- END :: LAST PAGE -->
		</div>
		<!-- END :: CENTER SECTION -->

		<!-- RIGHT SECTION -->
		<div
			v-if="showPrevNext"
			class="flex items-center">
			<button
				class="btn btn-next"
				:class="{ disabled: currentPage === pageCount }"
				v-html="'NEXT'"
				@click="next"></button>
		</div>
		<!-- END :: RIGHT SECTION -->
	</div>
</template>

<style lang="scss" scoped>
	// .pagination {
	// 	&__page {
	// 		@apply px-3 py-4 sm:px-6 cursor-pointer;
	// 		transition: 0.4s;
	// 		@apply text-white2/30;

	// 		&--active {
	// 			color: theme("colors.white2");
	// 			z-index: 10;
	// 			position: relative;
	// 			.ecllipse {
	// 				opacity: 1 !important;
	// 			}
	// 		}
	// 		&:hover {
	// 			z-index: 20;
	// 			color: theme("colors.white2");
	// 		}
	// 		.ecllipse {
	// 			opacity: 0;
	// 		}
	// 	}
	// }
</style>
