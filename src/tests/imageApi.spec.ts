import supertest from 'supertest';
import { Stats } from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import fs from 'fs/promises';

import app from '../index';

const request = supertest(app);

describe('GET /api/images', () => {
  it('should return a status of 400', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
  });

  it('should return 400 when called with a missing FILENAME', async () => {
    const response = await request.get('/api/images?height=200&width=200');
    expect(response.status).toBe(400);
    expect(response.text).toBe('filename is missing!!!');
  });

  it('should return 400 when called with a missing WIDTH parameter', async () => {
    const response = await request.get(
      '/api/images?filename=palmtunnel&height=200',
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe('width is missing!!!');
  });

  it('should return 400 when called with a missing HEIGHT parameter', async () => {
    const response = await request.get(
      '/api/images?filename=palmtunnel&width=200',
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe('height is missing!!!');
  });

  it('should return 404 when called correctly but FILENAME does not exist', async () => {
    const response = await request.get(
      '/api/images?filename=test&height=200&width=200',
    );
    expect(response.status).toBe(404);
    expect(response.text).toBe('filename is not exist!!!');
  });

  it('should return 400 when called with WIDTH is invalid', async () => {
    const response = await request.get(
      '/api/images?filename=palmtunnel&height=150&width=1a50',
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe('width is invalid!!!');
  });

  it('should return 400 when called with HEIGHT is invalid', async () => {
    const response = await request.get(
      '/api/images?filename=palmtunnel&height=15a0&width=150',
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe('height is invalid!!!');
  });

  it('should return 200 if called correctly and image exist', async () => {
    const response = await request.get(
      '/api/images?filename=palmtunnel&height=150&width=150',
    );
    expect(response.status).toBe(200);
  });

  it('should created a thumb version of the image', async () => {
    request
      .get('/api/images?filename=palmtunnel&height=100&width=100')
      .then(() =>
        fs
          .stat(
            path.resolve(
              __dirname,
              '../../assets/images/thumb/palmtunnel-100x100.jpg',
            ),
          )
          .then((fileStat: Stats) => expect(fileStat).not.toBeNull()),
      );
  });

  it('should created a thumb version of the image', async () => {
    request
      .get('/api/images?filename=palmtunnel&height=100&width=150')
      .then(() => {
        const dimensions = sizeOf(
          path.resolve(
            __dirname,
            '../../assets/images/thumb/palmtunnel-100x150.jpg',
          ),
        );
        expect(dimensions.height).toEqual(100);
        expect(dimensions.width).toEqual(150);
      });
  });
});
