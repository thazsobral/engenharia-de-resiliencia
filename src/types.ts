export type BoatType = 'rigid' | 'joao_bobo';

export interface BoatSimulationState {
  boatType: BoatType;
  isWaveActive: boolean;
  waveForce: number; // 1 to 5
  boatAngle: number; // degrees
  boatY: number; // Y position offset
  waterLevel: number; // 0 (empty) to 100 (sunk)
  status: 'idle' | 'hit_by_wave' | 'capsizing' | 'sinking' | 'righting' | 'recovered';
  capsizeCount: number;
  recoveryCount: number;
}

export type ArchitectureMode = 'fragile' | 'resilient';

export interface ServerNode {
  id: number;
  name: string;
  role: string;
  status: 'healthy' | 'failing' | 'dead' | 'rebooting' | 'standby';
  load: number; // 0-100%
  latency: number; // ms
  requestsHandled: number;
  isBackup?: boolean;
}

export interface ChaosEvent {
  id: string;
  timestamp: string;
  type: 'attack' | 'detection' | 'failover' | 'recovered' | 'outage';
  message: string;
  affectedServerId?: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  concept: string;
}

export interface ComparisonCard {
  title: string;
  fragileAspect: {
    label: string;
    description: string;
    iconName: string;
  };
  resilientAspect: {
    label: string;
    description: string;
    iconName: string;
  };
  realWorldExample: string;
}
