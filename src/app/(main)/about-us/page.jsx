import Image from "next/image";

const AboutUs = () => {
  const faqData = [
    {
      question: "বুকভিলার বইগুলো কী অবস্থায় থাকে?",
      answer:
        "আমরা নতুন, পুরোনো এবং আমদানিকৃত বই সরবরাহ করি। পুরোনো বইয়ের ক্ষেত্রে আমরা ছবি ও ভিডিও প্রিভিউ দিয়ে বইয়ের অবস্থা সম্পর্কে নিশ্চিত করি।",
    },
    {
      question: "কীভাবে বুকভিলার বই অর্ডার করব?",
      answer:
        "আমাদের ওয়েবসাইটে গিয়ে আপনার পছন্দের বইটি নির্বাচন করুন, তারপর 'অর্ডার করুন' বোতামে ক্লিক করে প্রক্রিয়া সম্পূর্ণ করুন।",
    },
    {
      question: "বুকভিলার বইগুলো কবে ডেলিভারি করা হয়?",
      answer:
        "আমরা ঢাকা শহরের ভেতরে ২-৩ কার্যদিবসের মধ্যে এবং ঢাকার বাইরে ৪-৫ কার্যদিবসের মধ্যে বই ডেলিভারি করি।",
    },
    {
      question: "ডেলিভারি চার্জ কীভাবে নির্ধারিত হয়?",
      answer:
        "ডেলিভারি চার্জ বইয়ের ওজন এবং গন্তব্যস্থলের উপর নির্ভর করে। চেকআউটের সময় ডেলিভারি চার্জ দেখানো হবে।",
    },
    {
      question:
        "অর্ডার দেওয়ার পর আমি কীভাবে অর্ডার স্ট্যাটাস ট্র্যাক করতে পারি?",
      answer:
        "অর্ডার দেওয়ার পর একটি ট্র্যাকিং আইডি দেওয়া হবে, যা দিয়ে আপনি ওয়েবসাইটে গিয়ে অর্ডার ট্র্যাক করতে পারবেন।",
    },
    {
      question: "বুকভিলায় বই ফেরত দেওয়া যাবে কি?",
      answer:
        "যদি আপনার অর্ডারকৃত বইটি ক্ষতিগ্রস্ত বা ভুল হয়, তাহলে আমাদের সাথে যোগাযোগ করে ৭ দিনের মধ্যে রিটার্ন করতে পারবেন।",
    },
    {
      question: "কীভাবে বুকভিলার সাথে যোগাযোগ করব?",
      answer:
        "আপনি আমাদের ওয়েবসাইটের 'যোগাযোগ করুন' পেজ থেকে বা সরাসরি আমাদের হটলাইনে কল করে যোগাযোগ করতে পারেন।",
    },
    {
      question: "বুকভিলার পেমেন্ট অপশনগুলো কী কী?",
      answer:
        "আমরা বিকাশ, নগদ, রকেট, এবং ক্যাশ অন ডেলিভারি সহ বিভিন্ন পেমেন্ট অপশন অফার করি।",
    },
    {
      question: "আমি পুরোনো বই বিক্রি করতে চাই, এটি কীভাবে সম্ভব?",
      answer:
        "আপনি আমাদের 'বই বিক্রি করুন' সেকশনে গিয়ে বইয়ের তথ্য দিয়ে সাবমিট করতে পারেন। আমরা আপনার সাথে যোগাযোগ করব।",
    },
    {
      question: "বুকভিলার বিশেষ অফার বা ডিসকাউন্টের খবর কীভাবে জানতে পারি?",
      answer:
        "বিশেষ অফার এবং ডিসকাউন্ট সম্পর্কে জানতে আমাদের নিউজলেটারে সাবস্ক্রাইব করুন অথবা সোশ্যাল মিডিয়া ফলো করুন।",
    },
  ];

  return (
    <section>
      <div className="bg-bg-gray">
        <section
          className="min-h-[500px] max-h-[800px] w-full relative bg-no-repeat bg-cover bg-center text-white"
          style={{
            backgroundImage:
              "url('https://i.postimg.cc/hjzcgJcs/araix-rand-Xe46k-NRh-Xs-A-unsplash.jpg')",
          }}
        >
          {/* <!-- Background Overlay --> */}
          <div className="h-full w-full bg-gradient-to-b from-black to-[#707779] opacity-60 absolute"></div>

          {/* <!-- Centered Content --> */}
          <div className="h-full w-full absolute flex flex-col items-center justify-center text-center px-4">
            {/* <!-- Icons --> */}
            <h3 className="text-center   px-4 md:px-6 py-1 md:text-base text-[25px]   text-white flex justify-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 256 256"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M244,128v56a12,12,0,0,1-12,12H128a12,12,0,0,1-12-12V84H36v44a12,12,0,0,1-24,0V72A12,12,0,0,1,24,60H128a12,12,0,0,1,12,12V172h80V128a12,12,0,0,1,24,0Z"></path>
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 256 256"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M244,128v56a12,12,0,0,1-12,12H128a12,12,0,0,1-12-12V84H36v44a12,12,0,0,1-24,0V72A12,12,0,0,1,24,60H128a12,12,0,0,1,12,12V172h80V128a12,12,0,0,1,24,0Z"></path>
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 256 256"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M244,128v56a12,12,0,0,1-12,12H128a12,12,0,0,1-12-12V84H36v44a12,12,0,0,1-24,0V72A12,12,0,0,1,24,60H128a12,12,0,0,1,12,12V172h80V128a12,12,0,0,1,24,0Z"></path>
              </svg>
            </h3>

            {/* <!-- Title --> */}
            <p className="text-3xl md:text-4xl lg:text-5xl font-semibold lg:font-bold mb-3 md:mb-4 lg:mb-6">
              বইয়ের সাথে স্বপ্ন বোনা
            </p>

            {/* <!-- Description --> */}
            <p className="max-w-3xl text-base md:text-[17px] lg:text-[18px] ">
              বুকভিলা শুরু হয়েছিল একটি সাধারণ চিন্তা থেকে—ছাত্রছাত্রীদের জন্য
              বই যেন সহজলভ্য হয়। কোভিড-১৯ এর সময়, এক কাপ চায়ের আড্ডায় স্বপ্ন
              দেখা শুরু—একটি প্ল্যাটফর্ম তৈরির, যেখানে নতুন এবং পুরোনো বই
              সাশ্রয়ী দামে পৌঁছে যাবে সবার হাতে। <br />
              <br />
              আজ সেই স্বপ্ন বাস্তব। বুকভিলায় আপনি পাবেন পুরোনো বই, নতুন বই এবং
              আমদানিকৃত মূল বই, বাংলাদেশের সেরা দামে। প্রথমবারের মতো, আমরা
              বইয়ের অবস্থা দেখানোর জন্য ভিডিও প্রিভিউও দিচ্ছি। <br />
              <br />
              প্রতিটি বই নিয়ে আসে অতীতের গল্প—পূর্ববর্তী পাঠকদের স্মৃতি আর
              ভালোবাসা। আমাদের লক্ষ্য একটাই, আপনার পড়ার যাত্রা সহজ করা। বুকভিলা
              আপনাদের পাশে, প্রতিটি পৃষ্ঠায়।
            </p>
          </div>
        </section>

        <section className="container ">
          <div className="bg-white mt-3 md:mt-5 lg:mt-8 flex flex-col-reverse md:flex-row justify-between">
            <section className=" md:max-w-[50%]  text-gray-800">
              <div className="container flex flex-col justify-center px-2 md:px-3 lg:px-4 py-3 md:py-5 lg:py-8 mx-auto ">
                <h2 className="text-2xl font-semibold sm:text-4xl">
                  আপনার প্রশ্নের উত্তর
                </h2>
                <p className="mt-4 mb-8 text-gray-600">
                  বই কেনা, বিক্রি, ডেলিভারি এবং আরও অনেক কিছু নিয়ে আপনার সাধারণ
                  প্রশ্নের সহজ সমাধান।
                </p>
                <div className="space-y-4">
                  {faqData?.map((faq) => (
                    <>
                      <details className="w-full border rounded-lg">
                        <summary className="px-2 md:px-3 lg:px-4 py-3 md:py-4 lg:py-6 focus:outline-none focus-visible:dark:ring-violet-600">
                          {faq?.question}
                        </summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 ">
                          {faq?.answer}
                        </p>
                      </details>
                    </>
                  ))}
                </div>
              </div>
            </section>
            <div>
              <Image
                height={1200}
                width={1200}
                className="w-[100%] md:h-[500px]"
                src="https://i.postimg.cc/GhJDN0Vt/faq-frequently-asked-questions-concept-people-ask-questions-and-receive-answers-support-center-illus.png"
                alt="paq image"
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AboutUs;
