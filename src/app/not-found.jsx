// pages/404.js
import Link from 'next/link';
import Image from 'next/image';

export default function Custom404() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-4">
      <title>Page Not Found</title>
      <Image
        src="https://i.postimg.cc/T1ksTbhv/Screenshot-7-removebg-preview.png"
        alt="404 gif"
        width={400}
        height={400}
        className="mb-4 mx:h-[300px] mx:w-[400px] "
      />
      <h1 className="text-4xl font-bold mb-4">
        Whoops, Page Not Found😒
      </h1>
      <Link href="/"
        className="px-6 py-3 text-lg bg-bg-blue text-white rounded-lg hover:bg-bg-blue transition">
        Go to Homepage
      </Link>
    </div>
  );
}
