## Ngrok Setup (Required for Federation)

ActivityPub federation requires a public HTTPS URL.  
We use ngrok to expose the local server.

1. Install ngrok  
   https://ngrok.com/download  

2. Start backend server  
   cd backend  
   npm run dev  

3. In a new terminal, run:  
   ngrok http 4000  

4. Copy the HTTPS URL provided by ngrok  
   Example: https://abcd1234.ngrok.io  

5. Update your .env file:

BASE_URL=https://abcd1234.ngrok.io

⚠️ Note: Do not use localhost for ActivityPub actor URLs.  
Always use the ngrok public HTTPS URL.

## Screenshots & Evidence Requirement (Mandatory)

For every Pull Request, contributors must attach appropriate visual
or functional evidence based on the type of change.

This helps reviewers verify changes quickly and ensures high-quality reviews.

---

## When Evidence Is Required

### Frontend / UI Changes (Screenshots Mandatory)

Screenshots are mandatory for:

- UI layout changes  
- New pages or components  
- Styling or theme updates  
- Responsive design changes  
- Bug fixes affecting visual output  

### Backend / API Changes (Proof Mandatory)

For backend-related changes, attach at least one of the following:

- API response screenshots (Postman / Thunder Client / curl)
- Terminal logs showing successful execution
- JSON response outputs
- Database record screenshots (if applicable)

Examples:
- New API endpoint → attach Postman response  
- Bug fix in logic → attach before/after output  
- Federation change → attach inbox/outbox logs  

---

## Screenshot & Evidence Guidelines

- Attach clear and readable screenshots.
- Include full page or full terminal view where relevant.
- Highlight the affected section if possible.
- Ensure screenshots reflect the latest commit in the PR.
- Do not attach outdated or unrelated images.

For UI changes:
- Include full-page desktop view.
- Include mobile view if responsiveness is affected.

For backend changes:
- Show request + response clearly.
- Include status codes and important fields.

---

## How to Attach Screenshots / Evidence in a PR

1. Open your Pull Request on GitHub.
2. Drag and drop images directly into the PR description.
3. Or use markdown:

![Description](screenshot.png)

You may attach multiple images if needed.

---

## Pull Requests Without Evidence

- PRs that modify frontend without screenshots may be requested for changes.
- PRs that modify backend without functional proof may be requested for changes.
- Incomplete PRs may be closed without review.

---

## Pull Request Checklist (Updated)

Before submitting a PR, make sure:

- [ ] Code builds without errors  
- [ ] No unnecessary files added  
- [ ] Code is properly formatted  
- [ ] Related issue is linked (if any)  
- [ ] Screenshots attached for frontend changes  
- [ ] API/logic proof attached for backend changes  
- [ ] Description clearly explains the change  
