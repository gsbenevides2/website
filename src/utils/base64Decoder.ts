export function base64Decoder(input: string): string {
  if ('Buffer' in globalThis) {
    return Buffer.from(input, 'base64').toString('utf8')
  } else if ('atob' in globalThis) {
    return globalThis.atob(input)
  } else return input
}
