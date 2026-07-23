const request = require('supertest');
const app = require('../src/app');

describe('GET /health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('Todos API', () => {
  it('starts with an empty list', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('creates a todo', async () => {
    const res = await request(app).post('/todos').send({ title: 'Learn CI/CD' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: 'Learn CI/CD', completed: false });
    expect(res.body.id).toBeDefined();
  });

  it('rejects a todo with no title', async () => {
    const res = await request(app).post('/todos').send({});
    expect(res.status).toBe(400);
  });

  it('fetches a todo by id after creating it', async () => {
    const created = await request(app).post('/todos').send({ title: 'Fetch me' });
    const res = await request(app).get(`/todos/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ title: 'Fetch me' });
  });

  it('returns 404 for a todo that does not exist', async () => {
    const res = await request(app).get('/todos/999999');
    expect(res.status).toBe(404);
  });
});
