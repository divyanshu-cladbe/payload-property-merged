import { Metadata, ResolvingMetadata } from "next";
import { getPropertyByIdAction } from "@/actions/properties";
import { Suspense } from "react";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;

    try {
        const property = await getPropertyByIdAction(id);
        if (!property) throw new Error("Property not found");

        const previousImages = (await parent).openGraph?.images || [];

        return {
            title: `${property.title} | Property.new`,
            description: property.description || `Check out this property in ${property.city}`,
            openGraph: {
                title: property.title,
                description: property.description,
                images: [
                    ...(property.images?.[0] ? [property.images[0]] : []),
                    ...previousImages,
                ],
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: property.title,
                description: property.description,
                images: property.images?.[0] ? [property.images[0]] : [],
            },
        };
    } catch (error) {
        console.error("Error fetching property metadata:", error);
        return {
            title: "Property Details | Property.new",
            description: "View property details on Property.new",
        };
    }
}

export default function PropertyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // Suspense is important here because page.tsx will use useSearchParams()
        // This prevents the entire route from being de-optimized to client-side rendering
        <Suspense fallback={null}>
            {children}
        </Suspense>
    );
}