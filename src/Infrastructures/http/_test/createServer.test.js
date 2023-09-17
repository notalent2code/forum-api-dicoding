const createServer = require('../createServer');

describe('HTTP server', () => {
  it('should response 404 when request unregistered route', async () => {
    const server = await createServer({});

    const response = await server.inject({
      method: 'GET',
      url: '/unregistered-route',
    });

    expect(response.statusCode).toEqual(404);
  });

  it('should handle server error correctly', async () => {
    const requestPayload = {
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
      password: 'super_secret',
    };

    const server = await createServer({});

    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: requestPayload,
    });

    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual('error');
    expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
  });

  it('when request "GET /", should get response with status and message', async () => {
    const expectedResponse = {
      status: 'success',
      message: 'Forum API - Dicoding Submission',
    };

    const server = await createServer({});

    const response = await server.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.result).toEqual(expectedResponse);
  });
});
