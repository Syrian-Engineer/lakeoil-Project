export async function GET(req: Request) {
    try {
      const accessToken = req.headers.get('Authorization');
      const url = new URL(req.url);
  
      if (!accessToken) {
        return new Response(JSON.stringify({ error: 'Access token missing' }), {
          status: 401,
        });
      }
  
      // Extract and forward the original query parameters
      const queryParams = url.searchParams.toString(); // this includes pump_names, product_names, etc.
  
      const response = await fetch(`http://central.oktin.ak4tek.com:3950/sales_reports/page?${queryParams}`, {
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
      console.error('Server error:', err);
      return new Response(JSON.stringify({ error: 'Server error' }), {
        status: 500,
      });
    }
  }
  