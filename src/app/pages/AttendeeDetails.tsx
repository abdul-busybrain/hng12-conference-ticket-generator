"use client";

import type React from "react";
import { useState } from "react";
import { Upload, message } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload/interface";
import Image from "next/image";

interface AttendeeDetailsProps {
  onNext: (attendeeData: {
    name: string;
    email: string;
    photo: string;
    about: string;
  }) => void;
  onBack: () => void;
}

const AttendeeDetails: React.FC<AttendeeDetailsProps> = ({
  onNext,
  onBack,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [about, setAbout] = useState("");

  const beforeUpload = (file: RcFile) => {
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

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setPhoto(url);
      });
    }
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-[#002626] rounded-2xl">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg text-white mb-2">Upload Profile Photo</h3>
          <Upload.Dragger
            name="file"
            multiple={false}
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            className="bg-[#001a1a] border-[#004444] hover:border-[#00cccc]"
          >
            <div className="p-8">
              {photo ? (
                <Image
                  src={photo || "/placeholder.svg"}
                  alt="Avatar"
                  className="w-32 h-32 rounded-lg mx-auto"
                />
              ) : (
                <>
                  <CloudUploadOutlined className="text-4xl text-[#00cccc] mb-4" />
                  <p className="text-white">Drag & drop or click to upload</p>
                </>
              )}
            </div>
          </Upload.Dragger>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2">Enter your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#001a1a] border border-[#004444] text-white focus:border-[#00cccc] outline-none"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Enter your email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#001a1a] border border-[#004444] text-white focus:border-[#00cccc] outline-none"
            />
          </div>

          <div>
            <label className="block text-white mb-2">About the project</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#001a1a] border border-[#004444] text-white focus:border-[#00cccc] outline-none min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:justify-between pt-4">
          <button
            onClick={onBack}
            className="px-8 py-2 rounded-lg border border-[#004444] text-gray-300 hover:bg-[#002626]"
          >
            Back
          </button>
          <button
            onClick={() => onNext({ name, email, photo, about })}
            className="px-8 py-2 rounded-lg bg-[#00cccc] text-black font-medium hover:bg-[#00dddd]"
          >
            Get My Free Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendeeDetails;
