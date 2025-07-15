export type GradeComponentKey = "Tugas" | "UTS" | "UAS" | "Proyek" | "Kuis"

export interface GradeComponentConfig {
    component: GradeComponentKey
    percentage: number
}

export interface ChaptersWeight {
    chapter: string
    weights: Record<GradeComponentKey, number>
}

export interface GradeConfig {
    components: GradeComponentConfig[]
    chapters: ChaptersWeight[]
}