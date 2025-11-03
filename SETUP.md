# Greita instrukcija paleidimui

## 1. Dependencijų įdiegimas

```bash
npm install
```

## 2. Duomenų bazės inicializacija

```bash
npm run db:generate
```

## 3. Admin vartotojo sukūrimas

Paleiskite Next.js dev serverį viename terminale:

```bash
npm run dev
```

Kitame terminale paleiskite Prisma Studio:

```bash
npx prisma studio
```

Prisma Studio atsidarys adrese: `http://localhost:5555`

Admin lentelėje paspauskite "Add record" ir įveskite:
- username: `admin` 
- password: **NEPALIKITE TUŠČIO** - įveskite bet kokį tekstą (pvz: `temp123`)

**SVARBU:** Prisma Studio parodys hash sugeneruotą slaptažodį.

## 4. Slaptažodžio hash'inimas

Atidarykite: `http://localhost:3000/admin/login`

Bandykite prisijungti bet kokiu slaptažodžiu - jis NEPAVEKS, bet:
1. Atidarykite naršyklės Dev Tools (F12)
2. Console skiltyje rasite error su hash'inu
3. Nukopijuokite hash
4. Grįžkite į Prisma Studio ir atnaujinkite Admin įrašą su tinkamu hash

**ARBA** naudokite Python/PHP skriptą hash'inimui (rekomenduoju).

## 5. Prisijungimas

Atidarykite: `http://localhost:3000/admin/login`

- Vartotojas: `admin`
- Slaptažodis: (toks kurį hash'inote)

**Pastaba:** Produkcinėje aplinkoje naudokite `.env` kintamuosius ir `npm run db:migrate` komandas!

