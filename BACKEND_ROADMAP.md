# Kino Backend & Animation Engine — Development Roadmap

Building a functioning AI animation tool like Swishy requires:
1. Backend API
2. Animation rendering engine
3. User account system
4. File storage
5. Frontend integration

This document outlines the architecture, tech stack, and estimated effort.

---

## Architecture Overview

```
User (Browser)
    ↓
Kino Frontend (Astro site)
    ↓
API Server (Node.js / Python)
    ├── Auth (JWT)
    ├── Prompt parsing
    ├── Project storage (PostgreSQL)
    └── Queue jobs
    ↓
Rendering Service
    ├── Generate SVG/keyframes from prompt
    ├── Render to MP4 (FFmpeg)
    └── Store output
    ↓
File Storage (S3 or similar)
    ├── User projects
    ├── Rendered videos
    └── Temporary files
```

---

## Phase 1: User Accounts & Projects (2-3 weeks)

### Backend Setup
- **Framework:** Node.js (Express) or Python (FastAPI)
- **Database:** PostgreSQL (user accounts, projects, renders)
- **Auth:** JWT tokens
- **Hosting:** AWS, Render, or Railway (free tier available)

### What to build:
```
POST   /api/auth/signup          ← Register user
POST   /api/auth/login           ← Login user
POST   /api/projects             ← Create project
GET    /api/projects             ← List user's projects
GET    /api/projects/:id         ← Get project details
PUT    /api/projects/:id         ← Update project
DELETE /api/projects/:id         ← Delete project
```

### Database schema:
```sql
users (id, email, password_hash, created_at)
projects (id, user_id, title, prompt, created_at)
renders (id, project_id, status, output_url, created_at)
```

### Frontend changes:
- Hook the prompt input to `POST /api/projects`
- Store JWT token in localStorage
- Show user's project list on `/projects` page

**Estimated effort:** 2-3 weeks for a solo developer

---

## Phase 2: Animation Engine (4-8 weeks)

This is the hard part. You need to:
1. Parse natural language prompts
2. Generate animation keyframes
3. Create SVG or HTML
4. Render to video

### Three approaches:

### Option A: Use existing AI service (Easiest, costs money)
- **Service:** Replicate, RunwayML, or similar
- **Approach:** Send prompt to their API, get video back
- **Cost:** $0.01-$0.10 per render (adds up)
- **Time:** 1 week to integrate
- **Code:** Simple API wrapper

### Option B: Build with anime.js + templates (Medium, custom logic)
- **Approach:** 
  - Parse prompt to extract intent (text animation, logo, chart, etc.)
  - Match to template
  - Inject user's content
  - Render with anime.js
- **Time:** 4-6 weeks
- **Cost:** Hosting only
- **Limitation:** Only works for predefined patterns

### Option C: Use AI + generative approach (Hardest, cutting edge)
- **Approach:**
  - Use GPT/Claude API to understand prompt
  - Generate SVG/HTML dynamically
  - Render with Remotion or Puppeteer
- **Time:** 8+ weeks
- **Cost:** OpenAI API + hosting
- **Capability:** Much more flexible

### Recommendation for MVP

**Start with Option B** (templates + anime.js):

1. Define 10-15 animation templates:
   - Text animation (kinetic typography)
   - Logo reveal (SVG stroke drawing)
   - Chart build (bars animate in)
   - Countdown (numbers count down)
   - etc.

2. Parse the prompt to identify which template matches:
   ```javascript
   // Example: "a logo that draws itself"
   // → Match: "logo reveal" template
   // → Extract: logo text or image
   // → Render with anime.js
   // → Output: MP4
   ```

3. Let users customize the template:
   - Colors
   - Duration
   - Easing
   - Content

4. Render to video using:
   - **Remotion** (render React → video via Node.js)
   - **Puppeteer + FFmpeg** (render HTML → screenshot → encode)
   - **Headless browser** (render HTML/CSS/JS → MP4)

### Architecture for Option B:

```
Prompt: "a logo that draws itself"
    ↓
Parse with regex + NLP (or hardcoded rules)
    ↓
Match to template: "SVG line drawing"
    ↓
Generate keyframes using anime.js
    ↓
Render HTML to video (Remotion or Puppeteer)
    ↓
Store MP4 in S3
    ↓
Return URL to user
```

**Tech stack:**
- **Animation:** anime.js (same as frontend)
- **Rendering:** Remotion or Puppeteer + FFmpeg
- **Storage:** AWS S3 or similar
- **Hosting:** AWS Lambda (serverless) or EC2 (dedicated)

