import WebLayout from '@/layouts/web-layout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function About() {
    const { i18n } = useTranslation();

    return <WebLayout title="About Us">{i18n.language === 'es' ? <AboutUsEspComponent /> : <AboutUsEngComponent />}</WebLayout>;
}

const ContactComponent = () => {
    return (
        <>
            <p className="mb-4">
                +52 (55) 7970 2503 <span className="px-2"> | </span> 52 (99) 9903 1257 <span className="px-2"> | </span> +52 (99) 9198 2235
            </p>
            <p className="font-bold">
                <a
                    href="https://www.instagram.com/madeby.partners/?hl=es"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'underline' }}
                >
                    Instagram
                </a>
            </p>
            <p className="mb-6 pb-6 font-bold">
                <a href="mailto:work@madeby.partners" style={{ textDecoration: 'underline' }}>
                    work@madeby.partners
                </a>
            </p>
            <hr />
        </>
    );
};

const TimeComponent = () => {
    const [hora, setHora] = useState('');
    const [fecha, setFecha] = useState('');

    useEffect(() => {
        function setHoras() {
            const today = new Date();
            const hr = `${today.getHours().toString().padStart(2, '0')}:${today
                .getMinutes()
                .toString()
                .padStart(2, '0')}:${today.getSeconds().toString().padStart(2, '0')} hrs.`;
            const options: Intl.DateTimeFormatOptions = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            };
            const fe = today.toLocaleDateString('es-MX', options);
            setHora(hr);
            setFecha(capitalize(fe));
        }
        setHoras();
        const interval = setInterval(setHoras, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <h6 className="mb-0 pt-6 font-bold">{hora}</h6>
            <p className="mb-0 font-bold">{fecha}</p>
            <p className="mb-6">Time in Ciudad de México</p>
            <p className="mb-0">Av. Líbano #101, Col. México Norte. 97128.</p>
            <p className="mb-6">Mérida, Yucatán, México.</p>
        </>
    );
};

const AboutUsEngComponent = () => {
    return (
        <div className="container mx-auto grid max-w-[950px] gap-1 px-6 pt-[130px] pb-12 text-center text-[12px] font-normal">
            <p className="mb-4">Beyond a brand.</p>
            <p className="mb-4">
                We don’t believe in the creation of brands, we believe in individuals with fundamental qualities who know and recognize the
                collaborative effort to develop and transmit value through concepts and identities, with the aim of generating authentic experiences
                for society.
            </p>
            <p className="mb-4 pb-6">
                We dive into the depths of the past and the present, to jointly design a real and ideal future for our clients and collaborators.{' '}
                <br />
                We are not just a brand, we are an ideology that we build every day as a tribute to what we consider the path to the true growth of
                humanity.
            </p>
            <hr />
            <h6 className="mb-6 pt-6 font-bold">ALL SERVICES</h6>
            <p className="mb-4 pb-6">
                Brand consulting <span className="px-2"> | </span> Verbal identity <span className="px-2"> | </span> Concept &amp; naming{' '}
                <span className="px-2"> | </span> Graphic identity <span className="px-2"> | </span> Text development{' '}
                <span className="px-2"> | </span> Illustration <span className="px-2"> | </span> Packaging design <span className="px-2"> | </span>
                Editorial design <span className="px-2"> | </span> Animation<span className="px-2"> | </span> Web design &amp; development{' '}
                <span className="px-2"> | </span> Interactive design <span className="px-2"> | </span> Art Direction <span className="px-2"> | </span>{' '}
                Creative Direction <span className="px-2"> | </span> Audiovisual content
            </p>
            <hr />
            <h6 className="mb-6 pt-6 font-bold">LET’S BECOME PARTNERS</h6>

            <ContactComponent />
            <TimeComponent />

            <h6 className="pt-6 font-bold">® {new Date().getFullYear()} MADEBYPARTNERS</h6>
            <p className="text-[11px]">
                All content on this website, including text, graphics, logos, photographs, audio and video clips and data compilations is the property
                of MadebyPartners® or its collaborators, and protected by the Mexican Institute of Industrial Property laws. The compilation of all
                content on this site is the exclusive property of MadebyPartners®, their clients and collaborators.
            </p>
        </div>
    );
};

const AboutUsEspComponent = () => {
    return (
        <div className="container mx-auto grid max-w-[950px] gap-1 px-6 pt-[130px] pb-12 text-center text-[12px] font-normal">
            <p className="mb-4">Más allá de una marca.</p>
            <p className="mb-4">
                No creemos en la creación de marcas, creemos en individuos con cualidades fundamentales que conocen y reconocen el potencial del
                esfuerzo colaborativo para desarrollar y transmitir valor a través de conceptos e identidades, con el objetivo de generar experiencias
                auténticas para la sociedad.
            </p>

            <p className="mb-4 pb-6">
                Nos sumergimos hasta lo más profundo del pasado y del presente, para diseñar en conjunto, un futuro real e ideal para nuestros
                clientes y colaboradores. No somos sólo una marca, somos una ideología que construimos todos los días como homenaje a lo que
                consideramos el camino para el verdadero crecimiento como humanidad.
            </p>

            <hr />

            <h6 className="mb-6 pt-6 font-bold">NUESTROS SERVICIOS</h6>
            <p className="mb-4 pb-6">
                Consultoría de marca <span className="px-2"> | </span> Identidad verbal <span className="px-2"> | </span> Concept / Naming{' '}
                <span className="px-2"> | </span> Identidad gráfica <span className="px-2"> | </span>Desarrollo de textos{' '}
                <span className="px-2"> | </span> Ilustración <span className="px-2"> | </span> Diseño de empaque <span className="px-2"> | </span>{' '}
                Diseño editorial <span className="px-2"> | </span> Animación <span className="px-2"> | </span> Diseño y desarrollo web{' '}
                <span className="px-2"> | </span> Diseño interactivo <span className="px-2"> | </span> Dirección de arte{' '}
                <span className="px-2"> | </span> Dirección creativa <span className="px-2"> | </span> Contenido audiovisual
            </p>

            <hr />

            <h6 className="mb-6 pt-6 font-bold">NOS GUSTARÍA SER TUS PARTNERS</h6>
            <ContactComponent />
            <TimeComponent />
            <h6 className="pt-6 font-bold">® {new Date().getFullYear()} MADEBYPARTNERS</h6>
            <p className="text-[11px]">
                Todo el contenido de este sitio web, incluidos textos, gráficos, logotipos, fotografías, clips de audio y video y compilaciones de
                datos, es propiedad de MadebyPartners® o sus colaboradores de contenido, y está protegido por las leyes del Instituto Mexicano de la
                Propiedad Industrial. La compilación de todo el contenido de este sitio es propiedad exclusiva de MadebyPartners®, sus clientes y
                colaboradores.
            </p>
        </div>
    );
};
