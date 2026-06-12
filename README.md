# Colorblind Vision Emulator

This is a web application that emulates how images appear to people with various types of color vision deficiencies. Upload any image, select a colorblindness type, and instantly see the image converted to reflect that visual experience.

## Features

- **Image Upload** — Upload any image (PNG, JPG, WebP) and apply colorblind emulation filters
- **Deficiency Types** — Emulate multiple types of color vision deficiencies including:
  - Protanopia (red-blind)
  - Deuteranopia (green-blind)
  - Tritanopia (blue-blind)
  - Achromatopsia (total color blindness)
- **User Accounts** — Create an account to access your personalized workspace
- **Save & Gallery** — Save emulated images to your account and revisit them anytime from your personal gallery

## Use Cases

- Designers and developers testing UI accessibility
- Educators and students learning about color vision deficiency
- Anyone curious about how color-impaired vision works


## Setup

1. Clone the repo
2. Run `npm install` in the root folder and in `server/`
3. Create a `.env` file in `server/` using `.env.example` as a template
4. Run `psql -U postgres -f database/schema.sql` to create the tables
5. Run `npm start` in `server/`
6. Run `npm run dev` in the root folder