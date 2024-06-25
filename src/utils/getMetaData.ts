import type { Metadata } from "next";

const baseUrl = process.env.PRODUCTION_URL
    ? `https://${process.env.PRODUCTION_URL}`
    : `http://localhost:${process.env.LOCAL_PORT || 3000}`;
const titleTemplate = "%s | Test dApp by daningyn";

export const getMetadata = ({
    title,
    description,
    imageRelativePath,
}: {
    title: string;
    description: string;
    imageRelativePath?: string;
}): Metadata => {
    const imageUrl = `${baseUrl}${imageRelativePath}`;

    return {
        metadataBase: new URL(baseUrl),
        title: {
            default: title,
            template: titleTemplate,
        },
        description: description,
        openGraph: {
            title: {
                default: title,
                template: titleTemplate,
            },
            description: description,
            images: [
                {
                    url: imageUrl,
                },
            ],
        },
        twitter: {
            title: {
                default: title,
                template: titleTemplate,
            },
            description: description,
            images: [imageUrl],
        },
        icons: {
            icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
        },
    };
};
