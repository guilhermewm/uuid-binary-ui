import { NextResponse } from 'next/server';
import { toBindata } from 'uuid-mongo';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get('input');

  if (!input) {
    return NextResponse.json({ error: 'Input is required' }, { status: 400 });
  }

  try {
    const binary = toBindata(input);
    return NextResponse.json({ result: binary.toString() });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input format' }, { status: 400 });
  }
} 