import React from "react";
import { useQRCode } from "next-qrcode";

interface QRCodeProps {
	url: string;
}

export const QRCodeComponent: React.FC<QRCodeProps> = ({ url }) => {
	const { Canvas } = useQRCode();
	return (
		<Canvas
			text={url}
			options={{
				errorCorrectionLevel: "M",
				margin: 3,
				scale: 4,
				width: 400,
				color: {
					dark: "#010599FF",
					light: "#FFBF60FF",
				},
			}}
		/>
	);
};
