"use client"

import { GradeComponentConfig } from "@/types/gradeConfig"
import { Alert, Box, Button, Paper, Slider, Typography} from "@mui/material"
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

    // simulasi preview score 80
    const sampleScore = 87
    const finalGrade = data.reduce(
        (acc, curr) => acc + (sampleScore *  curr.percentage) / 100,
        0
    )

    return (
        <Box className="space-y-6 max-w-xl">
            <Typography 
                className="font-semibold text-primary"
                variant="h6"
            >
                Konfigurasi Komponen Nilai
            </Typography>

            {/* slider */}
            <div className="bg-white rounded-lg p-4 shadow space-y-4">
                {data.map((item, index) => (
                    <div 
                        key={item.component}
                        className="space-y-2"
                    >
                        <div className="flex justify-between">
                            <Typography className="font-medium">
                                {item.component}
                            </Typography>
                            <Typography>
                                {item.percentage}%
                            </Typography>
                        </div>
                        <Slider 
                            value={item.percentage}
                            onChange={(_, value) => handleChange(index, value as number)}
                            min={0}
                            max={100}
                            step={1}
                        />
                    </div>
                ))}
            </div>
            
            {!isValid && (
                <Alert
                    severity="error"
                >
                    Total Harus 100% (saat ini: {total}%)
                </Alert>
            )}

            <Button
                variant="contained"
                color="primary"
                disabled={!isValid}
            >
                Simpan Konfigurasi
            </Button>

            {/* realtime preview */}
            <Paper className="p-4 bg-gray-50 shadow-md">
                <Typography
                    variant="subtitle1"
                    className="mb-2 font-semibold"
                >
                    Preview Kalkulasi (contoh nilai: {sampleScore})
                </Typography>

                {data.map((item) => (
                    <Typography
                        key={item.component}
                    >
                        {item.percentage}: {sampleScore} x {item.percentage}% = {" "}
                        {(sampleScore * item.percentage) / 100}
                    </Typography>
                ))}

                <Typography className="mt-3 font-bold text-primary">
                    Nilai Akhir: {finalGrade.toFixed(2)}
                </Typography>
            </Paper>
        </Box>
    )
}