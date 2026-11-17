const buckets = new Map();
export function rateLimit({ windowMs = 60_000, max = 120 } = {}) {
  return (req, res, next) => { const key = `${req.ip}:${req.baseUrl}`; const now = Date.now(); const current = buckets.get(key); if (!current || now - current.started > windowMs) buckets.set(key, { started: now, count: 1 }); else { current.count += 1; if (current.count > max) return res.status(429).json({ success: false, message: 'Too many requests. Please try again shortly.' }); } next(); };
}
