# 📸 Estrategia de Almacenamiento de Imágenes (Simulando S3)

## 🏗️ Arquitectura

```
Usuario → REST API → RabbitMQ → Worker → Sistema de Archivos (simula S3)
```

## 📁 Estructura de Directorios

```
rest-api/
├── uploads/              # Imágenes originales (simula S3 bucket)
│   ├── {uuid}.jpg
│   ├── {uuid}.png
│   └── thumbnails/       # Imágenes redimensionadas
│       ├── thumb_{uuid}.jpg
│       └── thumb_{uuid}.png
```

## 🔄 Flujo de Procesamiento

### 1. **Upload (REST API)**

- Usuario sube imagen vía POST `/api/files`
- `FilesController` valida el archivo (tamaño, tipo)
- Emite evento `process_image` a RabbitMQ con el buffer del archivo

### 2. **Processing (Worker)**

El `WorkerService.fileManager()` realiza:

1. **Genera nombre único**: Usa UUID para evitar colisiones
2. **Guarda imagen original**: En `uploads/{uuid}.ext`
3. **Crea thumbnail**: Redimensiona a 200x200px usando Sharp
4. **Guarda thumbnail**: En `uploads/thumbnails/thumb_{uuid}.ext`
5. **Extrae metadata**: Dimensiones, formato, etc.
6. **Retorna resultado**: Con URLs simuladas de S3

### 3. **Resultado**

```json
{
  "success": true,
  "originalFile": {
    "filename": "abc123.jpg",
    "path": "C:/path/uploads/abc123.jpg",
    "size": 1024000,
    "mimetype": "image/jpeg"
  },
  "thumbnail": {
    "filename": "thumb_abc123.jpg",
    "path": "C:/path/uploads/thumbnails/thumb_abc123.jpg"
  },
  "metadata": {
    "width": 1920,
    "height": 1080,
    "format": "jpeg"
  },
  "urls": {
    "original": "/uploads/abc123.jpg",
    "thumbnail": "/uploads/thumbnails/thumb_abc123.jpg"
  }
}
```

## 🚀 Migración a S3 Real

Para migrar a AWS S3, solo necesitas:

1. **Instalar SDK**: `pnpm add @aws-sdk/client-s3`
2. **Reemplazar `fs.writeFile`** con `s3.putObject`
3. **Cambiar URLs** de locales a S3 URLs

```typescript
// Ejemplo con S3
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });

await s3.send(
  new PutObjectCommand({
    Bucket: 'my-bucket',
    Key: uniqueFileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  }),
);

// URL: https://my-bucket.s3.amazonaws.com/{uniqueFileName}
```

## 🔧 Configuración Actual

- **Librería de procesamiento**: `sharp` (rápida y eficiente)
- **Tamaño de thumbnail**: 200x200px (configurable)
- **Fit mode**: `cover` (recorta para mantener aspecto)
- **Almacenamiento**: Sistema de archivos local

## 📝 Próximos Pasos

1. ✅ Guardar metadata en base de datos
2. ✅ Implementar servicio para servir archivos estáticos
3. ✅ Agregar más tamaños de imágenes (small, medium, large)
4. ✅ Implementar limpieza de archivos antiguos
5. ✅ Migrar a S3 cuando sea necesario
