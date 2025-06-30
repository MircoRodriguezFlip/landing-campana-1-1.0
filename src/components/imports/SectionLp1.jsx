import styles from '../../styles/modules/sectionLp1.module.css';

import img1Section from '../../assets/images/img-section-lp-1.webp';

import { Form } from './Form';

export const SectionLp1 = () => {
    return (
        <section className={styles.sectionContainer}>
            <div className={styles.sectionContenido1}>
                <img src={img1Section} alt="Empleada feliz de un Call Center" />

                <div className={styles.sectionTexto}>
                    <h1 className="bold-text">¿ERES DE NUEVO LEÓN?</h1>
                    <h2 className="light-text">¡Únete a nuestro equipo!</h2>

                    <h3 className="bold-text">Agendador(a) Telefónico</h3>

                    <p className="light-text">
                        Estamos buscando un Agendador(a) Telefónico con muchas ganas de crecer y formar parte de un equipo exitoso. Si tu eres una
                        persona comunicativa, proactiva y te apasiona el mundo de las ventas, ¡te estamos esperando!
                    </p>

                    <h3 className="bold-text">Requisitos</h3>

                    <ul className="light-text">
                        <li>Experiencia mínima en call center / agendar citas / prosécción</li>
                        <li>Actitud positiva y proactiva</li>
                        <li>Disponibilidad inmediata</li>
                    </ul>
                </div>
            </div>

            <div className={styles.form}>
                <Form />
            </div>
        </section>
    );
};
