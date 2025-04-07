import { sessionEvents } from '~/shared/lib/session-events';
import { refreshSession } from '../services/session.services';
import { logout } from '../services/session.actions';

export const initializeSessionEvents = () => {
  sessionEvents.registerHandlers({
    onRefreshSession: refreshSession,
    onLogout: logout
  });
};
