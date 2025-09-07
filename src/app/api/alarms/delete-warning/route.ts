import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: 'Warning ID is required' }, { status: 400 });
    }

    const res = await fetch('http://central.oktin.ak4tek.com:3950/warnings/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.get('cookie') || '',
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ message: data.message || 'Failed to delete warning' }, { status: res.status });
    }

    return NextResponse.json({ message: 'Warning deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/warnings/delete-warning error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
