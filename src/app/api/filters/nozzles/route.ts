// /app/api/filters/nozzles/route.ts
export async function GET(req: Request) {
    const accessToken = req.headers.get('Authorization');
    if (!accessToken) {
      return new Response(JSON.stringify({ error: 'Access token missing' }), { status: 401 });
    }
  
    try {
      const res = await fetch('http://78.189.54.28:5000/station/nozzles', {
        headers: { Authorization: accessToken },
      });
  
      if (!res.ok) {
        const error = await res.text();
        console.error("Failed to fetch nozzles:", error);
        return new Response(JSON.stringify({ error }), { status: res.status });
      }
  
      const nozzles = await res.json();
      return new Response(JSON.stringify(nozzles), { status: 200 });
    } catch (err: any) {
      console.error("Error in nozzles route:", err.message || err);
      return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
  }
  