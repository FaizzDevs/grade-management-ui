"use client"

import { useProgressStore } from "@/app/store/progressStore"
import { calculateFinalGrade } from "@/app/utils/calculate-grade"
import { mockGradeConfig } from "@/lib/mock/gradeConfig"
import { StudentGrade } from "@/types/students"
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material"
import clsx from "clsx"
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

  // ✅ Hitung progress input
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
    <TableContainer component={Paper} className="space-y-4" sx={{ mt: 4, p: 2 }}>
      <div className="flex justify-between items-center mb-2">
        <Typography variant="h6" className="p-4 font-semibold text-primary">
          Input Nilai Mahasiswa
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {isSaving ? "Saving..." : "Saved"}
        </Typography>
      </div>

      <LinearProgress variant="determinate" value={localProgress} className="h-2 rounded" />
      <Typography variant="caption">{localProgress}% Completed</Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nama</TableCell>
            {chapters.map((ch) => (
              <TableCell key={ch.chapter} colSpan={Object.keys(ch.weights).length}>
                {ch.chapter}
              </TableCell>
            ))}
            <TableCell>Final Grade</TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            {chapters.map((ch) =>
              Object.keys(ch.weights).map((comp) => (
                <TableCell key={`${ch.chapter}-${comp}`}>{comp}</TableCell>
              ))
            )}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {students.map((student, idx) => {
            const finalGrade = calculateFinalGrade(student, mockGradeConfig)

            return (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                {chapters.map((ch) =>
                  Object.keys(ch.weights).map((comp) => (
                    <TableCell key={`${student.id}-${ch.chapter}-${comp}`}>
                      <TextField
                        size="small"
                        type="number"
                        value={student.grades[ch.chapter]?.[comp] || ""}
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
