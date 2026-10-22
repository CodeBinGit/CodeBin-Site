<p align='center'>
  <a href="https://codebin.site">
    <img src="https://cdn.discordapp.com/attachments/653733403841134600/972798410795143178/CodeBinTrans.png" height="128">
    <h1 align="center">Code Bin</h1>
  </a>
</p>

<h3 align="center">Create, Edit, Customize and share your code snippets with your Friends, Family and Co-Workers in just a few clicks.</h3>

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Server Actions) and React 19
- [Clerk](https://clerk.com) for authentication
- [Supabase](https://supabase.com) for storage (accessed only on the server)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Shiki](https://shiki.style) for syntax highlighting and [CodeMirror 6](https://codemirror.net) for the editor

## Getting started

```bash
cp .env.example .env.local   # fill in your Supabase and Clerk keys
npm install
npm run dev
```

## Dokploy / Docker

Deploy this repository with the Dockerfile at the project root. The container listens on `0.0.0.0:3091`; set the application's container port to `3091` in Dokploy. Set the Clerk publishable key, site URL, and optional analytics ID as Docker build arguments, since Next.js embeds `NEXT_PUBLIC_*` values during the build. Set Supabase runtime values (`SUPABASE_URL` and `SUPABASE_SECRET_KEY`, or `SUPABASE_PUBLISHABLE_KEY`) and other server-only values such as `CLERK_SECRET_KEY` and `PASTE_UNLOCK_SECRET` as runtime environment variables in Dokploy. Supabase credentials are no longer needed during the Docker build.

| Script              | What it does            |
| ------------------- | ----------------------- |
| `npm run dev`       | Start the dev server    |
| `npm run build`     | Production build        |
| `npm run lint`      | ESLint                  |
| `npm run typecheck` | TypeScript without emit |
| `npm run format`    | Prettier                |

## Database

The app uses the existing `Pastes` table:
`id, code, title, description, language, public, private, createdAt, userId, pasteId, pastePassword, hasVanity`.
Paste passwords are stored as bcrypt hashes; older plain-text passwords are upgraded the first time someone unlocks the paste.
