"use client"

import { StudentGradeTable } from "@/components/grade-preview/student-grade-table";
import { GradePreview } from "@/components/grade-preview/grade-preview";
import { mockStudents } from "@/lib/mock/students";
import { StudentGrade } from "@/types/students";
import { useState } from "react";
import { Typography } from "@mui/material";


export default function GradePage() {
    const [students, setStudents] = useState<StudentGrade[]>(mockStudents)

    return (
        <main className="p-6 space-y-6">
            <Typography
                variant="h5"
                className="font-bold text-primary"
            >
                Manajemen Nilai Mahasiswa
            </Typography>
            
            <StudentGradeTable students={students} setStudents={setStudents} />
            <GradePreview students={mockStudents} />

            
        </main>
    )
}