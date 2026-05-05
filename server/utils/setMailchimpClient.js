/**
 * setMailchimpClient - A function to set up and retrieve a Mailchimp client instance.
 *
 * This function initializes a Mailchimp client using the provided API key from the configuration.
 * It ensures that the Mailchimp configuration is properly set before creating the client instance.
 *
 * @SEE https://github.com/mailchimp/mailchimp-transactional-node
 *
 * @throws {Error} Throws an error if the Mailchimp configuration (API key) is missing.
 *
 * @returns {Object} Returns a Mailchimp client instance.
 */
import mailchimpClient from "@mailchimp/mailchimp_transactional"
import config from "@/config/mailchimp"

export const setMailchimpClient = () => {
	// Check if the Mailchimp API key is defined in the configuration.
	if (!config.MANDRILL_KEY) {
		throw new Error("Mailchimp config is missing")
	}

	console.log("setting up mailchimp client:", config.MANDRILL_KEY)

	// Create and return a Mailchimp client instance.
	return mailchimpClient(config.MANDRILL_KEY)
}
