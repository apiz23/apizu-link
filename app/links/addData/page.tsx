"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Page() {
	const [formData, setFormData] = useState({
		name: "",
		url: "",
		description: "",
	});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/link", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: formData.name,
					description: formData.description,
					link: formData.url,
				}),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			toast.success("Success");
		} catch (error) {
			console.error("Error inserting data:", error);
			toast.error("Error inserting data");
		}
	};

	return (
		<div className="max-w-2xl py-36 md:py-52 mx-auto min-h-screen">
			<form onSubmit={handleSubmit}>
				<div className="p-4">
					<label className="block text-lg font-medium text-gray-100"> Name </label>
					<Input name="name" value={formData.name} onChange={handleChange} />
				</div>
				<div className="p-4">
					<label className="block text-lg font-medium text-gray-100"> Url </label>
					<Input name="url" value={formData.url} onChange={handleChange} />
				</div>
				<div className="p-4">
					<label className="block text-lg font-medium text-gray-100">
						{" "}
						Description{" "}
					</label>
					<Textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>
				</div>
				<div className="p-4">
					<Button
						type="submit"
						className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
					>
						<span className="absolute -start-full transition-all group-hover:start-4">
							<svg
								className="size-5 rtl:rotate-180"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</span>

						<span className="text-sm font-medium transition-all group-hover:ms-4">
							Upload
						</span>
					</Button>
				</div>
			</form>
		</div>
	);
}
