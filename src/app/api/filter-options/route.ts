// /app/api/filter-options/route.ts

export async function GET(req: Request) {
    try {
      const accessToken = req.headers.get('Authorization');
  
      if (!accessToken) {
        return new Response(JSON.stringify({ error: 'Access token missing' }), {
          status: 401,
        });
      }
  
      // Call all 4 APIs in parallel
      const [pumpsRes, tanksRes, nozzlesRes, productsRes] = await Promise.all([
        fetch('http://78.189.54.28:5000/station/pumps', {
          headers: { Authorization: accessToken },
        }),
        fetch('http://78.189.54.28:5000/station/tanks', {
          headers: { Authorization: accessToken },
        }),
        fetch('http://78.189.54.28:5000/station/nozzles', {
          headers: { Authorization: accessToken },
        }),
        fetch('http://78.189.54.28:5000/station/products', {
          headers: { Authorization: accessToken },
        }),
      ]);
  
      // Optional: handle response errors individually if needed
      if (
        !pumpsRes.ok ||
        !tanksRes.ok ||
        !nozzlesRes.ok ||
        !productsRes.ok
      ) {
        return new Response(
          JSON.stringify({ error: 'Failed to fetch some data' }),
          { status: 500 }
        );
      }
  
      // Extract the data
      const [pumps, tanks, nozzles, products] = await Promise.all([
        pumpsRes.json(),
        tanksRes.json(),
        nozzlesRes.json(),
        productsRes.json(),
      ]);
  
      return new Response(
        JSON.stringify({ pumps, tanks, nozzles, products }),
        { status: 200 }
      );
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Server error' }), {
        status: 500,
      });
    }
  }
  