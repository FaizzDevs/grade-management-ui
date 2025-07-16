import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { calculateFinalGrade } from "./calculate-grade";
import { mockGradeConfig } from "@/lib/mock/gradeConfig";
import { StudentGrade } from "@/types/students";

export const exportExcel = (students: StudentGrade[], fileName: string) => {
  const rows = students.map((student) => {
    const row: Record<string, string | number> = {
      Name: student.name,
      NIM: student.nim,
    };

    Object.entries(student.grades).forEach(([chapter, comps]) => {
      Object.entries(comps).forEach(([comp, score]) => {
        row[`${chapter} - ${comp}`] = score;
      });
    });

    row["Final Grade"] = calculateFinalGrade(student, mockGradeConfig);

    return row;
  });

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Grades");

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${fileName}.xlsx`);
};
