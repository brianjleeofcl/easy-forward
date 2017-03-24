export class Project {
  id: number;
  user_id?: number;
  duration: number;
  interval: number;
  hash_id?: string;
  last_frame_index?: number;
  recording_completed_at?: null | string;
  published_url?: string; 
}
