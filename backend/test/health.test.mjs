import test from 'node:test';
import assert from 'node:assert/strict';
process.env.NODE_ENV = 'test';
const { default: app } = await import('../src/server.js');

test('health endpoint reports a healthy API', async () => {
  const server = app.listen(0);
  const { port } = server.address();
  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true, service: 'careertrack-api', status: 'ok' });
  } finally { server.close(); }
});

test('unknown API route returns JSON 404', async () => {
  const server = app.listen(0);
  const { port } = server.address();
  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/not-a-route`);
    assert.equal(response.status, 404);
    assert.equal((await response.json()).success, false);
  } finally { server.close(); }
});

test('single service serves the frontend shell', async () => {
  const server = app.listen(0);
  const { port } = server.address();
  try {
    const response = await fetch(`http://127.0.0.1:${port}/`);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /CareerTrack|root/i);
  } finally { server.close(); }
});

