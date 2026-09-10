/**
 * Backend integration point (Spring Boot REST).
 *
 * Real endpoints:
 *   POST /api/session/create
 *   POST /api/session/join?sessionCode={sessionCode}
 */

export type Session = {
  id: number;
  sessionCode: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export const API_BASE_URL = "http://localhost:8080";

/**
 * Create a new collaboration session.
 */
export async function createSession(): Promise<Session> {
  const response = await fetch(`${API_BASE_URL}/api/session/create`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Couldn't create a session.");
  }

  const session: Session = await response.json();

  return session;
}

/**
 * Join an existing collaboration session.
 */
export async function joinSession(sessionCode: string): Promise<Session> {
  const code = sessionCode.trim().toUpperCase();

  const response = await fetch(
    `${API_BASE_URL}/api/session/join?sessionCode=${encodeURIComponent(code)}`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.message ?? "That session code doesn't exist. Check the code and try again.",
    );
  }

  const session: Session = await response.json();

  return session;
}
