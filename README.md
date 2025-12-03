
# 🧱 PI-ecommerce-backend - Node.js, TypeScript, Prisma e Docker

Este projeto é um backend para uma matéria da faculdade (Projeto Integrador) utilizando:

- TypeScript
- Express
- Prisma ORM
- Docker + Docker Compose
- Testes com Jest

---

---

## 🚀 Como executar o projeto

### 🔧 Pré-requisitos

- Docker
- Docker Compose
- Yarn
- Node.js

---

## 🐳 1. Suba o ambiente com Docker Compose
```bash
docker-compose up -d
```

## 📦 2. Instale as dependências

```bash
yarn install
```

## ⚙️ 3. Configure as variáveis de ambiente

Crie um arquivo .env e insira as informações necessárias:

```env
DATABASE_URL="postgres://<usuario>:<senha>@<host>:<porta>/<database>?schema=public"
```

## 🔄 4. Configure o Prisma

Gere o cliente Prisma:

```bash
npx prisma generate
```

Rode as migrations (se necessário):

```bash
npx prisma migrate dev --name init
```

Verifique o banco com:

```bash
npx prisma studio
```

## 🏁 5. Rode a aplicação

```bash
yarn dev
```

O servidor estará disponível em: http://localhost:3000

---

---

## 📚 Scripts úteis

```bash
yarn dev # Inicia em modo desenvolvimento (com ts-node-dev)
yarn build # Compila o projeto para a pasta dist/
yarn start # Executa o projeto compilado
yarn test # Roda os testes com Jest
yarn prisma # Comando para usar Prisma CLI (via yarn prisma <comando>)
```
