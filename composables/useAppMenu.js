export function useAppMenu() {
	// Use app store
	const store = useAppStore()
	const { isMenuOpen } = storeToRefs(store)

	const openMenu = () => {
		isMenuOpen.value = true
	}

	const closeMenu = () => {
		isMenuOpen.value = false
	}

	const toggleMenu = () => {
		isMenuOpen.value = !isMenuOpen.value
	}

	return {
		isMenuOpen,
		openMenu,
		closeMenu,
		toggleMenu
	}
}
