import { GradeConfig } from "@/types/gradeConfig"
import { StudentGrade } from "@/types/students"

export const calculateFinalGrade = (
  student: StudentGrade,
  config: GradeConfig
): number => {
  const { components, chapters } = config

  let total = 0

  components.forEach(({ component, percentage }) => {
    let compScore = 0

    // Hitung skor komponen dari setiap chapter
    chapters.forEach(({ chapter, weights }) => {
      const score = student.grades[chapter]?.[component] || 0
      const weight = weights[component] || 0
      compScore += (score * weight) / 100
    })

    // Jumlah total bobot komponen tsb di semua chapter (untuk normalisasi)
    const totalChapterWeight = chapters
      .map(ch => ch.weights[component] || 0)
      .reduce((a, b) => a + b, 0)

    // Normalisasi skor komponen
    const normalizedCompScore =
      totalChapterWeight > 0 ? compScore / totalChapterWeight : 0

    // Kalikan dengan persen kontribusi komponen tsb terhadap nilai akhir
    total += normalizedCompScore * (percentage / 100) * 100
  })

  return Math.round(total)
}
