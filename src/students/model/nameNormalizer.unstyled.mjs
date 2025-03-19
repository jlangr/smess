// nameNormalizer.mjs

export function normalizeName(name) {
  let trimmedName = name.trim();
  let hasSuffix = trimmedName.includes(',');
  let suffix = '';

  if (hasSuffix) {
    [trimmedName, suffix] = trimmedName.split(',');
    suffix = ', ' + suffix.trim();  // Ensure space after comma for the suffix
  }

  let parts = trimmedName.split(/\s+/);

  if (parts.length === 1) {
    return parts[0] + suffix;
  }

  let lastName = parts.pop();
  let firstName = parts.shift();
  let middleInitials = parts.map(name => `${name.charAt(0)}.`).join(' ');

  return `${lastName}, ${firstName} ${middleInitials}`.trim() + suffix;
}
