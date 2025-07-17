"use client"

import { ClassInfo } from "@/types/class";
import { CheckCircle, Settings } from "lucide-react"
import { Avatar, Box, Button, Card, CardContent, Chip, LinearProgress, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
    data: ClassInfo & {
        progress?: number
    }
}

export const ClassCard = ({ data }: Props) => {
    return (
       <Card 
            className="w-full max-w-[380px] rounded-3xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 dark:border-gray-700"
            sx={{ overflow: "hidden" }}
        >
            <CardContent className="p-5 space-y-5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                
                {/* header */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Avatar
                            sx={{
                                bgcolor: data.isConfigured ? "success.light" : "warning.light",
                                width: 48,
                                height: 48,
                                fontWeight: "bold",
                                color: "#fff",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                            }}
                        >
                            {data.name.charAt(0).toUpperCase()}
                        </Avatar>

                        <div>
                            <Typography 
                                variant="h6" 
                                className="font-bold text-gray-800 leading-tight"
                            >
                                {data.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                            >
                                {data.semester}
                            </Typography>

                        </div>
                    </div>
                    {data.isConfigured ? (
                        <CheckCircle className="text-green-500 w-6 h-6" />
                    ) : (
                        <Settings className="text-gray-400 w-5 h-5 animate-pulse" />
                    )}
                </div>

                {/* Info */}
                <div className="space-y-1">
                    <Typography
                        variant="body2"
                        className="text-gray-600"
                    >
                        Jumlah Mahasiswa:{" "}
                        <span className="font-semibold">{data.studentCount}</span>
                    </Typography>
                    <Chip
                        label={data.isConfigured ? "Konfigurasi Selesai" : "Belum Konfigurasi"}
                        color={data.isConfigured ? "success" : "warning"}
                        size="small"
                        className="rounded-lg"
                    />
                </div>

                {/* progress */}
                <Box>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        className="font-medium"
                    >
                        Progress Nilai
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={data.progress ?? 0}
                        sx={{
                            borderRadius: "8px",
                            height: 8,
                            mt: 1,
                            backgroundColor: "#f3f4f6",
                            "& .MuiLinearProgress-bar": {
                                borderRadius: "8px",
                            }
                        }}
                        color={data.progress === 100 ? "success" : "primary"} // otomatis hijau saat selesai
                    />
                    <Typography
                        variant="caption"
                        className={`block mt-1 font-medium ${data.progress === 100 ? "text-green-600" : "text-gray-500"}`}
                    >
                        {data.progress === 100
                        ? "🎉 Nilai sudah lengkap!"
                        : `${data.progress ?? 0}% selesai`}
                    </Typography>
                </Box>

                {/* button */}
                <div className="flex gap-2 pt-2">
                    <Button
                        component={Link}
                        href={`/class/${data.id}/grades`}
                        variant="contained"
                        color="primary"
                        size="small"
                        fullWidth
                        sx={{ borderRadius: "10px", fontWeight: "bold" }}
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
                        sx={{ borderRadius: "10px", fontWeight: "bold" }}
                    >
                        Konfigurasi
                    </Button>
                </div>
            </CardContent>
       </Card>
    )
}