# Euskara — app para aprender euskera

## Requisitos
- Node.js 20 o superior
- Cuenta de GitHub y Vercel

## Ejecutar en local
```bash
npm install
npm run dev
```
Abre la URL local que muestra Vite.

## Publicar
1. Crea un repositorio nuevo en GitHub y sube todos los archivos de esta carpeta.
2. Entra en Vercel y pulsa **Add New → Project**.
3. Importa el repositorio.
4. Framework: Vite. Build command: `npm run build`. Output directory: `dist`.
5. Pulsa **Deploy**.

## Contenido y progreso
El progreso se guarda en `localStorage` del navegador del dispositivo. No se sincroniza entre dispositivos ni usuarios.
El banco de preguntas de `src/data.js` contiene ejemplos didácticos iniciales, no un temario completo certificado. Revisa las traducciones y amplía el banco antes de usarlo como material académico definitivo.
