export interface AudiogramPoint {
  id: string;
  frequency: number;
  threshold: number;
  masked?: boolean;
  testType: PTATestType;
}

export type PTATestType = "AC" | "BC" | "SF" | "SAL" | "UCL";

export interface SpeechAudiometryResult {
  ear: "Right" | "Left";
  srt: number;
  intensityDB: number;
  discriminationScore: number;
  masking?: number;
  ds?: number;
}

export interface AudiogramData {
  rightEar: AudiogramPoint[];
  leftEar: AudiogramPoint[];
  speechAudiometry: SpeechAudiometryResult[];
}

export interface AudiogramFormData {
  id: string;
  frequency: string;
  threshold: string;
  ear: "right" | "left";
  testType: PTATestType;
}

export interface SpeechAudiometryFormData {
  id: string;
  ear: "Right" | "Left";
  srt: string;
  intensityDB: string;
  discriminationScore: string;
  ds: string;
}
