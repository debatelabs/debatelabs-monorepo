import { BaseDTO } from '~/shared/model/types/application.types';

interface SessionEvents {
  onRefreshSession: () => Promise<BaseDTO<unknown>>;
  onLogout: () => Promise<boolean>;
}

const defaultHandlers: SessionEvents = {
  onRefreshSession: async (): Promise<BaseDTO<unknown>> => {
    console.warn('No handler registered for refresh session event');
    return {
      success: false,
      data: null
    };
  },
  onLogout: async (): Promise<boolean> => {
    console.warn('No handler registered for logout event');
    return false;
  }
};

let authEventHandlers: SessionEvents = { ...defaultHandlers };

export const sessionEvents = {
  registerHandlers: (handlers: Partial<SessionEvents>) => {
    authEventHandlers = { ...authEventHandlers, ...handlers };
  },

  emitRefreshSession: async () => await authEventHandlers.onRefreshSession(),

  emitLogout: async () => await authEventHandlers.onLogout()
};
