"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowBigLeftIcon, ExternalLink, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

interface Link {
	id: number;
	name: string;
	description: string;
	link: string;
}

async function fetchLinks(): Promise<Link[]> {
	const response = await fetch("/api/link");
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	return response.json();
}

export default function Page() {
	const {
		data: links = [],
		error,
		isLoading,
	} = useQuery({
		queryKey: ["links"],
		queryFn: fetchLinks,
	});

	const router = useRouter();

	if (isLoading) {
		return (
			<div className="max-w-7xl h-screen flex items-center justify-center py-32 md:py-52 mx-auto">
				<LoaderIcon className="w-10 h-10 text-white animate-spin" />
			</div>
		);
	}

	if (error) {
		toast.error("Error fetching data");
		return (
			<div className="max-w-7xl h-screen flex items-center justify-center py-32 md:py-52 mx-auto">
				<p className="text-white">Error fetching data</p>
			</div>
		);
	}

	return (
		<div className="max-w-7xl py-36 md:py-52 mx-auto h-screen">
			<Button
				variant="ghost"
				onClick={() => router.push("/")}
				className="absolute top-8 left-4 text-white px-2.5 py-4 rounded-md"
			>
				<ArrowBigLeftIcon className="w-8 h-8" />
			</Button>
			<BentoGrid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{links.map((link: Link) => (
					<BentoCard
						key={link.id}
						name={link.name}
						className="col-span-1"
						background={
							<div
								className="bg-cover"
								style={{ backgroundImage: `url(${link.link})` }}
							/>
						}
						Icon={ExternalLink}
						description={link.description}
						href={link.link}
						cta="Visit Link"
					/>
				))}
			</BentoGrid>
		</div>
	);
}
