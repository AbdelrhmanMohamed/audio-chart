import { AudiogramChart } from "@/components/audiogram-chart"
import { AudiogramForm } from "@/components/audiogram-form"
import { SpeechAudiometryTable } from "@/components/speech-audiometry-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AudiologyProvider } from "@/contextes/audiology-context"

export default function AudiologyPage() {
  return (
    <AudiologyProvider>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Audiology Results</h1>
        <div className="grid lg:grid-cols-2 gap-16">
        <AudiogramChart ear="right" />
        <AudiogramChart ear="left" />
        </div>
        <div>
            <AudiogramForm />
          </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Speech Audiometry</CardTitle>
          </CardHeader>
          <CardContent>
            <SpeechAudiometryTable />
          </CardContent>
        </Card>
      </div>
    </AudiologyProvider>
  )
}

