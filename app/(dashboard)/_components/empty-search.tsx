import Image from "next/image";

export const EmptySearch = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center pt-20">
        <Image
            src="/empty-search.png"
            height={500}
            width={500}
            alt="Empty"

        />
        <h2 className="text-2xl font-semibold mt-6">
            No results found!
        </h2>
        <p className="text-muted-foreground text-sm mt-2">

            Try searching for something else
        </p>



        </div>
    );
};