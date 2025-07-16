"use client"

import { useProgressStore } from "@/app/store/progressStore"
import { mockGradeConfig } from "@/lib/mock/gradeConfig"
import { StudentGrade } from "@/types/students"
import { Box, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from "@mui/material"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
    students: StudentGrade[]
    setStudents: React.Dispatch<React.SetStateAction<StudentGrade[]>>
}

export const StudentGradeTable = ({ students, setStudents }: Props) => {
    const [isSaving, setIsSaving] = useState(false)
    const [localProgress, setLocalProgress] = useState(0)
    const { components, chapters } = mockGradeConfig
    const params = useParams()
    const classId = params?.id as string
    const { setProgress } = useProgressStore()

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

  // ⏳ Auto-saving indicator
    useEffect(() => {
        setIsSaving(true)
        const timer = setTimeout(() => setIsSaving(false), 1500)
        return () => clearTimeout(timer)
    }, [students])

    const handleChange = (
        studentIndex: number,
        chapter: string,
        component: string,
        value: number
      ) => {
        const updated = [...students]
        updated[studentIndex].grades[chapter][component] = value
        setStudents(updated)
    }

  return (
      <Paper className="shadow-md rounded-xl p-4 space-y-4">
        {/* toolbar */}
          <Toolbar className="flex justify-between items-center">
              <Typography variant="h6" className="font-semibold text-primary">
                  Input Nilai Mahasiswa
              </Typography>
              <Box className="flex items-center gap-3">
                  <Typography 
                      variant="body2"
                      color="textSecondary"
                  >
                      {isSaving ? "💾 Menyimpan..." : "✅ Tersimpan"}
                  </Typography>
              </Box>
          </Toolbar>

          {/* progress */}
          <Box>
              <LinearProgress variant="determinate" value={localProgress} className="h-2 rounded" />
              <Typography variant="caption" className="block text-right mt-1">
                  {localProgress}% Selesai
              </Typography>
          </Box>

          {/* table */}
          <TableContainer sx={{ maxHeight: 500, overflowX: "auto" }}>
              <Table
                  stickyHeader
                  size="small"
              >
                  <TableHead>
                      <TableRow>
                          <TableCell className="font-bold">Nama</TableCell>
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
                              <TableCell className="font-medium">{student.name}</TableCell>
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
                                                width: 60,
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
      </Paper>
  )
}
