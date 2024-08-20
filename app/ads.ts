import imageOne from './assets/img1.jpg'


// Define the type for the ad objects
export interface Ad {
    id: number;
    image: string;
    alt: string;
}

// Export the ads array
export const ads: Ad[] = [
    {
        id: 1,
        image: imageOne.src, // Directly assign the imported image
        alt: 'Hertz',
    },
];