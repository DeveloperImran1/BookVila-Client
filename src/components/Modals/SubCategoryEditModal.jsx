import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const SubCategoryEditModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  showModal,
  editSubCategory,
  refetch,
}) => {
  console.log("current editSubCategory is", editSubCategory);

  const axiosPublic = useAxiosPublic();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    subCategoryBangla: "",
    subCategoryEnglish: "",
    subCategoryBanglish: "",
  });

  useEffect(() => {
    if (editSubCategory) {
      setFormData({
        subCategoryBangla: editSubCategory?.bengali || "",
        subCategoryEnglish: editSubCategory?.english || "",
        subCategoryBanglish: editSubCategory?.banglish || "",
      });
    }
  }, [editSubCategory]); // Run whenever the `book` object changes

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    // Create a new FormData instance from the form element
    const formData = new FormData(e.target);
    // Initialize an empty object to hold the form data
    const formDataObject = {};

    // Iterate over the FormData entries
    formData.forEach((value, key) => {
      if (formDataObject[key]) {
        formDataObject[key] = value;
      } else {
        formDataObject[key] = value; // Assign value to the key
      }
    });

    const subCategoryData = {
      bengali: formDataObject?.subCategoryBangla,
      english: formDataObject?.subCategoryEnglish,
      banglish: formDataObject?.subCategoryBanglish,
    };
    console.log(subCategoryData);
    try {
      const res = await axiosPublic.put(
        `/updateSubCategory/${editSubCategory?._id}`,
        subCategoryData
      );
      console.log(res);
      if (res?.status) {
        setLoading(false);
        refetch();
        toast.success("Successfully updated 😍");
        e.target.reset;
      } else {
        setLoading(false);
        toast.error("Something went wrong 😢");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong 😢");
    }
  };

  return (
    <>
      {/* modal for edit book  */}

      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="bg-white p-4 ">
          <p className="text-[17px] font-semibold mb-6">
            Edit This Sub Category
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 text-sm text-zinc-700 ">
              <label className="block font-medium">{`Sub Category (Bangla)`}</label>
              <input
                className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
                name={`subCategoryBangla`}
                value={formData[`subCategoryBangla`]}
                onChange={handleChange}
                type="text"
                placeholder={editSubCategory?.bengali}
              />
            </div>
            <div className="space-y-2 text-sm text-zinc-700 ">
              <label className="block font-medium">{`Sub Category (English)`}</label>
              <input
                className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
                name={`subCategoryEnglish`}
                value={formData[`subCategoryEnglish`]}
                onChange={handleChange}
                type="text"
                placeholder={editSubCategory?.english}
              />
            </div>

            <div className="space-y-2 text-sm text-zinc-700 ">
              <label className="block font-medium">{`Sub Category (Banglish)`}</label>
              <input
                className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
                name={`subCategoryBanglish`}
                value={formData[`subCategoryBanglish`]}
                onChange={handleChange}
                type="text"
                placeholder={editSubCategory?.banglish}
              />
            </div>

            <div className="flex  justify-end">
              <button
                disabled={loading}
                type="submit"
                className={`bg-bg-blue hover:bg-[#4ed9c4]
                          text-white font-medium py-2 px-4 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 ${
                            loading && "cursor-not-allowed"
                          }`}
              >
                {loading ? (
                  <p className="flex flex-col justify-center items-center">
                    <TbFidgetSpinner
                      size={22}
                      className="text-white animate-spin "
                    ></TbFidgetSpinner>
                  </p>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SubCategoryEditModal;
