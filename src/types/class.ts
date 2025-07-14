export type GradeComponentType = "Tugas" | "UTS" | "UAS" | "Proyek" | "Kuis"

export interface ClassInfo {
    id: string;
    name: string;
    semester: string;
    studentCount: number;
    isConfigured: boolean;
}