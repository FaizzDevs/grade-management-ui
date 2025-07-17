import { mockGradeConfig } from "@/lib/mock/gradeConfig";
import { StudentGrade } from "@/types/students";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { calculateFinalGrade } from "./calculate-grade";

export const exportPDF = (students: StudentGrade[], fileName: string) => {
    const doc = new jsPDF();

    doc.text("Grade Report", 14, 10)

    const headers = ["Name", "NIM", ...mockGradeConfig.chapters.flatMap(ch =>
        Object.keys(ch.weights).map(comp => `${ch.chapter}-${comp}`)
    ), "Final Grade"];

    const data = students.map(student => {
        const row: (string | number)[] = [student.name, student.nim];
        mockGradeConfig.chapters.forEach(ch => {
        Object.keys(ch.weights).forEach(comp => {
            row.push(student.grades[ch.chapter]?.[comp] || "");
        });
        });
        row.push(calculateFinalGrade(student, mockGradeConfig));
        return row;
    });

    autoTable(doc, {
        head: [headers],
        body: data,
        startY: 20,
        styles: { fontSize: 8 },
    });

    doc.save(`${fileName}.pdf`);
}