"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAudiology } from "@/contextes/audiology-context"

export function SpeechAudiometryTable() {
  const { data } = useAudiology()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ear</TableHead>
          <TableHead>SRT</TableHead>
          <TableHead>Intensity (dB HL)</TableHead>
          <TableHead>Discrimination Score (%)</TableHead>
          <TableHead>D.S.</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.speechAudiometry.map((result, index) => (
          <TableRow key={index}>
            <TableCell className={result.ear === "Right" ? "text-blue-600 font-medium" : "text-red-600 font-medium"}>
              {result.ear}
            </TableCell>
            <TableCell>{result.srt}</TableCell>
            <TableCell>{result.intensityDB}</TableCell>
            <TableCell>{result.discriminationScore}%</TableCell>
            <TableCell>{result.ds}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

