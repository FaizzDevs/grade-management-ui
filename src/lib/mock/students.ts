import { StudentGrade } from "@/types/students";

export const mockStudents: StudentGrade[] = [
    {
        id: "1",
        name: "Muhammad Faizz",
        nim: "000001",
        grades: {
            "Bab 1": {
                Tugas: 0,
                UTS: 90,
                UAS: 85,
                Proyek: 75,
                Kuis: 0
            },

            "Bab 2": {
                Tugas: 70,
                UTS: 80,
                UAS: 5,
                Proyek: 90,
                Kuis: 5
            }
        },
    },
    {
        id: "2",
        name: "Philip Lahm",
        nim: "000002",
        grades: {
            "Bab 1": {
                Tugas: 80,
                UTS: 90,
                UAS: 85,
                Proyek: 100,
                Kuis: 80
            },

            "Bab 2": {
                Tugas: 70,
                UTS: 90,
                UAS: 85,
                Proyek: 90,
                Kuis: 100
            }
        },
    },
]