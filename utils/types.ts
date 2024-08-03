export type logsType = {
  id: string;
  user_id: string;
  time_day?: string;
  summary?: string;
  metric?: metricType;
  journey_id: string;
  emoji?: string;
  created_at: string;
};
export type metricType = {
  [key: string]: number;
};
