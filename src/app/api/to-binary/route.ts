import { NextResponse } from 'next/server';
import { toBinData } from 'uuid-mongo';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get('input');
  const subtype = searchParams.get('subtype') || '3'; // Default to '3' if not provided

  if (!input) {
    return NextResponse.json({ error: 'Input is required' }, { status: 400 });
  }

  try {
    // Decode the URL-encoded input
    const decodedInput = decodeURIComponent(input);
    const binary = toBinData(subtype, decodedInput);
    return NextResponse.json({ result: binary.toString() });
  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Invalid input format',
      details: error 
    }, { status: 400 });
  }
} 