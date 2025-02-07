"use client"

import { createContext, useContext, useState } from "react"
import type { AudiogramData, AudiogramPoint, SpeechAudiometryResult } from "@/types/audiology"

interface AudiologyContextType {
  data: AudiogramData
  addAudiogramPoint: (ear: "right" | "left", point: Omit<AudiogramPoint, "id">) => void
  updateAudiogramPoint: (ear: "right" | "left", point: AudiogramPoint) => void
  removeAudiogramPoint: (ear: "right" | "left", id: string) => void
  updateSpeechAudiometry: (result: SpeechAudiometryResult) => void
}

const AudiologyContext = createContext<AudiologyContextType | undefined>(undefined)

const initialData: AudiogramData = {
  rightEar: [
    { id: "r1", frequency: 250, threshold: 20, testType: "AC" },
    { id: "r2", frequency: 500, threshold: 30, testType: "AC" },
    { id: "r3", frequency: 1000, threshold: 40, testType: "AC" },
    { id: "r4", frequency: 2000, threshold: 50, testType: "AC" },
    { id: "r5", frequency: 4000, threshold: 60, testType: "AC" },
    { id: "r6", frequency: 8000, threshold: 70, testType: "AC" },
    { id: "r7", frequency: 500, threshold: 35, testType: "BC" },
    { id: "r8", frequency: 1000, threshold: 45, testType: "BC" },
    { id: "r9", frequency: 2000, threshold: 55, testType: "BC" },
    { id: "r10", frequency: 4000, threshold: 65, testType: "BC" },
  ],
  leftEar: [
    { id: "l1", frequency: 250, threshold: 15, testType: "AC" },
    { id: "l2", frequency: 500, threshold: 25, testType: "AC" },
    { id: "l3", frequency: 1000, threshold: 35, testType: "AC" },
    { id: "l4", frequency: 2000, threshold: 45, testType: "AC" },
    { id: "l5", frequency: 4000, threshold: 55, testType: "AC" },
    { id: "l6", frequency: 8000, threshold: 65, testType: "AC" },
    { id: "l7", frequency: 500, threshold: 30, testType: "BC" },
    { id: "l8", frequency: 1000, threshold: 40, testType: "BC" },
    { id: "l9", frequency: 2000, threshold: 50, testType: "BC" },
    { id: "l10", frequency: 4000, threshold: 60, testType: "BC" },
  ],
  speechAudiometry: [
    {
      ear: "Right",
      srt: 35,
      intensityDB: 65,
      discriminationScore: 92,
      ds: 50,
    },
    {
      ear: "Left",
      srt: 30,
      intensityDB: 60,
      discriminationScore: 96,
      ds: 45,
    },
  ],
}

export function AudiologyProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AudiogramData>(initialData)

  const addAudiogramPoint = (ear: "right" | "left", newPoint: Omit<AudiogramPoint, "id">) => {
    setData((prev) => {
      const earKey = ear === "right" ? "rightEar" : "leftEar"
      const newId = `${ear[0]}${Date.now()}`
      const updatedPoint = { ...newPoint, id: newId }
      return {
        ...prev,
        [earKey]: [...prev[earKey], updatedPoint].sort((a, b) => a.frequency - b.frequency),
      }
    })
  }

  const updateAudiogramPoint = (ear: "right" | "left", updatedPoint: AudiogramPoint) => {
    setData((prev) => {
      const earKey = ear === "right" ? "rightEar" : "leftEar"
      return {
        ...prev,
        [earKey]: prev[earKey]
          .map((point) => (point.id === updatedPoint.id ? updatedPoint : point))
          .sort((a, b) => a.frequency - b.frequency),
      }
    })
  }

  const removeAudiogramPoint = (ear: "right" | "left", id: string) => {
    setData((prev) => {
      const earKey = ear === "right" ? "rightEar" : "leftEar"
      return {
        ...prev,
        [earKey]: prev[earKey].filter((point) => point.id !== id),
      }
    })
  }

  const updateSpeechAudiometry = (result: SpeechAudiometryResult) => {
    setData((prev) => ({
      ...prev,
      speechAudiometry: prev.speechAudiometry.map((item) => (item.ear === result.ear ? result : item)),
    }))
  }

  return (
    <AudiologyContext.Provider
      value={{
        data,
        addAudiogramPoint,
        updateAudiogramPoint,
        removeAudiogramPoint,
        updateSpeechAudiometry,
      }}
    >
      {children}
    </AudiologyContext.Provider>
  )
}

export const useAudiology = () => {
  const context = useContext(AudiologyContext)
  if (!context) throw new Error("useAudiology must be used within AudiologyProvider")
  return context
}

