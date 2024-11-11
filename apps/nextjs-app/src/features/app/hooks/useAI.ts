import { useEnv } from './useEnv';

export function useAI() {
  const env = useEnv();
  return {
    enable: env.globalSettings?.aiConfig?.enable,
  };
}
