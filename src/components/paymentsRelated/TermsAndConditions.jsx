import Link from "next/link";

const TermsAndConditions = () => {
  return (
    <div className="py-8">
      <div className="container">
        <div className="terms-and-conditions  rounded-lg p-4 bg-white ">
          <h2 className="text-lg font-bold mb-4 text-zinc-800 ">শর্তাবলী</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-400 mb-4">
            নতুন বই আমাদের স্টকে না থাকলে প্রকাশনী থেকে সংগ্রহ করা হবে। কোন বই
            প্রিন্ট আউট হলে পাঠককে Messenger/WhatsApp/ফোন এর মাধ্যমে জানিয়ে দেয়া
            হবে।
          </p>
          <p className="text-sm text-zinc-700 dark:text-zinc-400 mb-4">
            পুরাতন বইয়ের ক্ষেত্রে প্যাকেজিং এর সময় বইগুলোর ছবি/ভিডিও পাঠিয়ে
            কন্ডিশন কনফার্ম করা হবে। বুকভিলা এ কোনো ছেঁড়া, পেইজ মিসিং/পাঠ অযোগ্য
            বই নেই। ছবি দেখে বইয়ের কোয়ালিটি সন্তোষজনক মনে না হলে:
          </p>
          <ul className="list-decimal list-inside mb-4 text-sm text-zinc-700 dark:text-zinc-400">
            <li>বই পরিবর্তন/ বাদ দেয়া যাবে,</li>
            <li>
              অর্ডার বাতিল করা যাবে। সেক্ষেত্রে ৩ কার্যদিবসের মধ্যে রিফান্ড করা
              হবে।
            </li>
            <li>
              বইয়ের কন্ডিশন দেখতে{" "}
              <Link
                target="_blank"
                className="hover:underline font-bold text-primary"
                href="https://m.me/bookvilaBD"
              >
                Messenger
              </Link>
              /{" "}
              <Link
                target="_blank"
                className="hover:underline font-bold text-primary"
                href="https://wa.me/message/XPWNEV3HUN6MO1"
              >
                WhatsApp
              </Link>{" "}
              এ অর্ডার আইডি ইনবক্স করুন।
            </li>
          </ul>
          <p className="text-sm text-zinc-700 dark:text-zinc-400 pb-6 lg:pb-8">
            পার্সেল কুরিয়ার করা হয়ে গেলে ডেলিভারি চার্জ রিফান্ড করা হবে না। তবে
            বিশেষ ক্ষেত্রে পাঠক পয়েন্ট পলিসি অনুযায়ী রিফান্ড করা যেতে পারে।
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
