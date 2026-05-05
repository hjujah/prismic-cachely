import mailchimp from "@mailchimp/mailchimp_marketing"

import config from "@/config/mailchimp"

export const setMailchimpMarketingClient = () => {
	if (!config.MAILCHIMP_KEY || !config.MAILCHIMP_LOCALE) {
		throw new Error("Mailchimp config is missing")
	}

	console.log(
		"set up marketing mailchimp client:",
		config.MAILCHIMP_KEY,
		config.MAILCHIMP_LOCALE
	)

	mailchimp.setConfig({
		apiKey: config.MAILCHIMP_KEY,
		server: config.MAILCHIMP_LOCALE
	})

	return mailchimp
}
