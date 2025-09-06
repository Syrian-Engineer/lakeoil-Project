// /app/api/filters/tanks/route.ts
export async function GET(req: Request) {
    const accessToken = req.headers.get('Authorization');
    if (!accessToken) {
      return new Response(JSON.stringify({ error: 'Access token missing' }), { status: 401 });
    }
  
    try {
      const res = await fetch('http://central.oktin.ak4tek.com:3950/0/station/tanks', {
        headers: { Authorization: accessToken },
      });
  
      if (!res.ok) {
        const error = await res.text();
        console.error("Failed to fetch tanks:", error);
        return new Response(JSON.stringify({ error }), { status: res.status });
      }
  
      const tanks = await res.json();
      return new Response(JSON.stringify(tanks), { status: 200 });
    } catch (err: any) {
      console.error("Error in tanks route:", err.message || err);
      return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
  }
  