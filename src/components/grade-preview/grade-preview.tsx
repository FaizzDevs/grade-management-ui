"use client"

import { calculateFinalGrade } from "@/app/utils/calculate-grade"
import { exportExcel } from "@/app/utils/export-excel"
import { mockGradeConfig } from "@/lib/mock/gradeConfig"
import { StudentGrade } from "@/types/students"
import { Button, Chip, Dialog, DialogContent, DialogTitle, Box, Divider, Paper, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material"
import { useState } from "react"
import { FileDownload, Visibility } from "@mui/icons-material";

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
        <Paper className="mt-6 p-6 rounded-xl shadow-lg bg-white">

            {/* headers */}
            <div className="flex justify-between items-center mb-4">
                <Typography
                    variant="h6"
                    className="font-semibold text-primary"
                >
                    📊 Preview Nilai Akhir
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<FileDownload />}
                    onClick={() => exportExcel(students, "Grade-Report")}
                >
                    Export Excel
                </Button>
            </div>
            <Divider className="mb-4" />

            {/* Daftar Mahasiswa */}
            <div className="max-h-[400px] overflow-y-auto rounded-lg border border-gray-200">
                <Table size="small">
                    <TableBody>
                        {students.map((student) => {
                            const finalGrade = calculateFinalGrade(student, mockGradeConfig);
                            const gradeColor = finalGrade >= 80 ? "success" : finalGrade >= 60 ? "warning" : "error";

                            return (
                                <TableRow key={student.id} hover>
                                    <TableCell className="font-medium">
                                        {student.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
                                            <Chip
                                                label={finalGrade}
                                                color={gradeColor}
                                                className="font-bold"
                                                size="small"
                                            />
                                            <Button
                                                variant="outlined"
                                                startIcon={<Visibility />}
                                                size="small"
                                                onClick={() => handleOpen(student)}
                                            >
                                                Detail
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>

            {/* detail nilai */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle className="font-bold text-primary">Detail Nilai Mahasiswa</DialogTitle>
                <DialogContent>
                    {selectedStudents && (
                        <div className="space-y-4">
                            <Typography variant="subtitle1" className="font-semibold">
                                {selectedStudents.name}
                            </Typography>
                            <Divider />

                            {/* breakdown */}
                            <Typography
                                variant="body2"
                                className="mb-2"
                            >
                                Breakdown per Bab:
                            </Typography>
                            
                            <Table size="small">
                                <TableBody>
                                    {Object.entries(selectedStudents.grades).map(([chapter, comps]) => (
                                        <TableRow key={chapter}>
                                            <TableCell className="font-bold">
                                                {chapter}
                                            </TableCell>
                                            <TableCell>
                                                {Object.entries(comps).map(([comp, score]) => (
                                                    <Chip 
                                                        key={comp}
                                                        label={`${comp}: ${score}`}
                                                        variant="outlined"
                                                        size="small"
                                                        className="mr-2 mb-1"
                                                    />
                                                ))}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </Paper>
    )
}