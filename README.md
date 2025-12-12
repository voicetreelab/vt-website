# VoiceTree Website

Website for [voicetree.io](https://voicetree.io), built with [Quartz v4](https://quartz.jzhao.xyz/).

## Development

```bash
# Install dependencies
npm install

# Start local dev server
npx quartz build --serve

# Build for production
npx quartz build
```

## Deployment to Netlify

This site is configured for automatic deployment via Netlify. **Just push to main:**

```bash
git push origin main
```

Netlify will automatically:
1. Detect the push
2. Run `npx quartz build`
3. Deploy the `public/` folder

Configuration is in `netlify.toml`.

## Adding Content

Add markdown files to the `content/` folder. They will be automatically built and deployed on push.

---

Built with [Quartz v4](https://quartz.jzhao.xyz/) - a tool for publishing digital gardens.
