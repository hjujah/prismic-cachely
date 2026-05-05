export default (page, error) => {
  if (!page.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found",
      fatal: true
    })
  }

  if (error.value) {
    throw createError({
      statusCode: 500,
      statusMessage: "Oops, an unexpected error occurred."
    })
  }
}
