import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: 'Alarm ID is required' }, { status: 400 });
    }

    const res = await fetch('http://78.189.54.28:6900/alarms/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.get('cookie') || '', // forward cookie if using session auth
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ message: data.message || 'Failed to delete alarm' }, { status: res.status });
    }

    return NextResponse.json({ message: 'Alarm deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/alarms/delete-alarm error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
