type SessionData = {
  step: number;
  data: Record<string, string>;
};

let session: SessionData = { step: 0, data: {} };

export function getSession(): SessionData {
  return session;
}

export function updateSession(newData: Partial<SessionData>) {
  session = {
    ...session,
    ...newData,
    data: { ...session.data, ...newData.data }
  };
}

export function clearSession() {
  session = { step: 0, data: {} };
}
