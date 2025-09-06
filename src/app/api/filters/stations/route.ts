// /app/api/filters/pumps/route.ts
export async function GET(req: Request) {
    const accessToken = req.headers.get('Authorization');
    if (!accessToken) {
      return new Response(JSON.stringify({ error: 'Access token missing' }), { status: 401 });
    }
  
    try {
      const res = await fetch('http://central.oktin.ak4tek.com:3950/0/station/all', {
        headers: { Authorization: accessToken },
      });
  
      if (!res.ok) {
        const error = await res.text();
        console.error("Failed to fetch stations:", error);
        return new Response(JSON.stringify({ error }), { status: res.status });
      }
  
      const stations = await res.json();
      return new Response(JSON.stringify(stations), { status: 200 });
    } catch (err: any) {
      console.error("Error in station route:", err.message || err);
      return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
  }
  