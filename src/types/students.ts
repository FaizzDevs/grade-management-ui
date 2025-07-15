export interface StudentGrade {
    id: string;
    name: string;
    nim: string;
    grades: {
        [chapter: string]: {
            [component: string]: number;
        }
    }
}