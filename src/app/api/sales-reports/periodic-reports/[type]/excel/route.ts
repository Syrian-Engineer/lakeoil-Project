
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await context.params;
    const body = await req.json();
    const token = req.headers.get('authorization');

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // ✅ Map frontend endpoint to backend endpoint
    const endpointMap: Record<string, string> = {
      'daily-current': 'current-day',
      'daily-previous': 'previous-day',
      'monthly-current': 'current-month',
      'monthly-previous': 'previous-month',
    };

    const backendType = endpointMap[type];

    if (!backendType) {
      return NextResponse.json(
        { message: 'Invalid report type' },
        { status: 400 }
      );
    }

    // ✅ Call backend
    const backendResponse = await fetch(
      `http://central.oktin.ak4tek.com:3950/sales_reports/periodic/${backendType}/download`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
          Accept:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        body: JSON.stringify(body),
      }
    );

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      return NextResponse.json(
        { message: 'Backend error', detail: errorText },
        { status: backendResponse.status }
      );
    }

    // ✅ Get raw Excel binary
    const blob = await backendResponse.blob();

    return new NextResponse(blob, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=${type}.xlsx`,
      },
    });
  } catch (error) {
    console.error('Excel Route Error:', error);
    return NextResponse.json(
      { message: 'Failed to generate Excel file' },
      { status: 500 }
    );
  }
}
