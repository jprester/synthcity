/**
 * Environment configurations
 * Defines the visual settings for different time-of-day environments
 */

import { COLORS } from "../constants/colors";

export type EnvironmentConfig = {
  name: string;
  sky: string;
  environmentMap: string;
  cityLights: boolean;
  windowLights: boolean;
  spotLights: boolean;
  streetLights: boolean;
  fog: {
    color: number;
    start: number;
    end: number;
  };
  sun: {
    color: number;
    intensity: number;
    x: number;
    y: number;
    z: number;
  };
  ambient: {
    color: number;
    intensity: number;
  };
};

export const ENVIRONMENT_NIGHT: EnvironmentConfig = {
  name: "night",
  sky: "sky_night",
  environmentMap: "env_night",
  cityLights: true,
  windowLights: true,
  spotLights: true,
  streetLights: true,
  fog: {
    color: COLORS.night.fog,
    start: 0,
    end: 2700,
  },
  sun: {
    color: COLORS.night.sun,
    intensity: 0.1,
    x: 1,
    y: 0.5,
    z: 0.25,
  },
  ambient: {
    color: COLORS.night.ambient,
    intensity: 0.2,
  },
};

export const ENVIRONMENT_DAY: EnvironmentConfig = {
  name: "day",
  sky: "sky_day",
  environmentMap: "env_day",
  cityLights: false,
  windowLights: false,
  spotLights: false,
  streetLights: false,
  fog: {
    color: COLORS.day.fog,
    start: -500,
    end: 2700,
  },
  sun: {
    color: COLORS.day.sun,
    intensity: 2,
    x: 1,
    y: 0.2,
    z: 0.65,
  },
  ambient: {
    color: COLORS.day.ambient,
    intensity: 0.65,
  },
};

export const ENVIRONMENTS: Record<string, EnvironmentConfig> = {
  night: ENVIRONMENT_NIGHT,
  day: ENVIRONMENT_DAY,
};

export type EnvironmentId = keyof typeof ENVIRONMENTS;

/**
 * Get environment config by ID with fallback to night
 */
export function getEnvironment(id: string): EnvironmentConfig {
  return ENVIRONMENTS[id] ?? ENVIRONMENT_NIGHT;
}
