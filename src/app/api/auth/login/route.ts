export async function POST(req: Request) {
    const { email, password } = await req.json();
  
    try {
      const response = await fetch('https://api-lakeoil.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        return new Response(JSON.stringify({ error: 'Login failed' }), {
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