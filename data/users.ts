export type User = {
  username: string;
  role: 'standard' | 'locked' | 'problem' | 'performance' | 'error' | 'visual';
};

export const USERS: Record<string, User> = {
  standard: {
    username: 'standard_user',
    role: 'standard',
  },

  lockedOut: {
    username: 'locked_out_user',
    role: 'locked',
  },

  problem: {
    username: 'problem_user',
    role: 'problem',
  },

  performance: {
    username: 'performance_glitch_user',
    role: 'performance',
  },

  error: {
    username: 'error_user',
    role: 'error',
  },

  visual: {
    username: 'visual_user',
    role: 'visual',
  },
};
