"use client"

import { useState } from "react"
import { useAudiology } from "@/contextes/audiology-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SpeechAudiometryFormData } from "@/types/audiology"

export function SpeechAudiometryForm() {
  const { updateSpeechAudiometry } = useAudiology()
  const [formData, setFormData] = useState<SpeechAudiometryFormData>({
    id: "",
    ear: "Right",
    srt: "",
    intensityDB: "",
    discriminationScore: "",
    ds: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = {
      ear: formData.ear,
      srt: Number.parseInt(formData.srt),
      intensityDB: Number.parseInt(formData.intensityDB),
      discriminationScore: Number.parseInt(formData.discriminationScore),
      ds: Number.parseInt(formData.ds),
    }

    if (!Object.values(result).filter(value => typeof value === 'number').some(isNaN)) {
      updateSpeechAudiometry(result)
      setFormData((prev) => ({ ...prev, srt: "", intensityDB: "", discriminationScore: "", ds: "" }))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Speech Audiometry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ear">Ear</Label>
            <Select
              value={formData.ear}
              onValueChange={(value: "Right" | "Left") => setFormData((prev) => ({ ...prev, ear: value }))}
            >
              <SelectTrigger id="ear">
                <SelectValue placeholder="Select ear" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Right">Right</SelectItem>
                <SelectItem value="Left">Left</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="srt">SRT</Label>
              <Input
                id="srt"
                type="number"
                value={formData.srt}
                onChange={(e) => setFormData((prev) => ({ ...prev, srt: e.target.value }))}
                placeholder="Enter SRT"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="intensityDB">Intensity (dB)</Label>
              <Input
                id="intensityDB"
                type="number"
                value={formData.intensityDB}
                onChange={(e) => setFormData((prev) => ({ ...prev, intensityDB: e.target.value }))}
                placeholder="Enter intensity"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discriminationScore">Discrimination Score (%)</Label>
              <Input
                id="discriminationScore"
                type="number"
                min="0"
                max="100"
                value={formData.discriminationScore}
                onChange={(e) => setFormData((prev) => ({ ...prev, discriminationScore: e.target.value }))}
                placeholder="Enter score"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ds">D.S.</Label>
              <Input
                id="ds"
                type="number"
                value={formData.ds}
                onChange={(e) => setFormData((prev) => ({ ...prev, ds: e.target.value }))}
                placeholder="Enter D.S."
              />
            </div>
          </div>

          <Button type="submit">Update Speech Audiometry</Button>
        </form>
      </CardContent>
    </Card>
  )
}

