import _isEqual from "lodash/isEqual"

export default (items, { page_size = 3 }) => {
	const route = useRoute()
	const currentPage = computed(() => parseInt(route.query.page || 1))
	const _currentPage = ref(currentPage.value)

	const onPageChange = (pagination) => {
		_currentPage.value = pagination.currentPage
	}

	watch(_currentPage, (page) => {
		navigateTo({
			query: {
				...route.query,
				page
			}
		})
	})

	watch(items, (val, oldVal) => {
		if (_isEqual(val, oldVal)) {
			return
		}

		nextTick(() => {
			navigateTo({
				query: {
					...route.query,
					page: 1
				}
			})
		})
	})

	const paginated_items = computed(() => {
		const start = (currentPage.value - 1) * page_size
		const end = start + page_size
		return items.value.slice(start, end)
	})

	return { onPageChange, paginated_items, currentPage }
}
