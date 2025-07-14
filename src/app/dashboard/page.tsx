"use client"

import { ClassCard } from "@/components/class-card"
import { morkClasses } from "@/lib/mock/classes"
import { Container, Typography } from "@mui/material"

export default function DashboardPage() {
    return (
        <main className="p-6">
            <Container maxWidth="lg" className="p-0">
                <Typography
                    variant="h5"
                    className="font-bold text-primary"
                >
                    Daftar Kelas
                </Typography>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {morkClasses.map((kelas) => (
                        <ClassCard 
                            key={kelas.id}
                            data={kelas}
                        />
                    ))}
                </div>
            </Container>
        </main>
    )
} 