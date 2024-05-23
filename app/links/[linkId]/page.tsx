"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CircleChevronDown, CircleChevronUp, QrCode } from "lucide-react";
import { QRCodeComponent } from "@/components/qr-code";

interface Link {
	name: string;
	description: string;
	link: string;
}

export default function Page({ params }: { params: { linkId: string } }) {
	const [link, setLink] = useState<Link | any>(null);
	const router = useRouter();
	const currentLinkId = parseInt(params.linkId);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data, error } = await supabase
					.from("link-website")
					.select("*")
					.eq("id", currentLinkId);

				if (error) {
					console.error("Failed to fetch data:", error.message);
				} else {
					setLink(data);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [currentLinkId]);

	if (!link) {
		return <div>Loading...</div>;
	}

	const handlePrevious = () => {
		if (currentLinkId > 1) {
			router.push(`/links/${currentLinkId - 1}`);
		}
	};

	const handleNext = () => {
		router.push(`/links/${currentLinkId + 1}`);
	};

	return (
		<div className="max-w-7xl md:px-4 py-52 mx-auto h-screen">
			<div className="grid grid-cols-1">
				<Button onClick={handlePrevious} className="w-fit mx-auto bg-transparent">
					<CircleChevronUp className="text-white" />
				</Button>
				<div className="px-10 py-10 md:px-72">
					<Card className="h-fit bg-transparent border-none">
						<CardContent>
							<Dialog>
								<div className="group relative block h-64 sm:h-80 lg:h-96">
									<span className="absolute inset-0 border-2 border-dashed border-white"></span>
									<div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
										<div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
											<QrCode />
											<h2 className="mt-4 text-xl font-medium sm:text-2xl">
												{link[0].name}
											</h2>
										</div>

										<div className="absolute p-4 w-full opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
											<h3 className="text-xl font-medium sm:text-2xl">{link[0].name}</h3>

											<p className="mt-4 text-sm sm:text-base">{link[0].description}</p>
											<DialogTrigger className="w-full mt-8 p-2.5">
												<p className="font-bold">Know more</p>
											</DialogTrigger>
										</div>
									</div>
								</div>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>{link[0].name}</DialogTitle>
									</DialogHeader>
									<div className="mx-auto">
										<QRCodeComponent url={link[0].link} />
									</div>
									{link[0].link}
								</DialogContent>
							</Dialog>
						</CardContent>
					</Card>
				</div>
				<Button onClick={handleNext} className="w-fit mx-auto bg-transparent">
					<CircleChevronDown className="text-white" />
				</Button>
			</div>
		</div>
	);
}
