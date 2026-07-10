import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('JSONPlaceholder API', () => {
  test('GET single post returns correct data', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body).toHaveProperty('title');
  });

  test('POST creates a new post', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/posts`, {
      data: { title: 'QA Intern Assignment', body: 'Testing POST', userId: 1 }
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toBe('QA Intern Assignment');
    expect(body).toHaveProperty('id');
  });

  test('GET nonexistent post returns 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/9999`);
    expect(response.status()).toBe(404);
  });
});