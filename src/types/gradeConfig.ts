export type GradeComponentKey = "Tugas" | "UTS" | "UAS" | "Proyek" | "Kuis"

export interface GradeComponentConfig {
    component: GradeComponentKey
    percentage: number
}