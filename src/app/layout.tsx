import Provider from "@/util/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import { SidebarProvider } from "@/hooks/contextApi/SidebarContext";
import { ModalProvider } from "@/util/Modals/ModalsContext";
import { AuthProvider } from "@/components/providers/AuthProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: 'XYZ',
	description: 'Business Management Software',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<ReduxProvider>
						<SidebarProvider>
							<Provider>
								<ModalProvider>
									{children}
								</ModalProvider>
							</Provider>
						</SidebarProvider>
					</ReduxProvider>
				</AuthProvider>
			</body>
		</html>
	);
};
