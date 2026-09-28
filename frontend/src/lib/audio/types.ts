import type { LoopSettings, MeterSequenceItem } from "@/types/music";

export type TransportState = "stopped" | "playing" | "paused";

export type PlaybackCursor = {
  sequenceIndex: number;
  repetitionIndex: number;
  beatIndex: number;
  cycleIndex: number;
};

export type AudioEngineConfig = {
  sequence: MeterSequenceItem[];
  bpm: number;
  loopSettings: LoopSettings;
};

export type ScheduledClickHandle = {
  cancel: (when?: number) => void;
};

export type ScheduledBeat = {
  id: number;
  time: number;
  cursor: PlaybackCursor;
  isBarAccent: boolean;
  handle: ScheduledClickHandle;
};

export type AudioEngineCallbacks = {
  onStateChange?: (state: TransportState) => void;
  onError?: (error: Error) => void;
};
