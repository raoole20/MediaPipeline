'use server';

/**
 * 
 * @param file Realmente es un file? o un blob? buena pregunta
 */
export async function uploadFile(file: File) {
    // Aquí puedes implementar la lógica para manejar el archivo en el servidor
    // Por ejemplo, guardarlo en una base de datos o en un sistema de archivos
    console.log(`Archivo recibido: ${file.name}, tamaño: ${file.size} bytes`);
}