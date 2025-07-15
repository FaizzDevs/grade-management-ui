"use client"

import { ClassCard } from "@/components/class-card"
import { morkClasses } from "@/lib/mock/classes"
import { Box, Container, TextField, Typography } from "@mui/material"
import { useState } from "react"

export default function DashboardPage() {
    const [search, setSearch] = useState("");

    const filteredClasses = morkClasses.filter((kelas) => 
        kelas.name.toLowerCase().includes(search.toLowerCase())
    )

    const totalStudents = filteredClasses.reduce(
        (sum, kelas) => sum + kelas.studentCount,
        0
    )

    return (
        <main className="p-6">
            <Container maxWidth="lg" className="p-0">
                <Typography
                    variant="h5"
                    className="font-bold text-primary mb-4"
                >
                    Daftar Kelas
                </Typography>

                {/* summary */}
                <Box className="flex flex-col mb-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                    <p>Total Kelas: {filteredClasses.length}</p>
                    <p>Total Mahasiswa: {totalStudents}</p>
                </Box>

                {/* search input */}
                <div className="mb-6 max-w-sm">
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Cari kelas..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredClasses.map((kelas) => (
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