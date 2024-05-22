"use client";

import { Card, CardContent } from "@/components/ui/card";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export default function Page() {
	return (
		<div className="max-w-7xl md:px-4 py-52 mx-auto h-screen">
			<Carousel orientation="vertical | horizontal">
				<CarouselContent className="px-10 py-10 md:px-72">
					<CarouselItem>
						<Card className="h-fit bg-transparent border-none">
							<CardContent>
								<Dialog>
									<div className="group relative block h-64 sm:h-80 lg:h-96">
										<span className="absolute inset-0 border-2 border-dashed border-white"></span>

										<div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
											<div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="size-10 sm:size-12"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>

												<h2 className="mt-4 text-xl font-medium sm:text-2xl">
													Go around the world111
												</h2>
											</div>

											<div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
												<h3 className="text-xl font-medium sm:text-2xl">
													Go around the world
												</h3>

												<p className="mt-4 text-sm sm:text-base">
													Lorem ipsum dolor sit amet consectetur adipisicing elit.
													Cupiditate, praesentium voluptatem omnis atque culpa repellendus.
												</p>
												<DialogTrigger className="w-full">
													<p className="mt-8 font-bold">Know more</p>
												</DialogTrigger>
											</div>
										</div>
									</div>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Are you absolutely sure?</DialogTitle>
											<DialogDescription>
												This action cannot be undone. This will permanently delete your
												account and remove your data from our servers.
											</DialogDescription>
										</DialogHeader>
									</DialogContent>
								</Dialog>
							</CardContent>
						</Card>
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}
