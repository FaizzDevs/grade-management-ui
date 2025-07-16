"use client"

import { calculateFinalGrade } from "@/app/utils/calculate-grade"
import { exportExcel } from "@/app/utils/export-excel"
import { mockGradeConfig } from "@/lib/mock/gradeConfig"
import { StudentGrade } from "@/types/students"
import { Button, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, Paper, Typography } from "@mui/material"
import clsx from "clsx"
import { useState } from "react"

interface Props {
    students: StudentGrade[]
}

export const GradePreview = ({ students }:Props ) => {
    const [open, setOpen] = useState(false)
    const [selectedStudents, setSelectedStudents] = useState<StudentGrade | null>(null)

    const handleOpen = (student: StudentGrade) => {
        setSelectedStudents(student)
        setOpen(true)
    }

    return (
        <Paper className="mt-6 p-4 shadow-md">
            <Typography
                variant="h6"
                className="font-semibold mb-4 text-primary"
            >
                Preview Nilai Akhir
            </Typography>

            <List>
                {students.map((student) => {
                    const finalGrade = calculateFinalGrade(student, mockGradeConfig)

                    return (
                        <ListItem
                            key={student.id}
                            className="flex justify-between border-b"
                        >
                            <ListItemText primary={student.name} />
                            <span
                                className={clsx(
                                    "font-bold",
                                    finalGrade >= 80 ? "text-green-600" :
                                    finalGrade >= 60 ? "text-yellow-500" : "text-red-600"
                                )}
                            >
                                {finalGrade}
                            </span>

                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => handleOpen(student)}
                            >
                                Detail
                            </Button>
                        </ListItem>
                    )
                })}
            </List>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
            >
                <DialogTitle>Detail Nilai</DialogTitle>
                <DialogContent>
                    {selectedStudents && (
                        <div className="space-y-2">
                            <Typography variant="body1">
                                Nama: {selectedStudents.name}
                            </Typography>
                            <Typography variant="body2">
                                Breakdown per Bab:
                            </Typography>

                            <ul className="list-disc pl-4">
                                {Object.entries(selectedStudents.grades).map(([chapter, comps]) => (
                                    <li key={chapter}>
                                        <strong>{chapter}</strong>: {" "}
                                        {Object.entries(comps).map(([comp, score]) => (
                                            <span key={comp}>
                                                {comp}: {score},
                                            </span>
                                        ))}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Button
                variant="contained"
                color="success"
                onClick={() => exportExcel(students, "Grade-Report")}
            >
                Export Excel
            </Button>
        </Paper>
    )
}