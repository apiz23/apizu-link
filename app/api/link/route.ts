import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const apiUrl = process.env.API_URL;
		if (!apiUrl) {
			throw new Error("API_URL is not defined in environment variables.");
		}

		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error: any) {
		console.error("Error fetching data:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const { name, description, link } = await req.json();
		const apiUrl = process.env.API_URL;
		if (!apiUrl) {
			throw new Error("API_URL is not defined in environment variables.");
		}

		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, description, link }),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();
		return NextResponse.json(data, { status: 201 });
	} catch (error: any) {
		console.error("Error inserting data:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
