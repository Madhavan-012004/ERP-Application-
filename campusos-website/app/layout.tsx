import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampusOS – The Complete School Management Platform",
  description: "CampusOS is a modern, role-based school ERP platform for institutions of all sizes. Manage students, staff, fees, timetables, and more — all in one place.",
  keywords: "school ERP, campus management, student management, fee management, timetable, CampusOS",
  openGraph: {
    title: "CampusOS – The Complete School Management Platform",
    description: "Manage your entire institution with CampusOS. Role-based access for admins, teachers, students, and parents.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
