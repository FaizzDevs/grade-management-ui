"use client"

import { mockGradeConfig } from "@/lib/mock/gradeConfig"
import { GradeComponentKey } from "@/types/gradeConfig"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Paper, Slider, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from "react"


export const GradeConfigChapters = () => {
    const [data, setData] = useState(mockGradeConfig)

    const totalComponent = data.components.reduce((acc, c) => acc + c.percentage, 0)
    const isComponentValid = totalComponent === 100

    // const handleComponentChange = (index: number, value: number) => {
    //     const updated = [...data.components]
    //     updated[index].percentage = value
    //     setData({ ...data, components: updated })
    // }

    const handleChaptersChange = (chapterIndex: number, key: GradeComponentKey, value: number) => {
        const updated = [...data.chapters]
        updated[chapterIndex].weights[key] = value
        setData({ ...data, chapters: updated })
    }

    return (
        <Box className="max-w-5xl mx-auto space-y-10 p-6">

            <Typography 
                className="font-bold text-primary"
                variant="h4"
            >
                Kontribusi per Bab
            </Typography>

            <Paper className="p-6 rounded-xl shadow space-y-4">
                <Typography
                    variant="h6"
                    className="font-semibold"
                >
                    Detail Kontribusi per Bab
                </Typography>
                <Divider />

                {data.chapters.map((chapter, chapterIndex) => (
                    <Accordion
                        key={chapter.chapter}
                        className="border rounded-lg"
                        sx={{
                            "&.Mui-expanded": {
                            borderLeft: "4px solid #1976d2",
                            backgroundColor: "#f9fafb",
                            },
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className="font-semibold text-primary">
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

            {/* simpan */}
            <Box className="bottom-4">
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ py: 1.5, fontWeight: "bold", borderRadius: "10px" }}
                    disabled={!isComponentValid}
                >
                    ✅ Simpan Konfigurasi
                </Button>
            </Box>
        </Box>
    )
}