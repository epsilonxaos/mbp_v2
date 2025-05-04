import { usePage } from '@inertiajs/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { APP_URL_STORAGE } from '@/constants/app';
import WebLayout from '@/layouts/web-layout';
import Footer from '@/modules/footer';
import { EffectCreative, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

type PortfolioGallery = {
    created_at: string;
    id: number;
    image_path: string;
    portfolio_id: number;
    updated_at: string;
};
type Portfolio = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    content: string | null;
    created_at: string;
    updated_at: string;
    galleries: PortfolioGallery[] | null;
};

type PageProps = {
    portfolios: Portfolio[];
    [key: string]: unknown;
};

export default function Index() {
    const { portfolios } = usePage<PageProps>().props;
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <WebLayout title="Home">
            <div className="hidden md:block md:h-svh">
                <Swiper
                    modules={[Navigation, EffectCreative]}
                    speed={1500}
                    navigation={{}}
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: ['-20%', 0, -1],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    }}
                    grabCursor={true}
                    effect={'creative'}
                    className="swiper-portafolio h-dvh"
                >
                    {portfolios.map((item) => {
                        if (!item.galleries) return null;

                        return item.galleries.map((x) => (
                            <SwiperSlide key={x.id}>
                                <img src={APP_URL_STORAGE + x.image_path} alt={item.name} className="h-dvh w-full object-cover" />
                            </SwiperSlide>
                        ));
                    })}
                </Swiper>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
                {portfolios.map((item) => {
                    if (!item.galleries) return null;

                    return item.galleries.map((x) => (
                        <button key={x.id} onClick={handleOpen}>
                            <img src={APP_URL_STORAGE + x.image_path} alt={item.name} className="aspect-video w-full object-cover" />
                        </button>
                    ));
                })}
            </div>

            <Footer />
            <LightBoxGallery portfolios={portfolios} open={open} handleClose={handleClose} />
        </WebLayout>
    );
}

const LightBoxGallery = ({ portfolios = [], open, handleClose }: { portfolios: Portfolio[]; open: boolean; handleClose: () => void }) => {
    const slides = useMemo(() => {
        const allSlides = portfolios.flatMap((item) => {
            if (!item.galleries) return [];

            return item.galleries.map((x) => ({
                src: APP_URL_STORAGE + x.image_path,
                alt: item.name,
                title: item.name,
            }));
        });
        return allSlides.map((slide, index) => ({ ...slide, id: index }));
    }, [portfolios]);

    return <Lightbox styles={{ root: { '--yarl__color_backdrop': 'rgba(0, 0, 0, .6)' } }} open={open} close={handleClose} slides={slides} />;
};
