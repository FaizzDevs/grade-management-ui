"use client"

import { mockGradeConfig } from "@/lib/mock/gradeConfig"
import { GradeComponentKey } from "@/types/gradeConfig"
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Paper, Slider, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from "react"


export const GradeConfigChapters = () => {
    const [data, setData] = useState(mockGradeConfig)

    const totalComponent = data.components.reduce((acc, c) => acc + c.percentage, 0)
    const isComponentValid = totalComponent === 100

    const handleComponentChange = (index: number, value: number) => {
        const updated = [...data.components]
        updated[index].percentage = value
        setData({ ...data, components: updated })
    }

    const handleChaptersChange = (chapterIndex: number, key: GradeComponentKey, value: number) => {
        const updated = [...data.chapters]
        updated[chapterIndex].weights[key] = value
        setData({ ...data, chapters: updated })
    }

    return (
        <Box className="max-w-3xl mx-auto space-y-6">
            <Typography
                variant="h6"
                className="font-semibold text-primary"
            >
                Konfigurasi Komponen Nilai & Bab
            </Typography>

            {/* konfigurasi komponen */}
            <Paper className="p-4 shadow space-y-4">
                <Typography className="font-medium">
                    Persentase komponen (Total harus 100%)
                </Typography>

                {data.components.map((item, index) => (
                    <Box
                        key={item.component}
                        className="space-y-2"
                    >
                        <div className="flex justify-between">
                            <span>{item.component}</span>
                            <span>{item.percentage}%</span>
                        </div>
                        <Slider
                            value={item.percentage}
                            onChange={(_, value) => handleComponentChange(index, value as number)}
                            min={0}
                            max={100}
                        />
                    </Box>
                ))}
                {!isComponentValid && 
                    <Alert severity="error">
                        Total harus 100% (Saat ini: {totalComponent})
                    </Alert>
                }
            </Paper>

            {/* konfigurasi per bab */}
            <Paper className="p-4 shadow space-y-4">
                <Typography className="font-medium">
                    Kontribusi per Bab
                </Typography>

                {data.chapters.map((chapter, chapterIndex) => (
                    <Accordion
                        key={chapter.chapter}
                        className="border rounded-lg"
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className="font-semibold">
                                {chapter.chapter}
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            {Object.entries(chapter.weights).map(([key, value]) => (
                                <Box
                                    key={key}
                                    className="mb-4"
                                >
                                    <div className="flex justify-between mb-1">
                                        <span>{key}</span>
                                        <span>{value}%</span>
                                    </div>

                                    <Slider 
                                        value={value}
                                        onChange={(_, newValue) => handleChaptersChange(chapterIndex, key as GradeComponentKey, newValue as number)}
                                        min={0}
                                        max={100}
                                    />
                                </Box>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Paper>

            <Button
                variant="contained"
                color="primary"
            >
                Simpan Konfigurasi
            </Button>
        </Box>
    )
}