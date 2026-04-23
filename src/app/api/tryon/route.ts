import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, modelType, gender } = await request.json();

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const apiKey = process.env.SUMOPOD_API_KEY;
    if (!apiKey || apiKey === 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
      return NextResponse.json(
        { error: 'API key not configured. Please set SUMOPOD_API_KEY in .env.local' },
        { status: 500 }
      );
    }

    const systemPrompt = `You are Fittly AI, an expert virtual fashion stylist and try-on assistant. 
You analyze outfit descriptions and generate detailed, creative styling recommendations.

When a user describes an outfit they want to try on, respond with:
1. **Outfit Analysis**: A vivid description of how the outfit looks on the ${gender || 'female'} ${modelType === 'mannequin' ? '3D mannequin model' : 'user\'s photo'}.
2. **Style Score**: Rate the outfit 1-10 with a brief explanation.
3. **Color Harmony**: Analyze the color palette.
4. **Styling Tips**: 2-3 quick tips to elevate the look.
5. **Occasion Match**: Where this outfit would be perfect for.

Keep responses concise, trendy, and enthusiastic. Use fashion terminology. Format with markdown.`;

    const response = await fetch('https://ai.sumopod.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gemini/gemini-3.1-flash-lite-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate a virtual try-on analysis for this outfit: "${prompt}"` },
        ],
        max_tokens: 600,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('SumoPod API Error:', errorData);
      return NextResponse.json(
        { error: `AI API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || 'No response generated.';

    return NextResponse.json({
      success: true,
      analysis: aiResponse,
      model: data.model,
      usage: data.usage,
    });
  } catch (error: any) {
    console.error('Try-on API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
