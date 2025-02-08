"use client";

import { useState } from "react";
import { useAudiology } from "@/contextes/audiology-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  PTATestType,
  AudiogramPoint,
  AudiogramFormData,
} from "@/types/audiology";

export function AudiogramForm() {
  const {
    data,
    addAudiogramPoint,
    updateAudiogramPoint,
    removeAudiogramPoint,
  } = useAudiology();
  const [formData, setFormData] = useState<AudiogramFormData>({
    id: "",
    frequency: "",
    threshold: "",
    ear: "right",
    testType: "AC",
  });

  const frequencies = [
    125, 250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000,
  ];
  const testTypes: PTATestType[] = ["AC", "BC", "SF", "SAL", "UCL"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const frequency = Number.parseInt(formData.frequency);
    const threshold = Number.parseInt(formData.threshold);

    if (!isNaN(frequency) && !isNaN(threshold)) {
      if (formData.id) {
        updateAudiogramPoint(formData.ear, {
          id: formData.id,
          frequency,
          threshold,
          testType: formData.testType,
        });
      } else {
        addAudiogramPoint(formData.ear, {
          frequency,
          threshold,
          testType: formData.testType,
        });
      }
      setFormData((prev) => ({ ...prev, id: "", threshold: "" }));
    }
  };

  const handleRemove = () => {
    if (formData.id) {
      removeAudiogramPoint(formData.ear, formData.id);
      setFormData((prev) => ({ ...prev, id: "", threshold: "" }));
    }
  };

  const handlePointSelect = (ear: "right" | "left", point: AudiogramPoint) => {
    setFormData({
      id: point.id,
      frequency: point.frequency.toString(),
      threshold: point.threshold.toString(),
      ear,
      testType: point.testType,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Audiogram Data</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ear">Ear</Label>
              <Select
                value={formData.ear}
                onValueChange={(value: "right" | "left") =>
                  setFormData((prev) => ({ ...prev, ear: value, id: "" }))
                }
              >
                <SelectTrigger id="ear">
                  <SelectValue placeholder="Select ear" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="left">Left</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency (Hz)</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, frequency: value, id: "" }))
                }
              >
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq} value={freq.toString()}>
                      {freq}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="threshold">Threshold (dB)</Label>
              <Input
                id="threshold"
                type="number"
                min="-10"
                max="120"
                value={formData.threshold}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    threshold: e.target.value,
                  }))
                }
                placeholder="Enter threshold value"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="testType">Test Type</Label>
              <Select
                value={formData.testType}
                onValueChange={(value: PTATestType) =>
                  setFormData((prev) => ({ ...prev, testType: value }))
                }
              >
                <SelectTrigger id="testType">
                  <SelectValue placeholder="Select test type" />
                </SelectTrigger>
                <SelectContent>
                  {testTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button type="submit">
              {formData.id ? "Update" : "Add"} Point
            </Button>
            {formData.id && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleRemove}
              >
                Remove Point
              </Button>
            )}
          </div>
        </form>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Existing Points</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1">Right Ear</h4>
              {data.rightEar.map((point) => (
                <button
                  key={point.id}
                  className="block text-sm mb-1 text-blue-600 hover:underline"
                  onClick={() => handlePointSelect("right", point)}
                >
                  {point.frequency} Hz - {point.threshold} dB ({point.testType})
                </button>
              ))}
            </div>
            <div>
              <h4 className="font-medium mb-1">Left Ear</h4>
              {data.leftEar.map((point) => (
                <button
                  key={point.id}
                  className="block text-sm mb-1 text-blue-600 hover:underline"
                  onClick={() => handlePointSelect("left", point)}
                >
                  {point.frequency} Hz - {point.threshold} dB ({point.testType})
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