**Code skeleton:**
```javascript
// /api/render
const renderAnimation = async (req, res) => {
  const { prompt, projectId } = req.body;
  
  // 1. Parse prompt
  const template = detectTemplate(prompt);
  const content = extractContent(prompt);
  
  // 2. Generate keyframes
  const keyframes = generateKeyframes(template, content);
  
  // 3. Render to video
  const videoPath = await renderToMP4(keyframes);
  
  // 4. Upload to S3
  const url = await uploadToS3(videoPath);
  
  // 5. Store in database
  await saveRender(projectId, url);
  
  // 6. Return to user
  res.json({ url, status: 'complete' });
};
```

**Estimated effort:** 4-6 weeks for a solo developer

---

## Phase 3: Rendering Service (3-4 weeks)

Convert HTML/anime.js animations to MP4.

### Option 1: Remotion (Recommended)
```javascript
import { Composition, AbsoluteFill } from 'remotion';
import { render } from '@remotion/renderer';

// Render React component to video
const videoData = await render({
  composition: MyAnimation,
  fps: 24,
  width: 1080,
  height: 1920,
  durationInFrames: 720,
  outputLocation: './output.mp4',
});
```

- Pros: Clean, React-based, good for web developers
- Cons: Requires Node.js, can be memory-intensive
- Time: 1-2 weeks to integrate

### Option 2: Puppeteer + FFmpeg
```bash
# Capture screenshots of HTML page
puppeteer screenshot animation.html frame_%04d.png

# Encode to video
ffmpeg -framerate 24 -i frame_%04d.png output.mp4
```

- Pros: Flexible, can render any HTML
- Cons: Slow (captures each frame), disk-intensive
- Time: 2-3 weeks to optimize

### Option 3: Custom Headless Browser
- Build on Chromium
- Render at 60fps
- Encode to H.264
- Time: 4-6 weeks (overkill for MVP)

**Recommendation:** Use Remotion for MVP.

---

## Phase 4: Job Queue & Background Processing (2-3 weeks)

Rendering takes time. You need to:
1. Accept render request
2. Queue it
3. Process in background
4. Notify user when ready

### Tech stack:
- **Queue:** Bull (Node.js) or Celery (Python)
- **Redis:** For queue storage
- **WebSocket or polling:** To notify user of progress

### Flow:
```
User submits prompt
    ↓
API creates job and returns job_id
    ↓
Return 202 Accepted (not 200)
    ↓
Worker picks up job from queue
    ↓
Renders animation (1-30 seconds)
    ↓
Stores result
    ↓
Frontend polls /api/jobs/:id for status
    ↓
Show progress: "Rendering 50% complete"
    ↓
When done, show "Download" button
```

**Estimated effort:** 2-3 weeks

---

## Phase 5: Frontend Integration (2-3 weeks)

Connect the Astro site to the backend.

### Changes:
1. **Prompt input** → calls `POST /api/render`
2. **Project page** → shows saved projects from database
3. **Status page** → shows render progress (via polling or WebSocket)
4. **Download button** → exports MP4
5. **Login page** → actually works (calls `/api/auth/login`)

### Code example:
```javascript
// In src/pages/index.astro or a component

const handleRender = async (prompt) => {
  // 1. Authenticate
  const token = localStorage.getItem('token');
  
  // 2. Submit render job
  const response = await fetch('/api/render', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ prompt, mode: 'animate' }),
  });
  
  const { jobId } = await response.json();
  
  // 3. Poll for status
  while (true) {
    const status = await fetch(`/api/jobs/${jobId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    }).then(r => r.json());
    
    if (status.complete) {
      showDownloadButton(status.videoUrl);
      break;
    }
    
    updateProgress(status.progress);
    await sleep(1000); // Poll every second
  }
};
```

**Estimated effort:** 2-3 weeks

---

## Total Effort & Timeline

```
Phase 1 (Auth + Projects):      2-3 weeks
Phase 2 (Animation Engine):     4-6 weeks   ← Biggest effort
Phase 3 (Rendering Service):    3-4 weeks
Phase 4 (Job Queue):            2-3 weeks
Phase 5 (Frontend):             2-3 weeks
─────────────────────────────
Total:                          13-19 weeks (solo developer)
Or:                             6-10 weeks (team of 2)
```

---

## Cost Estimates (Monthly)

```
Hosting (API + Workers):        $50-200
Database (PostgreSQL):          $10-50
Video storage (S3):            $10-100 (depends on usage)
Rendering (compute):           $100-500 (depends on load)
─────────────────────────────
Total:                         $170-850/month at launch

