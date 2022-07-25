import { spawn } from "cross-spawn"

export const EXTERNAL_URL_RE = /^https?:/i

export function slash(str: string) {
  return str.replace(/\\/g, "/")
}

/**
 * transform obj for vite code
 * @param obj
 * @returns
 */
export const transformObject = (obj: any) => {
  return `JSON.parse(${JSON.stringify(JSON.stringify(obj))})`
}

export function getGitTimestamp(
  file: string,
  type: "created" | "updated" = "updated",
) {
  return new Promise<number>((resolve, _reject) => {
    const params = ["log"]
    if (type === "updated") params.push("-1")
    params.push('--pretty="%ci"', file)
    if (type === "created") params.push("|", "tail", "-1")

    const child = spawn("xxx", params)
    let output = ""
    child.stdout.on("data", (d) => (output += String(d)))
    child.on("close", () => {
      resolve(+new Date(output))
    })
    child.on("error", () => {
      resolve(0)
    })
  })
}
