/**
 * Generate randon name for form names.
 *
 * @param config.prefix Prefix to attach to key, usually human-readable
 * @param config.separator Separate sections; default to empty string
 * @param config.numSections Number of sections; default to 2
 */
export function generateRandomKey({ prefix = '', separator = '', numSections = 2 } = {}): string {
  const ret = [prefix];

  for (let i = 0; i < numSections; i++) {
    ret.push(Math.random().toString(36).substring(2, 15));
  }

  return ret.join(separator);
}
