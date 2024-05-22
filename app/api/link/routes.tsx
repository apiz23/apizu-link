"use server";

import supabase from "@/lib/supabase";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

// export default async function handler(req: any, res: any) {
// 	const { id } = req.query;

// 	const { data, error } = await supabase
// 		.from("link-website")
// 		.select("*")
// 		.eq("id", id)
// 		.single();

// 	if (error) {
// 		return res.status(500).json({ error: error.message });
// 	}

// 	res.status(200).json(data);
// }

export async function GET(req: Request, context: any, res: NextApiResponse) {
	const { params } = context;

	try {
		const linkId = params?.linkId;

		const { data, error } = await supabase
			.from("link-website")
			.select("*")
			.eq("id", linkId);
		if (error) {
			throw error;
		}

		return NextResponse.json(data);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
}
