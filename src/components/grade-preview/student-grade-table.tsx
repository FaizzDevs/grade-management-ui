"use client"

import { useProgressStore } from "@/app/store/progressStore"
import { mockGradeConfig } from "@/lib/mock/gradeConfig"
import { StudentGrade } from "@/types/students"
import { ArrowBack } from "@mui/icons-material"
import { Box, Button, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography, useMediaQuery } from "@mui/material"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
    students: StudentGrade[]
    setStudents: React.Dispatch<React.SetStateAction<StudentGrade[]>>
}

export const StudentGradeTable = ({ students, setStudents }: Props) => {
    const [isSaving, setIsSaving] = useState(false)
    const [localProgress, setLocalProgress] = useState(0)
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)

    const router = useRouter()
    const params = useParams()

    const { components, chapters } = mockGradeConfig
    const classId = params?.id as string
    const { setProgress } = useProgressStore()
    const isMobile = useMediaQuery("(max-width: 768px)")

    // Hitung progress input
    useEffect(() => {
        const totalFields = students.length * chapters.length * components.length
        let filled = 0

        students.forEach((student) =>
            chapters.forEach((ch) =>
                components.forEach(({ component }) => {
                    const val = student.grades[ch.chapter]?.[component]
                        if (typeof val === "number" && !isNaN(val) && val > 0) {
                            filled++
                        }
                })
            )
        )

        const newProgress = Math.round((filled / totalFields) * 100)
        setLocalProgress(newProgress) // untuk UI
        if (classId) setProgress(classId, newProgress) // untuk global store (ClassCard)
    }, [students, classId, chapters, components, setProgress])

    const triggerAutoSave = () => {
        if(debounceTimer) clearTimeout(debounceTimer);
        const timer = setTimeout(() => {
            setIsSaving(true)
            setTimeout(() => setIsSaving(false), 800)
        }, 500)
        setDebounceTimer(timer);
    }

  // ⏳ Auto-saving indicator
    // useEffect(() => {
    //     setIsSaving(true)
    //     const timer = setTimeout(() => setIsSaving(false), 1500)
    //     return () => clearTimeout(timer)
    // }, [students])

    const handleChange = (
        studentIndex: number,
        chapter: string,
        component: string,
        value: number
      ) => {
        if (value < 0) value = 0;
        if (value > 100) value = 100;

        const updated = [...students]
        updated[studentIndex].grades[chapter][component] = value
        setStudents(updated)
        triggerAutoSave()
    }

  return (
      <Paper className="shadow-md rounded-xl p-4 space-y-4">
        {/* toolbar */}
            <Toolbar className="flex justify-between items-center gap-4">
                <div className="flex items-center">
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBack />}
                        onClick={() => router.push("/dashboard")}
                        color="primary"
                        className="!hidden sm:!inline-flex"
                    >
                        Kembali
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => router.push("/dashboard")}
                        color="primary"
                        className="!inline-flex sm:!hidden min-w-[40px] px-2 ml-2"
                    >
                        <ArrowBack fontSize="small" />
                    </Button>
                </div>
                <Typography variant="h6" className="font-semibold text-primary w-full sm:w-auto">
                    Input Nilai Mahasiswa
                </Typography>
                <Box className="flex items-center gap-3">
                    <Typography 
                        variant="body2"
                        color="textSecondary"
                        className="hidden sm:block"
                    >
                        {isSaving ? "💾 Menyimpan..." : "✅ Tersimpan"}
                    </Typography>

                    <span className="sm:hidden text-xl">
                        {isSaving ? "💾" : "✅"}
                    </span>
                </Box>
            </Toolbar>

          {/* progress */}
            <Box>
                <LinearProgress variant="determinate" value={localProgress} className="h-2 rounded" />
                <Typography variant="caption" className="block text-right mt-1">
                    {localProgress}% Selesai
                </Typography>
            </Box>

            {isMobile ? (
            <Box className="space-y-4">
                {students.map((student, idx) => (
                <Paper key={student.id} className="p-4 shadow rounded-lg">
                    <Typography variant="subtitle1" className="font-bold">{student.name}</Typography>
                    {chapters.map((ch) => (
                    <Box key={ch.chapter} className="mt-2">
                        <Typography variant="body2" className="font-semibold">{ch.chapter}</Typography>
                        <Box className="grid grid-cols-2 gap-2 mt-1">
                        {Object.keys(ch.weights).map((comp) => (
                            <TextField
                            key={comp}
                            size="small"
                            type="number"
                            label={comp}
                            value={student.grades[ch.chapter]?.[comp] || ""}
                            onChange={(e) =>
                                handleChange(idx, ch.chapter, comp, parseInt(e.target.value) || 0)
                            }
                            inputProps={{ min: 0, max: 100 }}
                            />
                        ))}
                        </Box>
                    </Box>
                    ))}
                </Paper>
                ))}
            </Box>
            ) : (
            <TableContainer sx={{ maxHeight: 500, overflowX: "auto" }}>
                <Table
                    stickyHeader
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell 
                                sx={{ minWidth: 150 }} 
                                className="font-bold sticky left-0 bg-white z-10"
                            >
                                Nama
                            </TableCell>
                            {chapters.map((ch) => (
                                <TableCell
                                    key={ch.chapter}
                                    align="center"
                                    colSpan={Object.keys(ch.weights).length}
                                    className="font-bold bg-gray-50"
                                >
                                    {ch.chapter}
                                </TableCell>
                            ))}
                            {/* <TableCell className="font-bold">Final Grade</TableCell> */}
                        </TableRow>
                        <TableRow>
                            <TableCell></TableCell>
                            {chapters.map((ch) =>
                                Object.keys(ch.weights).map((comp) => (
                                    <TableCell key={`${ch.chapter}-${comp}`} align="center">
                                        {comp}
                                    </TableCell>
                                ))
                            )}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {students.map((student, idx) => {
                            // const finalGrade = calculateFinalGrade(student, mockGradeConfig)
                            // const gradeColor = finalGrade >= 80 ? "success" : finalGrade >= 60 ? "warning" : "error"

                            return (
                                <TableRow 
                                    key={student.id} 
                                    hover
                                >
                                <TableCell className="font-medium sticky left-0 bg-white z-10">{student.name}</TableCell>
                                {chapters.map((ch) =>
                                    Object.keys(ch.weights).map((comp) => (
                                        <TableCell key={`${student.id}-${ch.chapter}-${comp}`} align="center">
                                            <TextField
                                                size="small"
                                                type="number"
                                                value={student.grades[ch.chapter]?.[comp] || ""}
                                                onChange={(e) =>
                                                    handleChange(idx, ch.chapter, comp, parseInt(e.target.value) || 0)
                                                }
                                                inputProps={{ min: 0, max: 100 }}
                                                sx={{
                                                    width: 70,
                                                    "& input": { textAlign: "center" },
                                                }}
                                            />
                                        </TableCell>
                                    ))
                                )}
                                {/* <TableCell align="right">
                                    <Chip
                                        label={finalGrade}
                                        color={gradeColor}
                                        className="font-bold"
                                        size="small"
                                    />
                                </TableCell> */}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            )}
      </Paper>
  )
}
