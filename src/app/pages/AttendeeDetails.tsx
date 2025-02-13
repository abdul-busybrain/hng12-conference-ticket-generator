// components/AttendeeDetails.tsx
import React, { useState } from "react";
import { Button, Upload, UploadFile, message } from "antd";
import type {
  RcFile,
  UploadProps,
  UploadChangeParam,
} from "antd/es/upload/interface";
import { InboxOutlined } from "@ant-design/icons";

interface AttendeeDetailsProps {
  onNext: (attendeeData: {
    name: string;
    email: string;
    photo: string;
    about: string;
  }) => void;
}

const AttendeeDetails: React.FC<AttendeeDetailsProps> = ({ onNext }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [about, setAbout] = useState<string>("");

  const handleNext = () => {
    onNext({ name, email, photo, about });
  };

  const beforeUpload = (file: RcFile): boolean => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info: UploadChangeParam<UploadFile>): void => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(info.file.originFileObj as RcFile);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    accept: "image/*",
    beforeUpload: beforeUpload,
    onChange: handleChange,
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-secondary text-text-light">
      <h2 className="text-lg font-semibold mb-4">Attendee Details</h2>

      {/* Upload Section */}
      <div className="mb-4">
        <Upload.Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.
          </p>
        </Upload.Dragger>
      </div>

      {/* Name Input */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* About Input */}
      <div className="mb-4">
        <label htmlFor="about" className="block text-sm font-bold mb-2">
          About the project
        </label>
        <textarea
          id="about"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </div>
      {/* Next Button */}
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleNext}
      >
        Get My Free Ticket
      </Button>
    </div>
  );
};

export default AttendeeDetails;
