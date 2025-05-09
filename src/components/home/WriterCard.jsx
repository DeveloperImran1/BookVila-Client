import Image from "next/image";
import Link from "next/link";

const WriterCard = ({ writer }) => {
  return (
    <Link
      href={`/writer/${writer?.authorID}`}
      className=" rounded-md border-2 p-2 md:p-3 lg:p-4 w-full min-h-[230px]  space-y-3 bg-white flex flex-col justify-between"
    >
      <figure className="flex justify-center items-center">
        <Image
          src={writer?.photo}
          alt={writer?.name[1]}
          width={200}
          height={200}
          className="rounded-lg object-cover h-[150px] md:h-[180px] lg:h-[210px] w-[140px] md:w-[170px] lg:w-[200px] "
        />
      </figure>
      <h1 className="text-center">
        <p className="text-center text-sm w-full font-medium text-gray-700 hover:underline">
          {writer.name[1]}
        </p>
      </h1>
    </Link>
  );
};

export default WriterCard;
