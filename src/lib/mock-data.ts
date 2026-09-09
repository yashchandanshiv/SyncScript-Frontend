/**
 * Mock data — isolated here so it can be deleted once the backend is wired up.
 */

export type Collaborator = {
  id: string;
  label: string;
  /** Tailwind-safe token class for the presence dot. */
  color: "primary" | "success" | "warning";
};

export const MOCK_COLLABORATORS: Collaborator[] = [
  { id: "self", label: "You", color: "primary" },
  { id: "guest-1", label: "Guest", color: "success" },
];

export const EXAMPLE_SESSION_CODE = "C480F0";
