/*
 * This composable provides a function to submit a form to HubSpot using their API.
 * It takes in the portal ID, form ID, and an optional key map to map form field names to HubSpot field names.
 */
import axios from "axios"
import _each from "lodash/each"
import _get from "lodash/get"
export default (portalId, formId, keyMap = {}) => {
	// Construct the API endpoint URL with the provided portal and form IDs
	const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`

	// Get the current route and app store
	const route = useRoute()
	const appStore = useAppStore()

	// Get the IP address and host from the app store
	const { ipAddress, host } = storeToRefs(appStore)

	// Construct the full page URI
	// const pageUri = host.value + route.fullPath
	const pageUri = "https://wearemiq.com" + route.fullPath

	// Function to get a cookie by name
	const getCookie = (cname) => {
		var name = cname + "="
		var decodedCookie = decodeURIComponent(document.cookie)
		var ca = decodedCookie.split(";")
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i]
			while (c.charAt(0) == " ") {
				c = c.substring(1)
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length)
			}
		}
		return ""
	}

	// Function to parse form data and map field names to HubSpot field names
	const parseHubspotData = (data) => {
		let parsedData = []
		_each(data, (key, val) => {
			parsedData.push({
				name: keyMap[val] ?? val,
				value: key
			})
		})
		return parsedData
	}

	// Function to send the form data to HubSpot
	const sendHubspotForm = async (data, callback) => {
		// Parse the form data and map field names to HubSpot field names
		const fields = parseHubspotData(data)

		// Get the HubSpot cookie if it exists
		const cookie = getCookie("hubspotutk")

		// Construct the request body
		let obj = {
			fields: fields,
			context: {
				ipAddress: ipAddress.value,
				pageUri
				// pageName: this.activePage.fields.title
			},
			legalConsentOptions: {
				legitimateInterest: {
					value: true,
					skipValidation: true,
					// This must be true when using the 'legitimateInterest' option, as it reflects the consent indicated by the visitor when submitting the form
					subscriptionTypeId: 999,
					// Integer; The ID of the specific subscription type that this forms indicates interest to.
					legalBasis: "CUSTOMER",
					// String, one of CUSTOMER or LEAD; Whether this form indicates legitimate interest from a prospect/lead or from a client.
					text: "Legitimate interest consent text"
					// String; The privacy text displayed to the visitor.
				}
			}
		}

		// Add the HubSpot cookie to the request body if it exists
		if (cookie.length) {
			obj.hutk = cookie
		}

		// Send the form data to HubSpot using the API endpoint URL and request body
		return await axios
			.post(endpoint, obj)
			.then(function (response) {
				callback && callback()
				return response.data
			})
			.catch(function (error) {
				console.log("there was an error", error)
			})
	}
	// Return the sendHubspotForm function for external use
	return { sendHubspotForm }
}
