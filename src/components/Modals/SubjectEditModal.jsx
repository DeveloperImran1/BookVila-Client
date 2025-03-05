import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const SubjectEditModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  showModal,
  editSubject,
  refetch,
}) => {
  console.log("current editSubject is", editSubject);

  const axiosPublic = useAxiosPublic();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    subjectBangla: "",
    subjectEnglish: "",
    subjectBanglish: "",
  });

  useEffect(() => {
    if (editSubject) {
      setFormData({
        subjectBangla: editSubject?.bengali || "",
        subjectEnglish: editSubject?.english || "",
        subjectBanglish: editSubject?.banglish || "",
      });
    }
  }, [editSubject]); // Run whenever the `book` object changes

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

    const subjectData = {
      bengali: formDataObject?.subjectBangla,
      english: formDataObject?.subjectEnglish,
      banglish: formDataObject?.subjectBanglish,
    };
    console.log(subjectData);
    try {
      const res = await axiosPublic.put(
        `/updateSubject/${editSubject?._id}`,
        subjectData
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
          <p className="text-[17px] font-semibold mb-6">Edit This Subject</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 text-sm text-zinc-700 ">
              <label className="block font-medium">{`Subject (Bangla)`}</label>
              <input
                className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
                name={`subjectBangla`}
                value={formData[`subjectBangla`]}
                onChange={handleChange}
                type="text"
                placeholder={editSubject?.bengali}
              />
            </div>
            <div className="space-y-2 text-sm text-zinc-700 ">
              <label className="block font-medium">{`Subject (English)`}</label>
              <input
                className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
                name={`subjectEnglish`}
                value={formData[`subjectEnglish`]}
                onChange={handleChange}
                type="text"
                placeholder={editSubject?.english}
              />
            </div>

            <div className="space-y-2 text-sm text-zinc-700 ">
              <label className="block font-medium">{`Subject (Banglish)`}</label>
              <input
                className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
                name={`subjectBanglish`}
                value={formData[`subjectBanglish`]}
                onChange={handleChange}
                type="text"
                placeholder={editSubject?.banglish}
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

export default SubjectEditModal;
