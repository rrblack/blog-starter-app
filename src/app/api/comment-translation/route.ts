import { NextResponse } from "next/server";

export const runtime = 'edge';

type ReqBody = { message: string, translate_into: string};

export async function POST(req:Request) {
    const API_KEY= process.env.DEEPL_API_KEY;
    const url= "https://api-free.deepl.com/v2/translate"
    try {
     const {message, translate_into} = (await req.json()) as ReqBody
     const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `DeepL-Auth-Key ${API_KEY}`,
      },
      body: JSON.stringify({
        text: [message],
        target_lang: translate_into
      }),
    });

    const data= await res.json();
    console.log("maybe this is bug?:", message, translate_into)
    return NextResponse.json({ translation: data.translations[0].text});
   } catch(error) {
    console.error("error:", error)
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
   }
}