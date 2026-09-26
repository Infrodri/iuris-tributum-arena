# Iuris Tributum Arena

Plataforma de práctica tributaria (Ley Nº 2492 - Bolivia) con 4 modos de juego
(Trivia, Casos Prácticos, Clasificador Contravención/Delito, Flashcards) y
ranking en vivo entre el proyector del docente y los celulares de los
estudiantes, usando Pusher Channels (sin base de datos: nada se guarda, todo
vive mientras dura la sesión).

## Estructura

- `/` (pages/index.js) → vista del estudiante: unirse, elegir juego, jugar.
- `/docente` (pages/docente.js) → panel del proyector: QR, sala, ranking en vivo.
- `/api/pusher/score` → recibe el puntaje de un estudiante y lo retransmite.
- `/api/pusher/session` → el docente lo usa para "Finalizar sesión" / "Reiniciar sala".

## 1. Instalar dependencias (local)

```bash
npm install
```

## 2. Variables de entorno

Ya existe un archivo `.env.local` con tus claves de Pusher (sandbox plan,
cluster `sa1`). Este archivo está en `.gitignore` — nunca se sube a GitHub.

Si necesitas recrearlo, usa `.env.example` como plantilla:

```
PUSHER_APP_ID=tu_app_id
PUSHER_SECRET=tu_secret
NEXT_PUBLIC_PUSHER_KEY=tu_key
NEXT_PUBLIC_PUSHER_CLUSTER=tu_cluster
```

## 3. Probar en local

```bash
npm run dev
```

- Abre `http://localhost:3000/docente` en una pestaña (proyector).
- Abre `http://localhost:3000` en otra pestaña o desde tu celular (usando la
  IP de tu computadora en la misma red, o mejor, ya desplegado en Vercel).

## 4. Subir a GitHub

```bash
git init
git add .
git commit -m "Iuris Tributum Arena"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

## 5. Desplegar en Vercel

1. Entra a vercel.com → **Add New Project** → **Import Git Repository** →
   selecciona tu repositorio.
2. En **Environment Variables**, agrega las mismas 4 variables de
   `.env.local` (Vercel NO lee `.env.local` del repo porque está en
   `.gitignore` — hay que pegarlas manualmente aquí).
3. Deploy. Cada `git push` a `main` vuelve a desplegar automáticamente.

## 6. El día de tu disertación

1. Abre `https://tu-proyecto.vercel.app/docente` en el proyector.
2. Haz clic en **"Nueva Sala"** si quieres un código distinto al que aparece.
3. Los estudiantes escanean el QR (o entran a la URL y escriben el código
   manualmente) desde sus celulares.
4. Cada estudiante elige un modo de juego, juega, y su puntaje aparece solo
   en el ranking del proyector — no necesitas hacer nada más.
5. Al terminar, clic en **"Finalizar Sesión"** para anunciar al ganador (con
   confeti) o **"Reiniciar Sala"** para dejar el ranking en cero sin cambiar
   de código.

Nada persiste: si recargas `/docente`, el ranking vuelve a cero — es
exactamente el comportamiento que pediste, ya que es un juego pensado para
una sola sesión en vivo.

## Notas de seguridad

- El `PUSHER_SECRET` solo se usa dentro de `pages/api/pusher/*.js`
  (código de servidor) — nunca llega al navegador.
- Si compartes este repositorio, revisa que `.env.local` no se haya
  incluido por error (`git status` no debería mostrarlo).
