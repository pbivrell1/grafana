import { TimeZone, WeekStart } from '@grafana/data';

export interface UserPreferencesDTO {
  timezone: TimeZone;
  weekStart: WeekStart;
  homeDashboardId: number;
  theme: string;
}
