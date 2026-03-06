# 7-Oceans Backend

> REST API backend for **7-Oceans Waterpark & Resort** — a content management system that powers a full resort website including pages for Home, About, Bar, Resort, Gallery, Bookings, Contact, Navbar, Footer, Logo, and a Welcome Popup.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture & Key Concepts](#architecture--key-concepts)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Prerequisites](#prerequisites)
- [Step-by-Step Setup Guide](#step-by-step-setup-guide)
- [Authentication & Roles](#authentication--roles)
- [Image Security System](#image-security-system)
- [Database Seeding](#database-seeding)
- [Scripts Reference](#scripts-reference)

---

## Project Overview

The 7-Oceans backend is a **Node.js + Express + MongoDB** REST API that serves as a headless CMS for a waterpark and resort website. Every section of every page (hero backgrounds, text blocks, cards, reviews, forms, gallery images, etc.) is stored in MongoDB and exposed through granular, role-protected API endpoints.

Key highlights:
- **Granular content endpoints** — each sub-section of a page has its own GET/update route (e.g. `/home/hero/text`, `/home/dining/posters`)
- **Role-based access control** — three roles: `Admin`, `BackendWorker`, `FrontendWorker`
- **Image encryption** — all image URLs in API responses are automatically AES-256-CBC encrypted and served through a secure proxy (`/img/...`), so raw image paths are never exposed to clients
- **Universal catch-all controller** — any nested path on a document can be read or updated without writing a custom controller
- **Seed script** — a single command populates all 11 models with realistic sample data

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express v5 |
| Database | MongoDB (via Mongoose v9) |
| Authentication | JSON Web Tokens (jsonwebtoken) |
| Encryption | Node.js `crypto` — AES-256-CBC |
| Dev Server | Nodemon |
| Environment | dotenv |
| CORS | cors |

---

## Project Structure

```
7-oceans-backend/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── aboutController.js
│   ├── authController.js      # JWT token issuance
│   ├── barController.js
│   ├── bookController.js
│   ├── contactController.js
│   ├── footerController.js
│   ├── galleryController.js
│   ├── homeController.js      # Largest controller — all home sections
│   ├── imageController.js     # Secure image proxy
│   ├── logoController.js
│   ├── navbarController.js
│   ├── resortController.js
│   ├── universalController.js # Catch-all path-based CRUD
│   └── welcomePopupController.js
├── middleware/
│   ├── auth.js                # protect + authorize + generateToken
│   ├── errorHandler.js        # Global error handler
│   ├── imageEncrypt.js        # Auto-encrypts image URLs in all responses
│   └── pathContext.js         # Captures request path for image hierarchy
├── models/
│   ├── About.js
│   ├── Bar.js
│   ├── Book.js
│   ├── Contact.js
│   ├── Footer.js
│   ├── Gallery.js
│   ├── Home.js
│   ├── Logo.js
│   ├── Navbar.js
│   ├── Resort.js
│   └── WelcomePopup.js
├── routes/
│   ├── aboutRoutes.js
│   ├── authRoutes.js
│   ├── barRoutes.js
│   ├── bookRoutes.js
│   ├── contactRoutes.js
│   ├── footerRoutes.js
│   ├── galleryRoutes.js
│   ├── homeRoutes.js
│   ├── imageRoutes.js
│   ├── logoRoutes.js
│   ├── navbarRoutes.js
│   ├── resortRoutes.js
│   └── welcomePopupRoutes.js
├── scripts/
│   └── seed.js                # Populates DB with sample data
├── utils/
│   ├── encryption.js          # AES-256-CBC encrypt/decrypt
│   └── imageToken.js          # Image URL token generation
├── public/                    # Static image files served by the image proxy
├── .env                       # Environment variables (see below)
├── server.js                  # App entry point
└── package.json
```

---

## Architecture & Key Concepts

### Content Model
Each page (Home, About, Bar, etc.) is a single MongoDB document with deeply nested sections. Routes expose each sub-section individually, allowing the frontend to fetch only what it needs.

### Universal Controller
Any nested path on any model can be accessed without writing a dedicated controller. For example, `/home/hero/text/title` will drill into the `Home` document and return just `hero.text.title`. The same works for updates via `.../update`.

### Image Encryption Flow
1. Images are stored in MongoDB as relative paths (e.g. `/hero-bg-2.png`) or absolute URLs.
2. The `imageEncryptMiddleware` intercepts every `res.json()` call.
3. Image fields are detected by field name (e.g. `imageUrl`, `logo`, `thumbnail`, `backgroundImage`, etc.).
4. Each image URL is AES-256-CBC encrypted and replaced with a signed proxy URL: `/img/<hierarchical-path>/<encrypted-token>`.
5. The `/img` route decrypts the token and serves the actual image, so the real image origin is never exposed.

### Role-Based Access
- `FrontendWorker` — read-only access to all content endpoints
- `BackendWorker` — read + write access to content endpoints
- `Admin` — full access including the ability to issue new JWT tokens

---

## API Endpoints

### Auth
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/auth/token?role=&id=` | Admin | Issue a new JWT for a given role |

### Content Routes (all require JWT)
All routes follow the pattern `GET /<page>/<section>` for reads and `GET /<page>/<section>/update` for writes (query params carry the updated values).

| Base Path | Sections Available |
|---|---|
| `/home` | `hero/background`, `hero/text`, `quick-access/text`, `quick-access/cards`, `quick-access/decorations`, `dining/background`, `dining/text`, `dining/posters`, `signature-attractions/text`, `signature-attractions/categories`, `signature-attractions/cards`, `booking/background`, `booking/decorations`, `booking/title`, `booking/form-labels`, `resort-amenities/background`, `resort-amenities/decorations`, `resort-amenities/text`, `resort-amenities/amenities`, `guest-reviews/background`, `guest-reviews/decorations`, `guest-reviews/text`, `guest-reviews/reviews` |
| `/about` | `hero`, `our-story`, `our-purpose`, `our-values`, `excellence` |
| `/bar` | `hero`, `introduction`, `drinks-and-views`, `discover-cocktails`, `perfect-drink`, `reservations` |
| `/resort` | `hero`, `introduction`, `booking-form`, `stay-and-recharge`, `room-categories`, `testimonials` |
| `/book` | `hero`, `experiences`, `booking-flow` |
| `/contact` | `hero`, `get-in-touch`, `reach-us`, `need-to-know` |
| `/gallery` | `hero`, `grid-section` |
| `/navbar` | full document |
| `/footer` | full document |
| `/logo` | full document |
| `/welcome-popup` | full document |

### Image Proxy
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/img/<path>/<token>` | Public | Decrypt token and serve image |

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Server
PORT=5000
SERVER_URL=http://localhost:5000

# Database
MONGO_URI=mongodb://localhost:27017/7-oceans-cms

# Environment
NODE_ENV=development

# CORS — set to your frontend origin
CORS_ORIGIN=http://localhost:5173

# JWT
JWT_SECRET=your_long_random_jwt_secret_here
JWT_EXPIRE=7d

# AES-256-CBC encryption key — must be a 32-byte hex string (64 hex characters)
ENCRYPTION_KEY=your_64_character_hex_string_here

# Static image directory (used by the image proxy)
PUBLIC_DIR=./public
```

> **Important:** The `ENCRYPTION_KEY` must be exactly 64 hexadecimal characters (32 bytes). You can generate one with:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

---

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** v18 or higher — [nodejs.org](https://nodejs.org)
- **npm** v9 or higher (comes with Node.js)
- **MongoDB** v6 or higher, running locally or a connection URI from MongoDB Atlas — [mongodb.com](https://www.mongodb.com)

To verify your installations:
```bash
node --version
npm --version
mongod --version
```

---

## Step-by-Step Setup Guide

### Step 1 — Clone or Extract the Project

If you received a zip file, extract it:
```bash
unzip 7-oceans-backend.zip
cd 7-oceans-backend
```

Or if cloning from a repository:
```bash
git clone <repo-url>
cd 7-oceans-backend
```

---

### Step 2 — Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json`:
- `express`, `mongoose`, `dotenv`, `cors`, `jsonwebtoken`
- `nodemon` (dev dependency)

---

### Step 3 — Configure Environment Variables

Copy or create the `.env` file:
```bash
cp .env.example .env   # if an example file exists
# or create it manually
```

Edit `.env` and fill in the required values. At minimum, set:
- `MONGO_URI` — your MongoDB connection string
- `JWT_SECRET` — a long, random secret string
- `ENCRYPTION_KEY` — a 64-character hex string (see above for generation command)
- `SERVER_URL` — the full URL where this server is accessible (e.g. `http://localhost:5000`)
- `CORS_ORIGIN` — your frontend's origin URL (e.g. `http://localhost:5173`)

---

### Step 4 — Start MongoDB

If running MongoDB locally, start the service:

**macOS (Homebrew):**
```bash
brew services start mongodb-community
```

**Linux (systemd):**
```bash
sudo systemctl start mongod
```

**Windows:**
```bash
net start MongoDB
```

**Or use Docker:**
```bash
docker run -d -p 27017:27017 --name mongo mongo:latest
```

Verify MongoDB is running by connecting:
```bash
mongosh
```

---

### Step 5 — Seed the Database (Optional but Recommended)

Populate all 11 models with realistic sample data for the 7-Oceans resort:

```bash
node scripts/seed.js
```

You should see:
```
🗑️  Clearing existing data...
🌱 Seeding all models...
✅ Database seeded successfully! All 12 models populated.
```

This seeds: Home, Bar, Resort, About, Book, Contact, Gallery, Navbar, Footer, Logo, and WelcomePopup.

---

### Step 6 — Start the Server

**For development** (auto-restarts on file changes):
```bash
npm run dev
```

**For production:**
```bash
npm start
```

You should see:
```
MongoDB Connected: localhost
Server running on port 5000
```

The API is now running at `http://localhost:5000`.

---

### Step 7 — Verify the Server is Running

Test the base route:
```bash
curl http://localhost:5000/
# Response: 7-Oceans API is running...
```

---

### Step 8 — Get an Admin JWT Token

An initial admin token is stored in `admin_token.txt` for quick testing. Use it directly:

```bash
# Read the admin token
cat admin_token.txt
```

Or generate a fresh token by using the existing admin token to call the auth endpoint:
```bash
curl "http://localhost:5000/auth/token?role=Admin&id=myuser" \
  -H "Authorization: Bearer <token-from-admin_token.txt>"
```

---

### Step 9 — Make Your First API Request

Using the JWT token from step 8:

```bash
# Get the home page hero text
curl http://localhost:5000/home/hero/text \
  -H "Authorization: Bearer <your-jwt-token>"
```

Expected response:
```json
{
  "success": true,
  "data": {
    "title": "7-OCEANS WATERPARK & RESORT",
    "tagline": "Splash Into Adventure, Stay For The Experience."
  }
}
```

---

### Step 10 — Add Static Images (Optional)

Place image files (`.png`, `.jpg`, `.webp`, etc.) into the `public/` directory. The image proxy at `/img/...` will serve them securely with encrypted tokens. The seed data references images like `/hero-bg-2.png`, `/waterpark.png`, `/resort.png`, etc. — add matching files to the `public/` folder.

---

## Authentication & Roles

All content endpoints require a valid JWT in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

### Roles

| Role | Permissions |
|---|---|
| `FrontendWorker` | Read all content endpoints |
| `BackendWorker` | Read + update all content endpoints |
| `Admin` | Full access + can issue new tokens via `/auth/token` |

### Issuing Tokens

Only an `Admin` can issue tokens for other roles:

```bash
# Issue a FrontendWorker token
curl "http://localhost:5000/auth/token?role=FrontendWorker&id=frontend-app" \
  -H "Authorization: Bearer <admin-token>"

# Issue a BackendWorker token
curl "http://localhost:5000/auth/token?role=BackendWorker&id=cms-editor" \
  -H "Authorization: Bearer <admin-token>"
```

---

## Image Security System

Every image URL in every API response is automatically encrypted:

1. **Original value stored in DB:** `/resort.png`
2. **Response sent to client:** `http://localhost:5000/img/home/hero/background/<aes-encrypted-token>`
3. **Client requests the image:** GET `/img/home/hero/background/<token>`
4. **Server decrypts token** and streams the actual image

This ensures raw file paths and external CDN URLs are never exposed to the browser. The encryption uses AES-256-CBC with the key from `ENCRYPTION_KEY` in `.env`.

---

## Database Seeding

The seed script at `scripts/seed.js` wipes and re-populates all collections with comprehensive sample data matching a real resort website, including:

- Hero backgrounds and text
- Navigation links and dropdown menus
- Dining sections with poster images
- Signature attraction cards
- Room categories with pricing (₹6,500 – ₹18,000/night)
- Guest reviews and testimonials
- Gallery images with categories
- Bar menus and cocktail cards
- Contact information and FAQ
- Footer links and copyright
- Welcome popup content

Run anytime to reset to sample data:
```bash
node scripts/seed.js
```

---

## Scripts Reference

| Command | Description |
|---|---|
| `npm start` | Start server with `node server.js` |
| `npm run dev` | Start server with `nodemon` (auto-reload on changes) |
| `node scripts/seed.js` | Seed the database with sample data |

---

## Notes

- All update routes use `GET` with query parameters (not `PUT`/`PATCH`) — this is intentional for the current CMS design.
- The `dev` script in `package.json` contains Windows-specific PowerShell commands to free port 5000 before starting. On macOS/Linux, use `npm run dev` directly or replace the `dev` script with just `nodemon server.js`.
- Token expiry defaults to `7d`. Update `JWT_EXPIRE` in `.env` to change this.
