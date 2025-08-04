import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await request.json();
  // TODO: send to external service
  return NextResponse.json({ success: true });
}
