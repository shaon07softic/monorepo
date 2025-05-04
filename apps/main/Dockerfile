# -------- Base Stage --------
    FROM node:18-alpine AS base

    WORKDIR /app
    
    # Install dependencies layer cache
    COPY package.json package-lock.json turbo.json ./
    COPY apps/main/package.json ./apps/main/
    COPY packages/ui/package.json ./packages/ui/
    
    RUN npm ci --ignore-scripts
    
    # -------- Build Stage --------
    FROM base AS build
    
    # Copy rest of the codebase
    COPY . .
    
    # Build only the web app using Turbo
    RUN npx turbo run build --filter=main...
    
    # -------- Production Stage --------
    FROM node:18-alpine AS runner
    
    WORKDIR /app
    
    # Install only production deps
    COPY --from=base /app/node_modules ./node_modules
    COPY --from=build /app/apps/main/.next ./.next
    COPY --from=build /app/apps/main/public ./public
    COPY --from=build /app/apps/main/package.json ./package.json
    COPY --from=build /app/packages ./packages 
    
    # Set environment variables
    ENV NODE_ENV=production
    ENV PORT=3000
    
    EXPOSE 3000
    
    # Start the Next.js app
    # CMD ["node_modules/.bin/next", "start"]
    CMD ["npm", "run", "start"]

    