import { NextResponse } from 'next/server';
import { toUUID } from 'uuid-mongo';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get('input');
  const subtype = searchParams.get('subtype') || "3"; // Default to '3' if not provided
  console.log(input, subtype);
  if (!input) {
    return NextResponse.json({ error: 'Input is required' }, { status: 400 });
  }

  try {
    // Decode the URL-encoded input
    const decodedInput = decodeURIComponent(input);
 
    const uuid = toUUID(subtype, decodedInput);
    return NextResponse.json({ result: uuid.toString() });
  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Invalid input format',
      details: error 
    }, { status: 400 });
  }
} 