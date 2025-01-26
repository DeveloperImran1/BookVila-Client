import { Modal } from "antd";

const BookEditModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  showModal,
  book,
}) => {
  console.log("current book is", book);
  return (
    <>
      {/* modal for edit book  */}

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default BookEditModal;
