import Image from "next/image";

export const Loading = () => {

return (

    <div className="h-full w-full flex flex-col justify-center items-center">

      <Image
        src="/logo4.png"
        alt="Logo"
        width={130}
        height={130}
        className="animate-pulse duration-700"
      />

    </div>
);


};


