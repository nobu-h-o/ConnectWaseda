export interface Event {
  id: number;
  organizer: number | null;
  title: string;
  description: string;
  club_rep: boolean;
  category: string;
  language: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  host_notes: string;
  on_campus: boolean;
  capacity: number | null;
  booked: number;
  created_at: string;
} 