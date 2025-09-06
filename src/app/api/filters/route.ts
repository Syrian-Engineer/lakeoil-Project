// No Need For It

export async function GET(req: Request) {
  try {
    const accessToken = req.headers.get('Authorization');
    console.log("Access token:", accessToken);

    if (!accessToken) {
      return new Response(JSON.stringify({ error: 'Access token missing' }), { status: 401 });
    }

    const headers = { Authorization: accessToken };

    const urls = {
      pumps: 'http://central.oktin.ak4tek.com:3950/0/station/pumps',
      tanks: 'http://central.oktin.ak4tek.com:3950/0/station/tanks',
      nozzles: 'http://central.oktin.ak4tek.com:3950/0/station/nozzles',
      products: 'http://central.oktin.ak4tek.com:3950/0/station/products',
    };

    const fetchData = async (key: string, url: string) => {
      const res = await fetch(url, { headers });
      if (!res.ok) {
        const text = await res.text();
        console.error(`Failed to fetch ${key}:`, text);
        throw new Error(`Failed to fetch ${key}: ${res.status}`);
      }
      return res.json();
    };

    const [pumps, tanks, nozzles, products] = await Promise.all([
      fetchData('pumps', urls.pumps),
      fetchData('tanks', urls.tanks),
      fetchData('nozzles', urls.nozzles),
      fetchData('products', urls.products),
    ]);

    return new Response(JSON.stringify({ pumps, tanks, nozzles, products }), {
      status: 200,
    });

  } catch (err: any) {
    console.error('Server error in /api/filter-options:', err.message || err);
    return new Response(JSON.stringify({ error: err.message || 'Unknown server error' }), {
      status: 500,
    });
  }
}
