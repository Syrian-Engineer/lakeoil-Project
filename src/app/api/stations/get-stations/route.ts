export async function GET(req: Request) {
    try {
      const accessToken = req.headers.get('Authorization');
  
      if (!accessToken) {
        return new Response(JSON.stringify({ error: 'Access token missing' }), {
          status: 401,
        });
      }
  
      const response = await fetch('http://78.189.54.28:3800/stationinfo/all', {
        method: 'GET',
        headers: {
          Authorization: `${accessToken}`,
        },
      });
  
      if (!response.ok) {
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
          status: response.status,
        });
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
  
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Server error' }), {
        status: 500,
      });
    }
  }
  