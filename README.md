# Farm Blog

Built using next.js, contentful, and vercel.

## Environment Variables

These will be needed for both localhost and deployment

```
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=<contentful_space_id>
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=<contentful_access_token>
```

## Local Build

1. Clone repo
2. `npm install` in the repo
3. `npm run dev`

## Deploy instructions

It is a standard next config to deploy to vercel with the environment variables added.

Deploy commands:

1. `npm run build`
2. `npm run start`

If not deploying to vercel, the function `/api/search` will need to be deployed somewhre, and the built `cache` for search will need to be accessible by it.
