import { existsSync } from "node:fs"

export const fileExists = (path, extensions = ["js", "ts"]) => {
  if (!path) {
    return null
  } else if (existsSync(path)) {
    // If path already contains/forces the extension
    return path
  }

  const extension = extensions.find((extension) => existsSync(`${path}.${extension}`))

  return extension ? `${path}.${extension}` : null
}
