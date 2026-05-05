// import config from "@/config/mailchimp"

// // @TODO move form schemas to a shared folder (ie. '@/schemas')
// import form_schema from "@/components/organisms/ContactComponent/contactSchema"

// const { MANDRILL_RECEIVER, MANDRILL_SENDER, MANDRILL_SENDER_NAME } = config

// // identifier used for logging
// const LOG_NAME = `[api.form.contact]`

// export default defineEventHandler(async (event) => {
// 	let success = false
// 	let data = {}

// 	// get form data from the request
// 	const { ...formData } = await readBody(event)

// 	try {
// 		validate(form_schema, formData)
// 	} catch (error) {
// 		if (error.statusCode === 422) {
// 			console.error(`${LOG_NAME} validation error: `, error.data)
// 			throw error
// 		}
// 		console.error(`${LOG_NAME} validation error: `, error)
// 		throw apiError.internal()
// 	}

// 	try {
// 		// Prepare email subject
// 		// @TODO check / update email subject
// 		const subject = `New Form Submission: [Contact] - ${formData.name}`

// 		// create a field -> label map
// 		const labelMap = getLabelMap(form_schema)
// 		// generate html table with form data
// 		const htmlTable = generateHtmlDataTable(formData, labelMap)

// 		const emailData = {
// 			message: {
// 				to: [
// 					{
// 						email: MANDRILL_RECEIVER
// 					}
// 				],
// 				from_email: MANDRILL_SENDER,
// 				from_name: MANDRILL_SENDER_NAME,

// 				subject,
// 				html: `
// 		    <h2>${subject}</h2>
// 		    <p>This message has been sent from <strong>Klimon Website</strong></p>
// 		    ${htmlTable}
// 		  	`
// 			}
// 		}

// 		const mailchimp = setMailchimpClient()

// 		// Send email using Mailchimp Transactional API
// 		// @SEE https://mailchimp.com/developer/transactional/api/messages/send-new-message
// 		data = await mailchimp.messages.send(emailData)

// 		// Response (success)
// 		success = true
// 		setResponseStatus(event, 200)
// 		return {
// 			success,
// 			data
// 		}
// 	} catch (error) {
// 		console.error(`${LOG_NAME} Error sending email`)
// 		console.error(error)

// 		throw apiError.internal()
// 	}
// })
