import { Result } from "ethers"

function formatter(value: any) {
  switch(typeof value) {
    case "bigint":
      return Number(value)
    case "object":
      return formatResult(value)
    default:
      return value
  }
}

export function formatResult<T = any>(result: Result, toArray?: boolean): T {
  if (!(result instanceof Result)) {
    return formatter(result) as T
  }
  if (toArray) {
    return result.map((item: Result) => formatResult(item)) as T
  }

  try {
    const object = result.toObject()
    const values: Record<string, any> = {}
    const entries = Object.entries(object)
    if (entries.length === 0) {
      debugger;
      return [] as T
    }

    for (const [name, value] of entries) {
      values[name] = formatter(value)
    }
    return values as T
  } catch {
    if (Array.isArray(result)) {
      return result.map((item: Result) => formatResult(item)) as T
    }
    throw new Error("Failed to convert result to object")
  }
}
