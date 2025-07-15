import { ClassInfo } from "@/types/class";
import { CheckCircle, Settings } from "lucide-react"
import { Button, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
    data: ClassInfo
}

export const ClassCard = ({ data }: Props) => {
    return (
       <Card className="w-full max-w-[360px] rounded-2xl shadow-md p-4 flex flex-col justify-between">
            <CardContent className="p-0">
                <div className="flex justify-between items-center mb-3">
                    <Typography 
                        variant="h6" 
                        className="font-semibold"
                    >
                        {data.name}
                    </Typography>

                    {data.isConfigured ? (
                        <CheckCircle className="text-green-600 w-5 h-5" />
                    ) : (
                        <Settings className="text-gray-500 w-5 h-5 animate-pulse" />
                    )}
                </div>

                <p className="text-sm text-muted-foreground mb-1">
                    {data.semester}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                    Jumlah Mahasiswa: {data.studentCount}
                </p>

                <div className="flex gap-2">
                    <Button
                        component={Link}
                        href={`/class/${data.id}/grades`}
                        variant="contained"
                        color="primary"
                        size="small"
                        fullWidth
                    >
                        Input Nilai
                    </Button>
                    <Button
                        component={Link}
                        href={`/class/${data.id}/configure`}
                        variant="outlined"
                        color="secondary"
                        size="small"
                        fullWidth
                    >
                        Konfigurasi
                    </Button>
                </div>
            </CardContent>
       </Card>
    )
}