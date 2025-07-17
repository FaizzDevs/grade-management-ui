"use client"

import { GradeComponentConfig } from "@/types/gradeConfig"
import { ArrowBack, Save } from "@mui/icons-material"
import { Alert, Box, Button, Card, CardContent, Divider, Paper, Slider, Typography} from "@mui/material"
import Link from "next/link"
import { useState } from "react"

interface Props {
    initialData: GradeComponentConfig[]
}

export const GradeConfigForm = ({ initialData }: Props) => {
    const [data, setData] = useState(initialData)
    const total = data.reduce((acc, curr) => acc + curr.percentage, 0)
    const isValid = total === 100

    const handleChange = (index: number, value: number) => {
        const updated = [...data]
        updated[index].percentage = value
        setData(updated)
    }

    // simulasi preview
    const sampleScore = 87
    const finalGrade = data.reduce(
        (acc, curr) => acc + (sampleScore *  curr.percentage) / 100,
        0
    )

    return (
        <Box className="max-w-5xl mx-auto space-y-10 p-6">

            <Button
                component={Link}
                href="/dashboard"
                variant="outlined"
                startIcon={<ArrowBack />}
            >
                Kembali
            </Button>

            {/* header */}
            <Typography 
                className="font-semibold text-primary mb-4"
                variant="h5"
            >
                ⚙️ Konfigurasi Komponen Nilai
            </Typography>

            {/* slider */}
            <Card className="shadow-lg rounded-2xl border border-gray-100">
                <CardContent className="space-y-6">

                    {/* slider */}
                    {data.map((item, index) => (
                        <Box 
                            key={item.component}
                            className="space-y-3"
                        >
                            <Box className="flex justify-between items-center">
                                <Typography 
                                    className="font-medium"
                                    variant="subtitle1"
                                >
                                    {item.component}
                                </Typography>
                                <Typography className="font-bold text-primary">
                                    {item.percentage}%
                                </Typography>
                            </Box>
                            <Slider 
                                value={item.percentage}
                                onChange={(_, value) => handleChange(index, value as number)}
                                min={0}
                                max={100}
                                step={1}
                                color={isValid ? "primary" : "error"}
                                sx={{
                                    "& .MuiSlider-thumb": { width: 18, height: 18 },
                                    "& .MuiSlider-track": { height: 8 },
                                    "& .MuiSlider-rail": { height: 8, opacity: 0.4 },
                                }}
                            />
                        </Box>
                    ))}
                </CardContent>
            </Card>
            
            {!isValid && (
                <Alert
                    severity="error"
                    className="rounded-lg"
                >
                    Total harus <strong>100%</strong> (saat ini: {total}%)
                </Alert>
            )}

            {/* simpan */}
            <Button
                variant="contained"
                color="primary"
                disabled={!isValid}
                fullWidth
                size="large"
                startIcon={<Save />}
                sx={{
                    borderRadius: "12px",
                    fontWeight: "bold",
                    py: 1.5
                }}
            >
                Simpan Konfigurasi
            </Button>

            {/* realtime preview */}
            <Paper className="p-5 rounded-xl bg-gray-50 shadow space-y-4">
                <Typography
                    variant="subtitle1"
                    className="font-semibold mb-2 text-gray-700"
                >
                    🔍 Preview Kalkulasi (contoh nilai: {sampleScore})
                </Typography>

                {data.map((item) => (
                    <Typography
                        key={item.component}
                        className="text-gray-600"
                    >
                        {item.percentage}: {sampleScore} x {item.percentage}% = {" "}
                        <strong>{((sampleScore * item.percentage) / 100).toFixed(2)}</strong>
                    </Typography>
                ))}

                <Divider className="my-2" />
                <Typography className="text-lg font-bold text-primary">
                    Nilai Akhir: {finalGrade.toFixed(2)}
                </Typography>
            </Paper>
        </Box>
    )
}