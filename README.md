# Casa Leven — Sitio Web

Stack: **Next.js 14** · **Tailwind CSS** · **Supabase** · **Vercel**

---

## SETUP LOCAL

```bash
# 1. Instalar dependencias
cd casa-leven-web
npm install

# 2. Variables de entorno
cp .env.local.example .env.local
# Completar con tus keys de Supabase:
# NEXT_PUBLIC_SUPABASE_URL=https://ymnfvfvmkicjvpignetq.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key

# 3. Correr en desarrollo
npm run dev
# → http://localhost:3000
```

---

## DEPLOY EN VERCEL

1. Subir a GitHub: crear repo `casa-leven-web` y hacer push
2. Ir a vercel.com → New Project → importar el repo
3. En **Environment Variables** agregar:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy → automático
5. En Vercel Settings → Domains → agregar `casaleven.com`
6. En tu registrador DNS: apuntar a los nameservers de Vercel

---

## AGREGAR LOGO SVG

Cuando tengas el SVG del logo, reemplazar el texto tipográfico en `components/Nav.tsx` y `components/Footer.tsx`:

```tsx
// Reemplazar esto:
<span className="font-display font-bold text-white">CASA LEVEN</span>

// Por esto:
<Image src="/logo.svg" alt="Casa Leven" width={140} height={40} />
```

Poner el archivo en `public/logo.svg`.

---

## PÁGINAS INCLUIDAS

| Página | URL | Estado |
|--------|-----|--------|
| Home | `/` | ✅ |
| Socios Fundadores | `/fundadores` | ✅ |
| Membresías | `/membresias` | ✅ |
| Leven Motion | `/motion` | 🔜 Fase 2 |
| Leven Therma | `/therma` | 🔜 Fase 2 |
| Leven Nourish | `/nourish` | 🔜 Fase 2 |

---

## ACTUALIZAR PRECIOS

En `app/membresias/page.tsx` y `app/fundadores/page.tsx` buscar:
```
price: 'USD 89'
```
y cambiar por el precio real.

## ACTUALIZAR WHATSAPP

Buscar `wa.me/5493415000000` en todo el proyecto y reemplazar por el número real.
