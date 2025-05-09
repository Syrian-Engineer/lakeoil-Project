export async function POST(req: Request) {
    const { email, password } = await req.json();
  
    try {
      const response = await fetch('http://78.189.54.28:6900/login', {
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
  
      // Get cookies from original response
      const setCookie = response.headers.get('set-cookie');
  
      const data = await response.json();
  
      const headers = new Headers({
        'Content-Type': 'application/json',
      });
  
      // 🔐 Forward the Set-Cookie header to the client
      if (setCookie) {
        headers.append('Set-Cookie', setCookie);
      }
  
      return new Response(JSON.stringify({ data: data.data }), {
        status: 200,
        headers,
      });
    } catch (err) {
      console.error('Server error:', err);
      return new Response(JSON.stringify({ error: 'Server error' }), {
        status: 500,
      });
    }
  }
  