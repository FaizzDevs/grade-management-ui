"use client"

import { GradeComponentConfig } from "@/types/gradeConfig"
import { Alert, Button, TextField} from "@mui/material"
import { useState } from "react"

interface Props {
    initialData: GradeComponentConfig[]
}

export const GradeConfigForm = ({ initialData }: Props) => {
    const [data, setData] = useState(initialData)

    const total = data.reduce((acc, curr) => acc + curr.percentage, 0)
    const isValid = total === 100

    const handleChange = (index: number, value: number) => {
        const updated = [...data]
        updated[index].percentage = value
        setData(updated)
    }

    return (
        <form className="space-y-6 max-w-xl mx-auto">
            <h2 className="text-xl font-semibold text-primary">
                Konfigurasi Komponen Nilai
            </h2>

            <div className="grid gap-4">
                {data.map((item, index) => (
                    <div 
                        key={item.component}
                        className="flex justify-between items-center"
                    >
                        <label className="w-1/2">{item.component}</label>

                        <TextField 
                            type="number"
                            size="small"
                            value={item.percentage}
                            onChange={(e) => handleChange(index, parseInt(e.target.value || "0"))}
                            inputProps={{ min: 0, max: 100 }}
                            className="w-24"
                        />

                        <span className="ml-2">%</span>
                    </div>
                ))}
            </div>

            {!isValid && (
                <Alert
                    severity="error"
                    className="text-sm"
                >
                    Total Harus 100% (saat ini: {total}%)
                </Alert>
            )}

            <div className="pt-4">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                >
                    Simpan Konfigurasi
                </Button>
            </div>
        </form>
    )
}