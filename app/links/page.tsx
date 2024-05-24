"use client";

import "../globals.css";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();

	const redirectFX = () => {
		router.push("links/1");
	};
	return (
		<div className="grid h-screen place-content-center px-4">
			<div className="text-center">
				<h1 className="text-9xl font-black text-gray-200 text-opacity-40">200</h1>
				<h1 className="my-6 text-2xl font-bold tracking-tight text-gray-200 sm:text-4xl">
					Welcome
				</h1>
				<p className="my-4 text-amber-500">Click below button to Continue</p>
				<button
					className="group relative inline-block focus:outline-none focus:ring"
					onClick={redirectFX}
				>
					<span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-red-900 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
					<span className="relative inline-block border-white border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75">
						Continue
					</span>
				</button>
			</div>
		</div>
	);
}
