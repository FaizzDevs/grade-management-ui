"use client"

import { Button, Card, Container, TextField, Typography } from "@mui/material"
import SchoolIcon from "@mui/icons-material/School";
import Link from "next/link";

export default function HomePage() {
    return (
        <main className="flex items-center justify-center min-h-screen relative">

            {/* background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('/udinus.jpg')",
                    filter: "brightness(0.7)"
                }}
            >
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-blue-700/40 to-blue-500/30"></div>

            <Container 
                maxWidth="sm"
                className="relative z-10"
            >
                <Card
                    className="p-10 text-center shadow-2xl rounded-3xl backdrop-blur-xl bg-white/80"
                    sx={{ animation: "fadeIn 1s ease-in-out" }}
                >
                    <div className="flex justify-center mb-4">
                        <SchoolIcon 
                            sx={{ 
                                fontSize: 64, 
                                color: "#1976d2",
                                transition: "transform 0.3s",
                                "&:hover": { transform: "scale(1.1)" },
                            }} 
                        />
                    </div>

                    <Typography
                        variant="h4"
                        className="font-bold text-primary mb-1"
                        sx={{ fontFamily: "Poppins, sans-serif" }}
                    >
                        Halo, UDINUS!
                    </Typography>
                    <Typography
                        variant="body1"
                        className="mb-6 text-gray-700"
                        sx={{ lineHeight: 1.8 }}
                    >
                        Selamat datang di <strong>Sistem Manajemen Nilai</strong> <br/>Universitas Dian Nuswantoro
                    </Typography>

                    <div className="space-y-4 text-left">
                        <TextField 
                            fullWidth
                            variant="outlined"
                            label="Email"
                            type="Email"
                            size="small"
                        />
                        <TextField 
                            fullWidth
                            variant="outlined"
                            label="Password"
                            type="Password"
                            size="small"
                        />
                    </div>

                    <div className="mt-4">          
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            component={Link}
                            href="/dashboard"
                            sx={{ paddingX: 4, paddingY: 1.5, fontSize: "1rem", fontWeight: 600 }}
                        >
                            Masuk Ke Dashboard
                        </Button>
                    </div>
                </Card>
            </Container>
        </main>
    )
}