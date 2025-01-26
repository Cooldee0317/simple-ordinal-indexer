import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      "https://api.ordinals.com/inscriptions",
      {
        headers: {
          Authorization: "",
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
