import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      "https://api.ordinals.com/inscriptions",
      {
        headers: {
          Authorization: "Bearer ab6ce104-831c-457d-a2eb-471463991f3e",
        },
      }
    );
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching inscriptions:', error);
    return NextResponse.json({ error: 'Failed to fetch inscriptions' }, { status: 500 });
  }
} 