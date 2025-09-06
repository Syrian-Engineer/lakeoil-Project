export async function POST(req: Request) {
    const accessToken = req.headers.get("Authorization");
  
    if (!accessToken) {
      return new Response(JSON.stringify({ error: "Access Token Missing" }), {
        status: 401,
      });
    }
  
    const body = await req.json();
    const shiftPeriod = body.shift_period;
    const station_serial_number = body.station_serial;

    if (!shiftPeriod) {
      return new Response(JSON.stringify({ error: "Missing shift_period" }), {
        status: 400,
      });
    }
  
    try {
      const response = await fetch("http://central.oktin.ak4tek.com:3950/sales_reports/periodic/current_month", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({
          shift_period: shiftPeriod,
          station_serial:station_serial_number,
        }),
      });
  
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: response.status,
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Upstream request failed" }), {
        status: 500,
      });
    }
  }
  