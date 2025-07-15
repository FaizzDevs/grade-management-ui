import { GradeConfig } from "@/types/gradeConfig";

export const mockGradeConfig: GradeConfig = {
    components: [
        {
            component: "Tugas",
            percentage: 20,
        },
        {
            component: "UTS",
            percentage: 25,
        },
        {
            component: "UAS",
            percentage: 30,
        },
        {
            component: "Proyek",
            percentage: 15,
        },
        {
            component: "Kuis",
            percentage: 10,
        }
    ],

    chapters: [
        {
            chapter: "Bab 1",
            weights: {
                Tugas: 50,
                UTS: 20,
                UAS: 10,
                Proyek: 10,
                Kuis: 10
            },
        },
        {
            chapter: "Bab 2",
            weights: {
                Tugas: 30,
                UTS: 30,
                UAS: 20,
                Proyek: 10,
                Kuis: 10
            },
        },
    ]
}
