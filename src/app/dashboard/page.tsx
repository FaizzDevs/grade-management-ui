"use client"

import { ClassCard } from "@/components/class-card"
import { mockClasses } from "@/lib/mock/classes"
import { Card, CardContent, Container, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useProgressStore } from "@/app/store/progressStore"
import { ClassInfo } from "@/types/class"
import SchoolIcon from "@mui/icons-material/School";

// Komponen wrapper agar bisa pakai Hook di tempat yang benar
const ClassCardWithProgress = ({ data }: { data: ClassInfo }) => {
    const progress = useProgressStore((state) => state.progressMap[data.id] ?? 0)

    return <ClassCard data={{ ...data, progress }} />
}

export default function DashboardPage() {
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("name")
    const [semester, setSemester] = useState("all")

    let filteredClasses = mockClasses.filter((kelas) =>
        kelas.name.toLowerCase().includes(search.toLowerCase())
    );

    if (semester !== "all") {
        filteredClasses = filteredClasses.filter((kelas) => kelas.semester === semester)
    }

    if (sort === "progress") {
        filteredClasses = [...filteredClasses].sort((a, b) => {
            const pa = useProgressStore.getState().progressMap[a.id] ?? 0;
            const pb = useProgressStore.getState().progressMap[b.id] ?? 0;
            return pb - pa;
        })
    }

    const totalStudents = filteredClasses.reduce(
        (sum, kelas) => sum + kelas.studentCount, 0
    )

    const totalProgress = Math.round(
        filteredClasses.reduce(
            (sum, kelas) => sum + (useProgressStore.getState().progressMap[kelas.id] ?? 0), 0
        ) / (filteredClasses.length || 1)
    )

    return (
        <main className="p-6 bg-gray-50 min-h-screen">
            <Container maxWidth="lg" className="space-y-6">

                {/* Header */}
                <div className="flex items-center gap-3">
                    <SchoolIcon sx={{ color: "#1976d2", fontSize: 36 }} />
                    <Typography variant="h4" className="font-bold text-primary">
                        Dashboard Kelas
                    </Typography>
                </div>

              {/* summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="shadow-md">
                        <CardContent>
                            <Typography variant="body2" color="textSecondary">Total Kelas</Typography>
                            <Typography variant="h6" className="font-semibold">{filteredClasses.length}</Typography>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md">
                        <CardContent>
                            <Typography variant="body2" color="textSecondary">Total Mahasiswa</Typography>
                            <Typography variant="h6" className="font-semibold">{totalStudents}</Typography>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md">
                        <CardContent>
                            <Typography variant="body2" color="textSecondary">Rata-rata Progress</Typography>
                            <Typography variant="h6" className="font-semibold">{totalProgress}%</Typography>
                        </CardContent>
                    </Card>
                </div>

                {/* filter */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <TextField
                        placeholder="Cari kelas..."
                        size="small"
                        variant="outlined"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/3"
                    />
                    
                    <div className="flex gap-4">
                        <Select
                            value={sort}
                            size="small"
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <MenuItem>Sort: Nama</MenuItem>
                            <MenuItem>Sort: Progress</MenuItem>
                        </Select>
                        <Select
                            value={semester}
                            size="small"
                            onChange={(e) => setSemester(e.target.value)}
                        >
                            <MenuItem value="all">Semua Semester</MenuItem>
                            <MenuItem value="Genap">Genap</MenuItem>
                            <MenuItem value="Ganjil">Ganjil</MenuItem>
                        </Select>
                    </div>
                </div>

                {/* kelas card */}
                {filteredClasses.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredClasses.map((kelas) => (
                            <ClassCardWithProgress 
                                key={kelas.id}
                                data={kelas}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        <Typography variant="body1">
                            Tidak ada kelas ditemukan
                        </Typography>
                    </div>
                )}
            </Container>
        </main>
    )
}
