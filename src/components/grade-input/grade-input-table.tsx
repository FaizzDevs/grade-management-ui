"use client"

import { mockGradeConfig } from "@/lib/mock/gradeConfig"
import { mockStudents } from "@/lib/mock/students"
import { StudentGrade } from "@/types/students"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useState } from "react"

export const GradeInputTable = () => {
    const [students, setStudents] = useState<StudentGrade[]>(mockStudents)

    const chapters = mockGradeConfig.chapters.map(ch => ch.chapter)
    const components = mockGradeConfig.components.map(c => c.component)

    const handleGradeChange = (
        studentIndex: number,
        chapter: string,
        component: string,
        value: number
    ) => {
        const updated = [...students];
        updated[studentIndex].grades[chapter][component] = value
        setStudents(updated)
    }

    return (
        <TableContainer
            component={Paper}
            className="shadow-md"
        >
            <Typography
                variant="h6"
                className="p-4 font-semibold text-primary"
            >
                Input nilai mahasiswa
            </Typography>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nama
                        </TableCell>
                        <TableCell>
                            NIM
                        </TableCell>

                        {chapters.map((chapter) => (
                            <TableCell
                                key={chapter}
                                className="font-bold"
                            >
                                {chapter}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {students.map((student, sIndex) => (
                        <TableRow
                            key={student.id}
                        >
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.nim}</TableCell>

                            {chapters.map((chapter) => (
                                <TableCell key={chapter}>
                                    <div className="flex flex-col gap-2">
                                        {components.map((component) => (
                                            <TextField 
                                                key={component}
                                                type="number"
                                                size="small"
                                                value={student.grades[chapter][component] || 0}
                                                onChange={(e) => 
                                                    handleGradeChange(
                                                        sIndex,
                                                        chapter,
                                                        component,
                                                        parseInt(e.target.value || "0")
                                                    )
                                                }
                                                label={component}
                                            />
                                        ))}
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

    return (
        <div>
            Halo
        </div>
    )
}