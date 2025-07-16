"use client"

import { Button, Container, Typography } from "@mui/material"
import SchoolIcon from "@mui/icons-material/School";
import Link from "next/link";

export default function HomePage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <Container>
                <SchoolIcon sx={{ fontSize: 64, color: "#1976d2"}} />
                <Typography
                    variant="h6"
                    className="font-bold text-primary mb-4"
                >
                    Halo UDINUS
                </Typography>
                <Typography
                    variant="h6"
                    className="mb-6"
                    color="textSecondary"
                >
                    Selamat datang di <strong>Grade Management System</strong>.
                    Kelola kelas, input nilai, dan ekspor laporan dengan mudah.
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={Link}
                    href="/dashboard"
                    sx={{ paddingX: 4, paddingY: 1.5, fontSize: "1.1rem", fontWeight: 600 }}
                >
                    Masuk Ke Dashboard
                </Button>
            </Container>
        </main>
    )
}