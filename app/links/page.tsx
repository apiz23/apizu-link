"use client";

import "../globals.css";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Page() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/link");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const jsonData = await response.json();
				setData(jsonData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);
	return (
		<>
			<div className="grid min-h-screen place-content-center px-4">
				<div className="text-center">
					<h1 className="text-9xl font-black text-gray-200 text-opacity-40 mb-10">
						200
					</h1>
					<h1 className="text-3xl font-extrabold sm:text-5xl text-white">
						Visit the Apizu website <br />
						<strong className="font-extrabold text-red-700 sm:block">
							Here is the link to share.
						</strong>
					</h1>
					<p className="mt-4 sm:text-xl/relaxed">
						<FlipWords words={["QR", "Code", "Version"]} />
					</p>
					<h1 className="my-6 text-2xl font-bold tracking-tight text-gray-200 sm:text-4xl">
						Welcome
					</h1>
					<p className="my-4 text-amber-500">Click below button to Continue</p>

					<Link href="links/1">
						<div className="group relative inline-block focus:outline-none focus:ring">
							<span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

							<span className="relative inline-block border-white border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-wides group-active:text-opacity-75">
								Continue
							</span>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
}
