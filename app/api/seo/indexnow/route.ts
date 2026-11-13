import { NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/seo/indexnow";
import { SITE_URL } from "@/lib/seo/brand";

function getAllCanonicalUrls(): string[] {
  const baseUrl = SITE_URL;
  const urls: string[] = [
    `${baseUrl}/`,
    `${baseUrl}/services`,
    `${baseUrl}/packages`,
    `${baseUrl}/portfolio`,
    `${baseUrl}/about`,
    `${baseUrl}/consultation`,
    `${baseUrl}/contact`,
  ];

  return Array.from(new Set(urls));
}

export async function POST(request: Request) {
  try {
    let urlsToSubmit: string[] = [];

    try {
      const body = await request.json();
      if (Array.isArray(body?.urls) && body.urls.length > 0) {
        urlsToSubmit = body.urls;
      }
    } catch {
      urlsToSubmit = getAllCanonicalUrls();
    }

    if (urlsToSubmit.length === 0) {
      urlsToSubmit = getAllCanonicalUrls();
    }

    const result = await submitToIndexNow(urlsToSubmit);

    return NextResponse.json(
      {
        ...result,
        submittedCount: urlsToSubmit.length,
      },
      { status: result.success ? 200 : result.status || 500 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unknown IndexNow error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const allUrls = getAllCanonicalUrls();
  return NextResponse.json({
    status: "IndexNow endpoint ready",
    siteUrl: SITE_URL,
    totalCanonicals: allUrls.length,
    canonicalUrls: allUrls,
    instructions:
      "Send a POST request to this endpoint to push updated URLs to Bing, Yandex, Naver, and participating search engines via IndexNow.",
  });
}
