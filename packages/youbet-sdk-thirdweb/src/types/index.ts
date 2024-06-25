export interface GoalInfo {
  id: number;
  name: string;
  description: string;
  requiredStake: number;
  creator: string;
  completed: boolean;
  participants: string[];
  goalType: number;
}