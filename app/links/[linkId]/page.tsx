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
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	ArrowBigLeftIcon,
	CircleChevronDown,
	CircleChevronUp,
	Code,
	ExternalLink,
	QrCode,
	Square,
	TableIcon,
	VenetianMask,
} from "lucide-react";
import { QRCodeComponent } from "@/components/qr-code";
import Link from "next/link";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Link {
	id: number;
	name: string;
	description: string;
	link: string;
}

export default function Page({ params }: { params: { linkId: string } }) {
	const [link, setLink] = useState<Link | null>(null);
	const [links, setLinks] = useState<Link[]>([]);
	const [idList, setIdList] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const currentLinkId = parseInt(params.linkId);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/link");
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const jsonData = await response.json();
				setLinks(jsonData);
				const currentLink = jsonData.find(
					(item: Link) => item.id === currentLinkId
				);
				if (currentLink) {
					setLink(currentLink);
				} else {
					throw new Error("Invalid ID. No data found.");
				}
				const ids = jsonData.map((item: Link) => item.id);
				setIdList(ids);
			} catch (error: any) {
				toast.error(error.message || "Error fetching data");
				setLink(null);
				setIdList([]);
			} finally {
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			}
		};

		fetchData();
	}, [currentLinkId]);

	if (isLoading) {
		return (
			<div className="max-w-7xl h-screen flex items-center justify-center py-32 md:py-52 mx-auto">
				<Code className="w-10 h-10 text-white animate-pulse" />
			</div>
		);
	}

	if (!link) {
		return (
			<div className="max-w-7xl h-screen flex items-center justify-center py-32 md:py-52 mx-auto">
				<p className="text-white">Invalid ID. No data found.</p>
			</div>
		);
	}

	const handlePrevious = () => {
		const currentIndex = idList.indexOf(currentLinkId);
		if (currentIndex > 0) {
			router.push(`/links/${idList[currentIndex - 1]}`);
		}
	};

	const handleNext = () => {
		const currentIndex = idList.indexOf(currentLinkId);
		if (currentIndex < idList.length - 1) {
			router.push(`/links/${idList[currentIndex + 1]}`);
		}
	};
	const images = [
		"https://i.pinimg.com/originals/26/45/47/2645475a9eef90f4a1fe67b76ae7d9fa.gif",
		"https://i.pinimg.com/originals/24/2e/37/242e379f970c22bf30e1689290627058.gif",
		"https://i.pinimg.com/originals/72/0c/c4/720cc43d757ee638ad5054a05220fafe.gif",
		"https://i.pinimg.com/originals/c7/38/d0/c738d0dd73ae356f539823f7b255b387.gif",
		"https://i.pinimg.com/originals/33/cb/e3/33cbe3b0d0a47dcf6eb3c169783ebe66.gif",
		"https://i.pinimg.com/originals/a3/00/e3/a300e3f1d1eb3e0dcb3903acb5c0db65.gif",
	];

	const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

	return (
		<div className="max-w-7xl py-36 md:py-52 mx-auto h-screen">
			<Button
				variant="ghost"
				onClick={() => router.push("/")}
				className="absolute top-8 left-4 text-white px-2.5 py-4 rounded-md"
			>
				<ArrowBigLeftIcon className="w-8 h-8" />
			</Button>
			<Button
				variant="ghost"
				onClick={() => router.push("/links/addData")}
				className="absolute top-8 right-4 text-white px-2.5 py-4 rounded-md"
			>
				<VenetianMask className="w-8 h-8" />
			</Button>
			<Tabs defaultValue="card" className="max-w-3xl mx-auto px-2">
				<TabsList className="grid grid-cols-2 gap-5">
					<TabsTrigger value="card">
						<Square />
						Card
					</TabsTrigger>
					<TabsTrigger value="table">
						<TableIcon />
						Table
					</TabsTrigger>
				</TabsList>
				<TabsContent value="card">
					<div className="rounded-xl shadow-xl bg-neutral-50 bg-opacity-20 py-2.5">
						<div className="grid grid-cols-1">
							<Button
								onClick={handlePrevious}
								className="w-fit mx-auto bg-transparent"
							>
								<CircleChevronUp className="text-white" />
							</Button>
							<div className="py-10 md:px-20">
								<Card className="h-fit bg-transparent border-none">
									<CardContent>
										<Dialog>
											<div className="group relative block h-72 sm:h-80 lg:h-96">
												<span className="absolute inset-0 border-2 border-dashed border-white"></span>
												<div className="relative flex h-full transform items-end border-2  bg-neutral-600 hover:bg-purple-900 text-white border-black transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
													<div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
														<QrCode />
														<h2 className="mt-4 text-xl font-medium sm:text-2xl">
															{link.name}
														</h2>
													</div>
													<img
														alt="background"
														src={getRandomImage()}
														className="absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity"
													/>
													<div className="absolute p-4 w-full opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
														<h3 className="text-xl font-medium sm:text-2xl">{link.name}</h3>
														<p className="mt-4 text-sm sm:text-base">{link.description}</p>
														<DialogTrigger className="w-full mt-8 p-2.5">
															<p className="font-semibold bg-gray-300 bg-opacity-15 w-fit mx-auto p-3 rounded-xl">
																Know more
															</p>
														</DialogTrigger>
													</div>
												</div>
											</div>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>{link.name}</DialogTitle>
												</DialogHeader>
												<div className="mx-auto">
													<QRCodeComponent url={link.link} />
												</div>
												<Link href={link.link} target="_blank" className="flex justify-end">
													<ExternalLink />
												</Link>
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
				</TabsContent>
				<TabsContent
					value="table"
					className="bg-slate-100 bg-opacity-90 rounded-lg py-5 px-2"
				>
					<ScrollArea className="h-[500px] w-fit">
						<Table>
							<TableCaption>List of Website Links</TableCaption>
							<TableHeader>
								<TableRow className="bg-white hover:bg-white">
									<TableHead className="w-[100px]">ID</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Description</TableHead>
									<TableHead className="text-right">Link</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{links.map((link) => (
									<TableRow
										key={link.id}
										className="hover:bg-indigo-800 hover:text-white"
									>
										<TableCell className="font-medium">{link.id}</TableCell>
										<TableCell>{link.name}</TableCell>
										<TableCell>{link.description}</TableCell>
										<TableCell className="text-right">
											<Link href={link.link} target="_blank" className="flex justify-end">
												<ExternalLink className="hover:text-blue-500" />
											</Link>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</ScrollArea>
				</TabsContent>
			</Tabs>
		</div>
	);
}
