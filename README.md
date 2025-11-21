#  AI Photo Booth - Versión Web

<div align="center">

![AI Photo Booth](https://img.shields.io/badge/AI-Photo%20Booth-purple?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Made with Love](https://img.shields.io/badge/Made%20with--red?style=for-the-badge)

**Cabina fotográfica con inteligencia artificial para navegadores web**

Transforma tus fotos con IA usando Google Gemini 2.5 Flash Image  
Compatible con cualquier dispositivo con cámara web

[Demo](#instalación)  [Documentación](#características)  [Reportar Bug](https://github.com/matecode/ai-photo-booth-web/issues)

</div>

---

##  Seguridad de API Keys

 **IMPORTANTE**: Este proyecto requiere API keys que **NO deben** estar en el código público.

### Configuración Segura

1. **Copia el archivo de ejemplo:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edita `.env.local` con tus claves:**
   ```env
   GEMINI_API_KEY=tu_clave_real_aqui
   IMGBB_API_KEY=tu_clave_opcional_aqui
   ```

3. **¡NUNCA subas `.env.local` a Git!** (Ya está en `.gitignore`)

### Obtener API Keys

- **Google Gemini**: https://ai.google.dev/ (Gratis con límites)
- **ImgBB**: https://api.imgbb.com/ (Opcional, incluye key pública de respaldo)

---

##  Características

###  8 Escenarios Preconfigurados

-  **Con Messi** - Selfie con el mejor jugador del mundo
-  **Con Taylor Swift** - En el Eras Tour
-  **Elvis Presley** - Retro en Las Vegas
-  **Con Trump** - En la Casa Blanca
-  **Harry Potter** - Magia en Hogwarts
-  **Darth Vader** - Star Wars épico
-  **Se Busca** - Póster del Lejano Oeste
-  **Astronautas** - Misión a Marte

###  6 Estilos Artísticos

-  **Fotorealista** - Ultra realista y detallado
-  **Cómic** - Estilo viñeta de cómic
-  **Anime** - Estilo japonés colorido
-  **Óleo** - Pintura clásica artística
-  **Cyberpunk** - Neón futurista
-  **3D Cartoon** - Animación 3D Pixar

###  Funcionalidades

-  **Cámara web integrada**
-  **Upload de archivos**
-  **Descarga directa de imágenes**
-  **Código QR para compartir**
-  **UI moderna y responsiva**
-  **Deploy a Netlify fácil**

---

##  Instalación

### Requisitos

- Node.js v18+
- npm v9+
- API Key de Google Gemini

### Instalación Local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar API Keys (¡IMPORTANTE!)
cp .env.example .env.local
# Editar .env.local con tus claves reales

# 3. Ejecutar en desarrollo
npm run dev
```

La app estará en: http://localhost:3000

---

##  Deploy a Netlify

### Método 1: Desde la UI de Netlify

1. Sube el repo a GitHub
2. Conecta Netlify con tu repositorio
3. **Configura las variables de entorno en Netlify:**
   - `GEMINI_API_KEY` = tu_clave_gemini
   - `IMGBB_API_KEY` = tu_clave_imgbb (opcional)
4. Build command: `npm run build`
5. Publish directory: `dist`

### Método 2: CLI de Netlify

```bash
npm run build
netlify deploy --prod
```

###  Variables de Entorno en Netlify

**Site Settings  Environment Variables:**

```
GEMINI_API_KEY = AIza...tu_clave
IMGBB_API_KEY = opcional
```

---

##  Tecnologías

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **React** | 19.2.0 | UI Framework |
| **TypeScript** | 5.8.2 | Type safety |
| **Vite** | 6.2.0 | Build tool |
| **Google Gemini AI** | 2.5 Flash | Image generation |
| **Tailwind CSS** | - | Styling (CDN) |
| **ImgBB API** | - | Image hosting |

---

##  Autor

<div align="center">

###  Hecho con amor por **Mate Code**

**Fecha de creación:** Noviembre 2025  
**Última actualización:** 21 de Noviembre de 2025

</div>

---

##  Licencia

MIT License - Copyright (c) 2025 Mate Code

---

##  Soporte

¿Problemas con las API keys o la configuración?

-  [Reportar Bug](https://github.com/matecode/ai-photo-booth-web/issues)
-  [Solicitar Feature](https://github.com/matecode/ai-photo-booth-web/issues/new)

---

<div align="center">

** Si te gusta este proyecto, dale una estrella en GitHub **

Made with  by Mate Code |  2025

</div>
