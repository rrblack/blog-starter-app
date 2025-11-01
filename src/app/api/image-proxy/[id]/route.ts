import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const {id: assetId } = await context.params;

  if (!assetId) {
    return new Response('Missing asset ID', { status: 400 });
  }

  // Step 1: Fetch asset metadata
  const metadataRes = await fetch(`https://photo.kyles-app.click/api/assets/${assetId}`, {
    headers: {
      'x-api-key': process.env.IMMICH_API_KEY!,
    },
  });

  if (!metadataRes.ok) {
    return new Response('Failed to fetch asset metadata', { status: metadataRes.status });
  }

  const metadata = await metadataRes.json();
  const isVideo = metadata.type === 'VIDEO';

  // Step 2: Build correct endpoint
  const endpoint = isVideo ? 'video/playback' : 'thumbnail';
  const queryParams = new URLSearchParams();
  if (!isVideo) queryParams.append('size', 'preview');
  if (metadata.sharedKey) queryParams.append('key', metadata.sharedKey);

  const assetUrl = `https://photo.kyles-app.click/api/assets/${assetId}/${endpoint}?${queryParams.toString()}`;

  // Step 3: Proxy the asset
  const response = await fetch(assetUrl, {
    headers: {
      'x-api-key': process.env.IMMICH_API_KEY!,
    },
  });

  if (!response.ok || !response.body) {
    return new Response('Failed to fetch asset', { status: response.status });
  }

  return new Response(response.body, {
    status: 200,
    headers: {
      'Content-Type': response.headers.get('Content-Type') || (isVideo ? 'video/mp4' : 'image/jpeg'),
    },
  });
}