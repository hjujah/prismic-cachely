// string utilities
import { camelCase, toUpper } from "lodash-es"
export const pascalCase = (str) => camelCase(str).replace(/^(.)/, toUpper)
