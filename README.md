# Nathaniel Addae Marfo Portfolio

A responsive portfolio built as both a traditional website and an interactive Linux-style desktop.

## Views

- **Traditional Website**: Browse About, Experience, Projects, Skills, Systems, Roadmap, Education, and Contact sections in one scrollable page.
- **Linux Desktop**: Explore portfolio content through desktop icons, windows, a taskbar, applications, and a functional terminal.

The selected view is saved in the browser and can be changed at any time with the view switch button.

## Requirements

- Node.js 20 or newer
- npm

## Setup

```bash
npm ci
```

## Development

```bash
npm run dev
```

Open the local URL shown by Vite, usually `http://127.0.0.1:5173/`.

## Production Build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Lucide React

## Project Structure

```text
src/
  components/   Portfolio views, desktop windows, taskbar, and applications
  hooks/        Theme, responsive, and window-management hooks
  data.ts       Profile, project, skills, roadmap, and education data
  App.tsx       View selection and Linux desktop composition
```