Scales with usage. 1000 renders/month = ~$300-500.
```

---

## Tech Stack Recommendation

### Backend
- **Language:** Node.js + TypeScript (familiar to web devs)
- **Framework:** Express or Fastify
- **Database:** PostgreSQL
- **Auth:** JWT (jsonwebtoken)
- **Queue:** Bull + Redis
- **Rendering:** Remotion

### Hosting
- **Development:** Render.com or Railway (free tier)
- **Production:** AWS (EC2 + RDS + S3 + Lambda)

### Frontend
- Keep the Astro site as-is
- Add API calls to prompt input, project list, etc.

---

## MVP Strategy

Don't build everything. Start minimal:

### Week 1-2: Backend basics
- Simple API: `/api/render` (accepts prompt, returns static URL for now)
- No database yet, no auth
- No queue

### Week 3-6: Animation engine
- Parse prompts to template matching
- Render 5-10 templates with anime.js + Remotion
- Output real MP4s

### Week 7-10: User accounts
- Add auth
- Add project storage
- Add job queue for rendering

### Week 11-13: Polish
- Error handling
- Rate limiting
- Better UI for progress

Then launch.

---

## Alternative: Use Existing APIs

If you want to move faster, integrate with:

1. **Replicate** (https://replicate.com)
   - Run models on demand
   - Could use a video generation model
   - Cost: $0.01-$0.10 per render
   - Time: 1 week to integrate

2. **RunwayML** (https://runwayml.com)
   - AI video generation
   - Cost: $10-50/month subscription
   - Time: 1 week to integrate

3. **D-ID** or similar
   - AI avatar/video generation
   - Less flexible but cheaper

**Pros:** Launch in 1-2 weeks instead of 15 weeks  
**Cons:** Monthly costs, limited flexibility, dependent on third party

---

## Next Steps

### If you want to build it yourself:

1. **Decide on approach:**
   - Option A (use third-party API) = 1-2 weeks, costs money
   - Option B (template-based) = 4-6 weeks, owned by you
   - Option C (full AI) = 8+ weeks, most flexible

2. **Set up backend:**
   - Node.js + Express + PostgreSQL
   - Local development environment
   - Deploy to Render or Railway

3. **Start with auth:**
   - User signup/login
   - JWT tokens
   - Project CRUD

4. **Build one template:**
   - Text animation (kinetic typography)
   - Parse prompt: "animate 'hello' coming from left"
   - Generate anime.js keyframes
   - Render to MP4 with Remotion

5. **Add queue:**
   - Redis + Bull
   - Background processing
   - Polling status from frontend

6. **Integrate frontend:**
   - Wire prompt input to API
   - Show render progress
   - Download video

---

## Questions to Answer Before Starting

1. **How much custom logic do you want?**
   - Full AI (expensive, complex)
   - Template-based (owned, controlled)
   - Third-party service (easy, costs money)

2. **What templates matter most?**
   - Text animations
   - Logo reveals
   - Charts
   - Transitions
   - All of the above?

3. **What's your timeline?**
   - Launch in 1 month? → Use third-party API
   - Launch in 4 months? → Build template engine
   - Build it perfectly? → 6-12 months

4. **What's your budget?**
   - $0 (self-hosted, lots of engineering)
   - $500-1000/month (AWS + development)
   - $5000+/month (outsource rendering)

---

## Recommendation

**For an MVP that actually works:**

1. Use template-based approach (Option B)
2. Start with 5-10 simple templates
3. Build the backend in Node.js
4. Use Remotion to render animations to MP4
5. Deploy on AWS or Render
6. Launch with early beta users
7. Iterate based on feedback

**Timeline:** 3-4 months for a functioning product  
**Cost:** $0 development (if you build it), $200-500/month hosting

---

## Resources

### Learning
- Remotion docs: https://www.remotion.dev
- anime.js docs: https://animejs.com
- Express.js docs: https://expressjs.com
- PostgreSQL docs: https://www.postgresql.org/docs

### Services
- Render: https://render.com (free hosting)
- Railway: https://railway.app (free hosting)
- AWS: https://aws.amazon.com (industry standard)
- Replicate: https://replicate.com (use existing models)

### Communities
- Node.js community
- Remotion Discord
- indie hackers (for motivation)

---

**Next:** Let me know what approach you want to take, and I can start building the backend.
