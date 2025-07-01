const axios = require('axios');
const cloudinary = require('cloudinary').v2;

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Subida a Cloudinary (desde buffer)
const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'formularios',
                resource_type: 'auto',
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );

        stream.end(file.buffer);
    });
};

exports.handleFormSubmit = async (req, res) => {
    const { nombre, telefono, email } = req.body;
    const cv = req.file;

    try {
        let fileUrl = null;

        if (cv) {
            const allowedFormats = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'image/jpeg',
                'image/png',
            ];
            const maxSize = 2 * 1024 * 1024;

            if (!allowedFormats.includes(cv.mimetype)) {
                return res.status(400).json({ message: 'Formato de archivo no permitido. Usa PDF, Word o imágenes (JPEG/PNG).' });
            }

            if (cv.size > maxSize) {
                return res.status(400).json({ message: 'El archivo es demasiado grande. Máximo 2 MB.' });
            }

            // Subir a Cloudinary
            fileUrl = await uploadToCloudinary(cv);
        }

        // Enviar a Airtable
        await axios.post(
            `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`,
            {
                fields: {
                    name: nombre,
                    phone: telefono,
                    email,
                    cv: fileUrl ? [{ url: fileUrl }] : [],
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json({ message: 'Datos enviados correctamente.' });
    } catch (error) {
        console.error('Error al procesar el formulario:', error.message);
        res.status(500).json({ message: 'Hubo un problema al procesar el formulario.' });
    }
};
