export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    let headers = new Headers();

    // CORS Headers for security
    headers.set('Cross-Origin-Embedder-Policy', 'require-corp');

    const isDev = env.NODE_ENV === 'development';
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');

    if (isDev) {
      // for local development, we want to allow cross-origin requests
      headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
    } else {
      // for production, we want to allow same-site requests
      headers.set('Cross-Origin-Resource-Policy', 'same-site');
    }

    // Handle Preflight (OPTIONS) requests
    if (request.method === 'OPTIONS') {
        headers.set('Access-Control-Allow-Origin', origin);
        headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
        headers.set('Access-Control-Allow-Headers', 'Content-Type'); // Add any other headers needed
        headers.set('Access-Control-Max-Age', '86400'); // Cache preflight for 1 day
        return new Response(null, { status: 204, headers });
    }

    // Handle actual GET/HEAD requests
    if (request.method === 'GET' || request.method === 'HEAD') {
      headers.set('Access-Control-Allow-Origin', origin);

      if (key === '') {
        // Optionally handle requests to the root path, e.g., return a default object or an index page
         // For now, let's return 404 for the root path as it's ambiguous
        return new Response('Not Found', { status: 404, headers });
      }

      // Try to get the object from R2
      const object = await env.MY_BUCKET.get(key);

      if (object === null) {
        return new Response('Object Not Found', { status: 404, headers });
      }

      // Set object metadata headers
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);
      // Set a long cache duration for static assets
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');

       // Return only headers for HEAD request
      if (request.method === 'HEAD') {
        return new Response(null, { headers });
      }

      // Return the object body for GET request
      return new Response(object.body, {
        headers,
      });
    }

    // Handle other methods
    headers.set('Allow', 'GET, HEAD, OPTIONS');
    return new Response('Method Not Allowed', { status: 405, headers });
  },
}; 