import Image from "next/image";
import Link from "next/link";

const PublicationCard = ({ publisher }) => {
  return (
    <div className="rounded-md border-2 p-2 md:p-3 lg:p-4 w-full min-h-[230px]  space-y-3 bg-white flex flex-col justify-between">
      <figure className="flex justify-center items-center">
        <Image
          src={
            publisher?.photo ||
            "https://pathokpoint.com/_next/image?url=%2Fdefault%2Fpublisher.png&w=1920&q=75"
          }
          alt={publisher?.name?.[1]}
          width={200}
          height={200}
          className="rounded-lg  h-[150px] md:h-[180px] lg:h-[210px] w-[140px] md:w-[170px] lg:w-[200px]"
        />
      </figure>
      <h1 className="text-center">
        <Link
          href={`/publisher/${publisher?._id}`}
          className="text-center text-sm w-full font-semibold text-gray-700 hover:underline"
        >
          {publisher?.name?.[1]}
        </Link>
      </h1>
    </div>
  );
};

export default PublicationCard;
