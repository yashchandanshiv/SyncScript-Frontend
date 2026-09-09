# Real-time Code Collab

Build a modern, clean, minimal frontend for a web application called "SyncScript".

SyncScript is a real-time collaborative code editor. Two or more anonymous users can join the same editing session using a short session code and collaboratively edit one shared document.

IMPORTANT:

- Build the frontend using React.

- Use modern, clean UI design.

- Do NOT implement a backend.

- Do NOT create authentication, login, signup, user profiles, databases, APIs, or WebSocket server code.

- The backend already exists and will be integrated later.

- Keep the React code reasonably simple and easy to modify.

- Do not over-engineer the application.

- Make the UI responsive for desktop and tablet.

- Prioritize the editor experience.

TECHNOLOGY:

- React

- JavaScript or TypeScript

- Use a suitable existing React code editor component/library if needed.

- Use a modern styling solution such as Tailwind CSS if supported.

- Avoid unnecessary UI libraries unless they significantly improve the design.

APPLICATION FLOW:

1. LANDING / SESSION JOIN SCREEN

Create a polished landing screen for SyncScript.

The screen should contain:

- SyncScript logo/name

- Short tagline:

  "Write together. In real time."

- A primary "Create Session" button

- A session code input

- A "Join Session" button

- Small explanatory text:

  "Create a session and share the code with your collaborator."

The design should feel like a modern developer tool rather than a generic business website.

Do not include login/signup.

--------------------------------------------------

2. CREATE SESSION

When the user clicks "Create Session":

Show a session-created state containing:

- Session code prominently displayed

- Copy button

- "Enter Editor" button

- Short message:

  "Share this code with someone to collaborate."

The actual API call will be integrated later, so for now expose a simple function/state that can later be replaced with:

POST /api/session/create

The backend will return a session object containing:

{

  "id": 1,

  "sessionCode": "C480F0",

  "content": "",

  "createdAt": "...",

  "updatedAt": "..."

}

Do not implement this API call yet. Just structure the UI so it can easily be connected.

--------------------------------------------------

3. JOIN SESSION

When the user enters a session code and clicks "Join Session":

The UI should transition to the editor.

The actual backend call will later be:

POST /api/session/join?sessionCode=C480F0

Do not implement the API call yet.

Handle basic UI states:

- empty session code

- invalid session code

- joining/loading state

--------------------------------------------------

4. COLLABORATIVE EDITOR

This is the main screen.

Design it like a modern online code editor.

Layout:

TOP BAR:

- SyncScript logo/name

- Session code

- Copy session code button

- Connection status indicator

- Collaborator count

- Leave session button

EDITOR:

- Large code editor occupying most of the screen

- Line numbers

- Monospace font

- Syntax highlighting if the chosen editor supports it

- Dark theme

- Comfortable spacing

- Good readability

BOTTOM STATUS BAR:

- Connection status

- Cursor position such as:

  "Ln 4, Col 12"

- Character count or similar lightweight information

The editor should feel similar in spirit to VS Code / modern browser-based code editors, but do not copy any specific product's branding.

--------------------------------------------------

5. COLLABORATION UI

Show a small collaborator indicator in the top bar.

Example:

"2 collaborators"

Use simple colored presence dots or small avatar circles with anonymous labels such as:

"You"

"Guest"

There should be no user accounts.

The collaborator count will eventually come from the backend/WebSocket.

For now, use mock state that can easily be replaced.

--------------------------------------------------

6. WEBSOCKET INTEGRATION PLACEHOLDERS

The backend uses a native WebSocket endpoint:

ws://localhost:8080/ws?sessionCode=C480F0

The frontend will eventually send operations like:

INSERT:

{

  "type": "insert",

  "position": 5,

  "text": " World"

}

APPEND:

{

  "type": "append",

  "text": " World"

}

DELETE:

{

  "type": "delete",

  "position": 5,

  "length": 6

}

The server currently broadcasts the resulting complete document as plain text.

Example:

Hello World

DO NOT implement the WebSocket connection yet.

Instead, organize the React code so WebSocket functionality can easily be added later, preferably through a dedicated module/hook such as:

useWebSocket()

or

websocket.js

Do not create fake WebSocket networking logic that pretends to be the backend.

--------------------------------------------------

7. EDITOR BEHAVIOR

The editor should support:

- typing

- deleting

- cursor movement

- selecting text

- copy/paste

- keyboard shortcuts

The UI should expose the editor's current content and cursor/selection information in a way that will allow us to later generate our backend operations.

IMPORTANT:

Do not implement collaborative conflict resolution.

Do not implement CRDT.

Do not implement Operational Transformation.

Do not implement Redis/Kafka.

Do not implement any distributed synchronization algorithm.

The backend is intentionally simple.

--------------------------------------------------

8. VISUAL DESIGN

Design direction:

- Dark developer-tool aesthetic

- Professional but not overly corporate

- Minimal

- Modern

- Lots of editor space

- Subtle borders

- Rounded corners where appropriate

- Clear typography

- Good visual hierarchy

- Smooth but subtle transitions

- Avoid excessive gradients, animations, glassmorphism, or decorative elements

Color palette:

- Dark background

- Slightly lighter editor/panel backgrounds

- One primary accent color

- Green for connected status

- Red/orange for errors/disconnected state

The application should look like a serious developer collaboration tool.

--------------------------------------------------

9. ERROR / CONNECTION STATES

Design UI states for:

- Connecting

- Connected

- Disconnected

- Invalid session code

- Server unavailable

- Empty document

- Loading

For example:

Connected:

● Connected

Disconnected:

● Disconnected

Do not make the error screens overly complicated.

--------------------------------------------------

10. COMPONENT STRUCTURE

Keep the React application reasonably modular.

Suggested structure:

src/

├── components/

│   ├── LandingPage

│   ├── SessionJoin

│   ├── SessionCreated

│   ├── Editor

│   ├── Header

│   ├── StatusBar

│   └── CollaboratorIndicator

│

├── hooks/

│   └── useWebSocket

│

├── services/

│   └── api

│

├── App

└── main

You can adjust the structure if there is a better simple React architecture.

Do not create dozens of unnecessary components.

--------------------------------------------------

11. MOCK DATA

For the initial UI, use mock data where necessary.

Example session:

sessionCode: "C480F0"

Example document:

public class HelloWorld {

    public static void main(String[] args) {

        System.out.println("Hello SyncScript!");

    }

}

Example collaborators:

2 collaborators

However, clearly isolate mock data so it can easily be replaced by the real Spring Boot APIs.

--------------------------------------------------

12. IMPORTANT BACKEND CONTRACT

The backend already exists and should NOT be modified by this UI generation task.

REST:

POST /api/session/create

POST /api/session/join?sessionCode={sessionCode}

WebSocket:

ws://localhost:8080/ws?sessionCode={sessionCode}

Do not create any assumptions about additional backend endpoints.

Do not add authentication.

Do not add user IDs.

Do not add document IDs.

There is exactly ONE shared document per collaboration session.

--------------------------------------------------

13. FINAL REQUIREMENT

Generate a polished, working React frontend with realistic interactions and mock data, but keep the backend integration points clearly separated.

The most important goal is:

A user should be able to open SyncScript, create or join a session, enter an attractive code-editor screen, see the session code and connection status, and feel like they are using a real collaborative coding tool.

The frontend should be easy for another developer to connect to an existing Spring Boot REST + WebSocket backend later.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6a087503-13c2-4ff6-9f78-66eb7c31c12a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
