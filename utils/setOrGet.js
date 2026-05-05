export default async (key, get_function, noCache, debug) => {
	try {
		let data = await useStorage().getItem(key)

		if (!data || noCache) {
			data = await get_function()
			await useStorage().setItem(key, data)
			debug && console.log("set to storage", key, data)
		} else {
			debug && console.log("found in storage", key)
		}

		return data
	} catch (err) {
		console.log(err)
	}
}
