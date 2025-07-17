import { mockGradeConfig } from "@/lib/mock/gradeConfig";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export const downloadTemplate = (fileName: string = "Grade") => {
    const headers = ["Name", "NIM", ...mockGradeConfig.chapters.flatMap(ch =>
        Object.keys(ch.weights).map(comp => `${ch.chapter} - ${comp}`)
    )];

    const ws = XLSX.utils.aoa_to_sheet([headers]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}-template.xlsx`);
}