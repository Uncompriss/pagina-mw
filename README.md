# MW Automotriz - propuesta web moderna

Proyecto creado en `C:\Users\usuario\Desktop\PAGINA MW`.

## Archivos

- `index.html`: estructura de la página.
- `styles.css`: diseño responsive, animaciones y estilo visual.
- `script.js`: menú móvil, animaciones, galería y agenda de citas.

## Agenda y correo

La agenda bloquea horarios ya seleccionados usando `localStorage`, útil para demostración en el navegador. El formulario envía la solicitud a `a.flores.aybar@gmail.com` usando FormSubmit cuando la página está publicada en internet.

Importante: para que todos los visitantes vean la misma disponibilidad real, se debe conectar un backend o base de datos compartida. Opciones gratuitas recomendadas:

- Netlify + Netlify Functions + Supabase.
- Vercel + Supabase.
- Firebase Hosting + Firestore.

## Publicación gratuita

Para publicar en GitHub Pages:

1. Crear un repositorio nuevo en GitHub.
2. Subir estos archivos.
3. Activar GitHub Pages desde `Settings > Pages`.
4. Seleccionar la rama `main` y carpeta raíz.

Para Netlify:

1. Entrar a Netlify.
2. Arrastrar esta carpeta al panel de deploy.
3. Copiar el enlace público generado.

## Galería

La sección de galería está lista con espacios de reemplazo. Cuando estén las fotos reales, se agregan o reemplazan los `src` de las imágenes en `index.html`.
