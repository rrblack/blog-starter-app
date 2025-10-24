import { NextResponse } from "next/server";

export const runtime = "edge";

type ReqBody = { email: string;};

export async function POST(req: Request) {
  
  const API_KEY = process.env.MAILERLITE_API_KEY;
  const GROUP_ID = process.env.MAILERLITE_GROUP_ID; 

  try {
    const { email} = (await req.json()) as ReqBody;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!API_KEY) {
      console.error("Missing MailerLite API key");
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }

    const url = "https://connect.mailerlite.com/api/subscribers";

    const payload: any = { email };
    if (GROUP_ID) payload.groups = [GROUP_ID];

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (res.status === 200) {
        return NextResponse.json({ error: "already_subbed" }, { status: 409 });
      }
  
    if (!res.ok) {
      return NextResponse.json({ error: data?.message || data?.error || "An error occurred." }, { status: res.status });
    }

    return NextResponse.json({ message: "Success! Thanks for subscribing.", 
      subscriber:{
        email: data.data.email,
      },
     });

    
  } catch (err: any) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}