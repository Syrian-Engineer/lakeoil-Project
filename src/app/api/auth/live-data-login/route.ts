// export async function POST(req: Request) {
//     const { email, password } = await req.json();
  
//     try {
//       const response = await fetch('http://78.189.54.28:6900/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
  
//       if (!response.ok) {
//         return new Response(JSON.stringify({ error: 'Login failed' }), {
//           status: response.status,
//         });
//       }
  
//       // Get cookies from original response
//       const setCookie = response.headers.get('set-cookie');
  
//       const data = await response.json();
  
//       const headers = new Headers({
//         'Content-Type': 'application/json',
//       });
  
//       // 🔐 Forward the Set-Cookie header to the client
//       if (setCookie) {
//         headers.append('Set-Cookie', setCookie);
//       }
  
//       return new Response(JSON.stringify({ data: data.data }), {
//         status: 200,
//         headers,
//       });
//     } catch (err) {
//       console.error('Server error:', err);
//       return new Response(JSON.stringify({ error: 'Server error' }), {
//         status: 500,
//       });
//     }
//   }
  


import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const response = await fetch('http://78.189.54.28:6900/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Login failed' }, { status: response.status });
    }

    const backendData = await response.json();

    // 🔐 Extract the session ID/token from backend response
    const sessionId = backendData.sessionId; // Make sure your backend sends this

    // ✅ Set cookie in the browser
    const nextRes = NextResponse.json({ data: backendData.data });

    nextRes.cookies.set('session_id', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return nextRes;

  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
