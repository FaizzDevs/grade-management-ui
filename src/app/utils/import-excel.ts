import { mockGradeConfig } from "@/lib/mock/gradeConfig";
import { StudentGrade } from "@/types/students";
import * as XLSX from "xlsx";

interface ImportRow {
    Name: string;
    NIM: string;
    [key: string]: string | number | undefined;
}


export const importExcel = async (file: File): Promise<StudentGrade[]> => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<ImportRow>(sheet);

    const students: StudentGrade[] = rows.map((row, index) => {
        if (!row.Name || !row.NIM) {
            throw new Error(`Row ${index + 2}: Name or NIM missing`);
        }

        const grades: Record<string, Record<string, number>> = {};
        mockGradeConfig.chapters.forEach(ch => {
        grades[ch.chapter] = {};
            Object.keys(ch.weights).forEach(comp => {
                const key = `${ch.chapter} - ${comp}`;
                let val = parseFloat(String(row[key] ?? "0"));
                if (isNaN(val) || val < 0 || val > 100) val = 0;
                grades[ch.chapter][comp] = val;
            });
        });

        return { id: row.NIM, nim: row.NIM, name: row.Name, grades };
    });

    return students;
}