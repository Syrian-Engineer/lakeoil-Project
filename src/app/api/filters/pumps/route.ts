// /app/api/filters/pumps/route.ts
export async function GET(req: Request) {
    const accessToken = req.headers.get('Authorization');
    if (!accessToken) {
      return new Response(JSON.stringify({ error: 'Access token missing' }), { status: 401 });
    }
  
    try {
      const res = await fetch('https://api-lakeoil.onrender.com/station/pumps', {
        headers: { Authorization: accessToken },
      });
  
      if (!res.ok) {
        const error = await res.text();
        console.error("Failed to fetch pumps:", error);
        return new Response(JSON.stringify({ error }), { status: res.status });
      }
  
      const pumps = await res.json();
      return new Response(JSON.stringify(pumps), { status: 200 });
    } catch (err: any) {
      console.error("Error in pumps route:", err.message || err);
      return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
  }
  