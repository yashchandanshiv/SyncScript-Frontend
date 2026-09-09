/**
 * Backend integration point (Spring Boot REST).
 *
 * Real endpoints (NOT called yet):
 *   POST /api/session/create
 *   POST /api/session/join?sessionCode={sessionCode}
 *
 * Replace the mock bodies below with real fetch() calls; the rest of the UI
 * only depends on the exported function signatures and the Session type.
 */

export type Session = {
  id: number;
  sessionCode: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export const API_BASE_URL = "http://localhost:8080";

const MOCK_DOCUMENT = `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello SyncScript!");
    }
}
`;

function randomCode() {
  const alphabet = "ABCDEF0123456789";
  return Array.from({ length: 6 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join(
    "",
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** TODO: POST `${API_BASE_URL}/api/session/create` */
export async function createSession(): Promise<Session> {
  await delay(600);
  const now = new Date().toISOString();
  return {
    id: 1,
    sessionCode: randomCode(),
    content: "",
    createdAt: now,
    updatedAt: now,
  };
}

/** TODO: POST `${API_BASE_URL}/api/session/join?sessionCode=${sessionCode}` */
export async function joinSession(sessionCode: string): Promise<Session> {
  await delay(700);
  const code = sessionCode.trim().toUpperCase();

  // Mock validation only — the real backend decides what is valid.
  if (!/^[A-F0-9]{6}$/.test(code)) {
    throw new Error("That session code doesn't exist. Check the code and try again.");
  }

  const now = new Date().toISOString();
  return {
    id: 1,
    sessionCode: code,
    content: MOCK_DOCUMENT,
    createdAt: now,
    updatedAt: now,
  };
}
