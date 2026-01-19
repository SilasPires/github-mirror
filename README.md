# GitHub Mirror

Projeto de teste front-end feito com Next.js (App Router) + TypeScript, consumindo a API REST do GitHub.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind
- Zustand (estado global)
- TanStack React Query (requisições/cache)

## Features

- Buscar usuário por username do GitHub (procura com Enter)
- Abas: **Repositories** e **Starred**
- Página de detalhes do repositório
- Filtros: Search, Type (all/sources/forks/archived/mirrors), Language

## Rodando localmente

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra http://localhost:3000

## Token da API do GitHub (opcional)

Crie `.env`:

```bash
GITHUB_TOKEN=seu_token
```

Se você não configurar o token, o app funciona normalmente, mas pode atingir o rate limit mais rápido.

## Build

```bash
npm run build
npm start
```

## Deploy

Recomendado: Vercel.

- Configure a variável `GITHUB_TOKEN` (opcional)
- Faça o deploy do repositório
