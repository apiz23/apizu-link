import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<div className="mx-auto max-w-screen-xl px-4 py-32 flex h-screen items-center">
				<div className="mx-auto max-w-xl text-center">
					<h1 className="text-3xl font-extrabold sm:text-5xl text-white">
						Visit the Apizu website <br />
						<strong className="font-extrabold text-red-700 sm:block">
							Here is the link to share.
						</strong>
					</h1>

					<p className="mt-4 sm:text-xl/relaxed">
						<FlipWords words={["QR", "Code", "Version"]} />
					</p>

					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<Button className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
							<Link href="/links">Get Started</Link>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
