import Sidebar from "@/components/profiles/Sidebar";

const layout = ({ children }) => {
  return (
    <div className="flex gap-2 md:gap-4 container bg-bg-gray py-8">
      <div className="w-[20%] hidden md:block">
        <Sidebar></Sidebar>
      </div>
      <div className="w-full md:w-[80%] bg-white">{children}</div>
    </div>
  );
};

export default layout;
