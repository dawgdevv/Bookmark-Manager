# Bookmark Manager — Project Brief

Build a **Bookmark Manager** web application with:
- a **REST API backend**
- a **frontend client**

---

## Backend Requirements

Implement a REST API with the following endpoints:

| Endpoint | Method | Description |
|---|---|---|
| `/bookmarks` | `GET` | Return all bookmarks. Supports optional query param `?tag=value` to filter by tag. |
| `/bookmarks` | `POST` | Create a new bookmark. Required: `url`, `title`. Optional: `description`, `tags` (array of strings). |
| `/bookmarks/:id` | `PUT` | Update an existing bookmark by ID. |
| `/bookmarks/:id` | `DELETE` | Delete a bookmark by ID. |

### Data Model

| Field | Type | Constraints |
|---|---|---|
| `id` | `string` \| `number` | Auto-generated unique identifier. |
| `url` | `string` | **Required**. Must be a valid URL. |
| `title` | `string` | **Required**. Max 200 characters. |
| `description` | `string` | Optional. Max 500 characters. |
| `tags` | `string[]` | Optional. Array of lowercase strings. Max 5 tags per bookmark. |
| `createdAt` | `ISO 8601 datetime` | Auto-generated on creation. |

### Storage Options

Use one of:
- In-memory store (array/object)
- JSON file
- SQLite

> No external database service is required.

### API Behavior Requirements

- JSON responses for all API endpoints.
- Correct HTTP status codes:
  - `201` for successful creation
  - `404` for not found
  - `400` for validation errors

---

## Frontend Requirements

Implement the following UI/features:

1. **Bookmark List**
   - Display all bookmarks with:
     - title
     - clickable URL
     - description snippet
     - tags

2. **Add Bookmark Form**
   - Inputs: URL, title, description, tags
   - Validate URL format and required fields before submission

3. **Edit Bookmark**
   - Support inline or modal editing

4. **Delete Bookmark**
   - Include confirmation before delete

5. **Filter by Tag**
   - Clicking a tag filters the list
   - Show active filter state
   - Allow clearing filter

6. **Search**
   - Text input that filters bookmarks by title or URL in real-time

---

## Technical Constraints

- Backend and frontend must be:
  - separate processes, **or**
  - clearly separated in the codebase
- Include at least **5 seed bookmarks** so first run is not empty.
- Provide a **single command/script** to start both backend and frontend (examples: `start.sh`, `npm concurrently`, or `docker-compose`).

---

## Bonus (Optional)

- Automatic metadata fetching (fetch page title from submitted URL)
- Pagination or infinite scroll
- Dark mode toggle
- Basic API rate limiting
- Unit tests for at least 2 API endpoints

---

## Evaluation Focus

This project will be evaluated on:

- Working REST API with correct status codes and validation
- Functional frontend that consumes the API
- Proper separation between client and server
- Error handling on both sides (API errors shown to user)
- Clear README with setup instructions and documented design choices

---

## Suggested README Add-ons (When Implemented)

After building the app, add:

- **Setup steps** (`npm install`, env setup, etc.)
- **Run command** for both services
- **Project structure** (client/server folders)
- **Validation rules** summary
- **Design choices** (why storage/framework choices were made)
- **Known limitations / future improvements**
