import styles from '../../styles/modules/form.module.css';

import { useForm } from '../../hooks/UseForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const Form = () => {
    const { formData, errors, loading, handleChange, handleSubmit, handleFileChange, showAlert } = useForm(
        {
            nombre: '',
            telefono: '+52',
            email: '',
            cv: null,
        },
        (success, data) => {
            if (success) {
                showAlert('Excelente', 'Datos enviados correctamente.<br>Pronto nos pondremos en contacto contigo.', 'success', '#9fc750');
            } else {
                showAlert('Ups', 'Hubo un error al enviar los datos.', 'error', '#1497ee');
            }
        }
    );

    return (
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.formText}>
                <h2 className="bold-text">Solicita Ahora</h2>
            </div>

            <div className={styles.camposObligatorios}>
                <p className="light-text">(*) Campos obligatorios</p>
            </div>

            {/* NOMBRE */}
            <div className={styles.campoPrecalificarForm}>
                <label htmlFor="nombre" className={`light-text ${errors.nombre ? styles.labelError : ''}`} aria-label="Nombre del usuario">
                    *Nombre Completo:
                </label>
                <input
                    type="text"
                    className={styles.formControl}
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.nombre}
                />
            </div>

            {/* TELEFONO */}
            <div className={styles.campoPrecalificarForm}>
                <label htmlFor="telefono" className={`light-text ${errors.telefono ? styles.labelError : ''}`} aria-label="Telefono del usuario">
                    *Teléfono:
                </label>
                <input
                    type="tel"
                    className={styles.formControl}
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    autoComplete="tel-national"
                    required
                    aria-invalid={!!errors.telefono}
                    maxLength="13"
                />
            </div>

            {/* EMAIL */}
            <div className={styles.campoPrecalificarForm}>
                <label htmlFor="email" className={`light-text ${errors.email ? styles.labelError : ''}`} aria-label="email del usuario">
                    *Correo Electrónico :
                </label>
                <input
                    type="text"
                    className={styles.formControl}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    aria-invalid={!!errors.email}
                />
            </div>

            {/* CV */}
            <div className={styles.campoPrecalificarForm}>
                <label htmlFor="cv" className={`light-text ${errors.cv ? styles.labelError : ''}`} aria-label="Curriculum del usuario">
                    Curriculum (opcional):
                </label>
                <input
                    type="file"
                    className={styles.formControl}
                    id="cv"
                    name="cv"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    aria-invalid={!!errors.cv}
                />
            </div>

            {/* BOTON ENVIAR */}
            <div className={styles.contentEnvio}>
                <button type="submit" className="boton-1 bold-text" title="Haz clic para enviarnos tus datos" disabled={loading}>
                    {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'ENVIAR SOLICITUD'}
                </button>
            </div>

            {Object.keys(errors).length > 0 && (
                <div className={styles.mensajeErrorGeneral}>
                    <p className="bold-text">Por favor completa el formulario</p>
                </div>
            )}
        </form>
    );
};
