"use client"

import { ClassInfo } from "@/types/class";
import { CheckCircle, Settings } from "lucide-react"
import { Box, Button, Card, CardContent, Chip, LinearProgress, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
    data: ClassInfo & {
        progress?: number
    }
}

export const ClassCard = ({ data }: Props) => {
    return (
       <Card className="w-full max-w-[360px] rounded-2xl shadow-md p-4 flex flex-col justify-between">
            <CardContent className="p-0 space-y-3">
                <div className="flex justify-between items-center mb-3">
                    <Typography 
                        variant="h6" 
                        className="font-semibold"
                    >
                        {data.name}
                    </Typography>

                    {data.isConfigured ? (
                        <CheckCircle className="text-green-600 w-5 h-5" />
                    ) : (
                        <Settings className="text-gray-500 w-5 h-5 animate-pulse" />
                    )}
                </div>

                <p className="text-sm text-muted-foreground mb-1">
                    {data.semester}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                    Jumlah Mahasiswa: {data.studentCount}
                </p>

                {/* config status */}
                <Chip
                    label={data.isConfigured ? "Konfigurasi Selesai" : "Belum Konfigurasi"}
                    color={data.isConfigured ? "success" : "warning"}
                     size="small"
                />

                {/* progress bar */}
                <Box>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                    >
                        Progress Nilai
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={data.progress ?? 0}
                        className="rounded h-2 mt-1"
                        color={data.progress === 100 ? "success" : "primary"} // otomatis hijau saat selesai
                    />
                    {data.progress === 100 && (
                    <Typography variant="caption" color="green">
                        🎉 Nilai sudah lengkap!
                    </Typography>
                    )}
                </Box>

                <div className="flex gap-2">
                    <Button
                        component={Link}
                        href={`/class/${data.id}/grades`}
                        variant="contained"
                        color="primary"
                        size="small"
                        fullWidth
                    >
                        Input Nilai
                    </Button>
                    <Button
                        component={Link}
                        href={`/class/${data.id}/configure`}
                        variant="outlined"
                        color="secondary"
                        size="small"
                        fullWidth
                    >
                        Konfigurasi
                    </Button>
                </div>
            </CardContent>
       </Card>
    )
}