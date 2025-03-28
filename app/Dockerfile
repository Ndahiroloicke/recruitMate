FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install -g pnpm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

COPY . .

ARG SUPABASE_URL
ARG SUPABASE_KEY
ARG POSTMARK_SERVER_API_TOKEN
ARG POSTMARK_FROM_EMAIL
ARG OPENAI_API_KEY

ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_KEY=$SUPABASE_KEY
ENV POSTMARK_SERVER_API_TOKEN=$POSTMARK_SERVER_API_TOKEN
ENV POSTMARK_FROM_EMAIL=$POSTMARK_FROM_EMAIL
ENV OPENAI_API_KEY=$OPENAI_API_KEY

ENV NODE_ENV=production

RUN pnpm run build

FROM node:20-alpine AS production

ENV NODE_OPTIONS="--max_old_space_size=8192"

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
RUN npm install -g pnpm && pnpm install --prod

COPY --from=builder /app/.output .output

EXPOSE 3000

CMD ["pnpm", "preview"]
