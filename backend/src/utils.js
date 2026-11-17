export function escapeRegex(value = '') {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Remove MongoDB operator keys from user-controlled request bodies.
// Mongoose validation remains the final schema-level guard.
export function sanitizeMongoInput(value) {
  if (Array.isArray(value)) return value.map(sanitizeMongoInput);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !key.startsWith('$') && !key.includes('.'))
      .map(([key, nested]) => [key, sanitizeMongoInput(nested)]),
  );
}

export function asList(value = []) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  return String(value).split(/[\n,]/).map((item) => item.trim()).filter(Boolean);
}
