import { TimeUnit } from './time-unit';

export class CameraInstruction {
  duration: number;
  duration_unit_val: TimeUnit;
  get duration_unit(): string {
    return TimeUnit[this.duration_unit_val]
  }
  set duration_unit(unit: string) {
    this.duration_unit_val = TimeUnit[unit]
  }
  interval: number;
  interval_unit_val: TimeUnit;
  get interval_unit(): string {
    return TimeUnit[this.interval_unit_val]
  }
  set interval_unit(unit: string) {
    this.interval_unit_val = TimeUnit[unit]
  }
}

export class PublishingInstruction {
  url: string;
  delay: number;
  title: string;
  last_frame_index: number;
}