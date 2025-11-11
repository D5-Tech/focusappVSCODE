
export interface UserSettings {
  block_youtube_shorts: boolean;
  block_instagram_reels: boolean;
}

export interface BlockEvent {
  event_id: number;
  app_name: 'YouTube' | 'Instagram';
  content_type: 'Shorts' | 'Reels';
  timestamp: number;
}

export interface AppStats {
  total_blocks: number;
  time_saved_minutes: number;
  daily_summary: { [key: string]: number };
}

export enum View {
  Home = 'Home',
  Stats = 'Stats',
  Simulation = 'Simulation',
  AI = 'AI',
}
