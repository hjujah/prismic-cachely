export default ({ portalId, formId, keyMap, timeout = 5000, callback, name }) => {
	const { sendHubspotForm } = useHubspotForm(portalId, formId, keyMap)

	const thankYouVisible = ref(false)
	const message = ref(false)

	const submitForm = async (data) => {
		let res = await sendHubspotForm(data)

		callback && callback()

		// if name is set call the GTM event
		if (name) {
			useGtmEvent({
				event: "form_interaction",
				event_group: "interaction",
				interaction_type: "form submit",
				form_name: name,
				form_submit_result: !!res ? "success" : "error"
			})
		}

		thankYouVisible.value = true
		message.value = res?.inlineMessage

		setTimeout(() => {
			thankYouVisible.value = false
			message.value = false
		}, timeout)
	}

	return { submitForm, thankYouVisible, message }
}
