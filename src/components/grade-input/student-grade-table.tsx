"use client"

import { mockGradeConfig } from "@/lib/mock/gradeConfig"
import { mockStudents } from "@/lib/mock/students"
import { StudentGrade } from "@/types/students"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import clsx from "clsx"
import { useState } from "react"

export const StudentGradeTable = () => {
    const [students, setStudents] = useState<StudentGrade[]>(mockStudents)

    const calculateFinalGrade = (student: StudentGrade) => {
        const { components, chapters } = mockGradeConfig

        let total = 0

        components.forEach(({ component, percentage }) => {
            let compScore = 0

            chapters.forEach(({ chapter, weights }) => {
                const score = student.grades[chapter]?.[component] || 0
                const weight = weights[component] || 0
                compScore += (score * weight) / 100
            })

            const totalChapterWeight = Object.values(chapters.map(ch => ch.weights[component] || 0)).reduce((a, b) => a + b, 0)
            const normalizedCompScore = totalChapterWeight > 0 ? (compScore / totalChapterWeight) : 0;

            total += normalizedCompScore * (percentage / 100) * 100
        })

        return Math.round(total)
    }

    const handleChange = (studentIndex: number, chapter: string, component: string, value: number) => {
        const updated = [...students]
        updated[studentIndex].grades[chapter][component] = value
        setStudents(updated)
    }

    return (
        <TableContainer
            component={Paper}
            className="mt-4 overflow-x-auto shadow-md"
        >
            <Typography
                variant="h6"
                className="p-4 font-semibold text-primary"
            >
                Input Nilai Mahasiswa
            </Typography>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Nama</TableCell>

                        {mockGradeConfig.chapters.map((ch) => (
                            <TableCell
                                key={ch.chapter}
                                colSpan={Object.keys(ch.weights).length}
                            >   
                                {ch.chapter}
                            </TableCell>
                        ))}

                        <TableCell>Final Grade</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell></TableCell>

                        {mockGradeConfig.chapters.map((ch) => 
                            Object.keys(ch.weights).map((comp) => (
                                <TableCell
                                    key={`${ch.chapter}-${comp}`}
                                >
                                    {comp}
                                </TableCell>
                            ))
                        )}
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {students.map((student, idx) => {
                        const finalGrade = calculateFinalGrade(student);

                        return (
                            <TableRow key={student.id}>
                                <TableCell className="font-medium">{student.name}</TableCell>

                                {mockGradeConfig.chapters.map((ch) => 
                                    Object.keys(ch.weights).map((comp) => (
                                        <TableCell 
                                            key={`${student.id}-${ch.chapter}-${comp}`}
                                        >
                                            <TextField 
                                                size="small"
                                                type="number"
                                                value={student.grades[ch.chapter]?.[comp] || 0}
                                                onChange={(e) => 
                                                    handleChange(idx, ch.chapter, comp, parseInt(e.target.value) || 0)
                                                }
                                                inputProps={{ min: 0, max: 100 }}
                                                sx={{ width: 60 }}
                                            />
                                        </TableCell>
                                    ))
                                )}

                                <TableCell>
                                    <span
                                        className={clsx(
                                            "font-bold",
                                            finalGrade >= 80
                                            ? "text-green-600"
                                            : finalGrade >= 60
                                            ? "text-yellow-500"
                                            : "text-red-600"
                                        )}
                                    >
                                        {finalGrade}
                                    </span>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}