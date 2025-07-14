import { GradeConfigForm } from "@/components/grade-config-form";
import { mockGradeConfig } from "@/lib/mock/gradeConfig";

export default function ConfigureConfig() {
    return (
        <main className="p-6">
            <GradeConfigForm initialData={mockGradeConfig} />
        </main>
    )
}