import React from "react";
import Layout from "../../components/Layout";
import SidebarContent from "../../components/SidebarContent";
import Button from "../../components/Button";
import { useParams, useNavigate } from "react-router-dom";

export default function DocumentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const documents = {
    1: {
      title: "Computer Networking: A Top-Down Approach (8th Edition)",
      author: "James F. Kurose & Keith W. Ross",
      field: "Networks & Security",
      topic: "Computer networking / Internet protocols",
      format: "PDF",
      description:
        "Giáo trình hiện đại tiếp cận mạng máy tính theo hướng từ tầng ứng dụng xuống (top-down).",
      fileUrl: "/files/computer_networking.pdf",
    },
  };

  const document = documents[id];

  return (
    <Layout sidebar={<SidebarContent />}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Quản lý tài liệu</h1>

        {/* Nút quay lại */}
        <Button
          variant="secondary"
          width={120}
          height={38}
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          Quay lại
        </Button>

        <div className="bg-white rounded-xl shadow-md px-10 py-8 w-full max-w-4xl">
          <table className="table-auto w-full text-left text-gray-700">
            <tbody>
              <tr>
                <td className="py-3 font-semibold w-40">Tên</td>
                <td className="py-3">{document.title}</td>
              </tr>

              <tr>
                <td className="py-3 font-semibold">Tác giả</td>
                <td className="py-3">{document.author}</td>
              </tr>

              <tr>
                <td className="py-3 font-semibold">Lĩnh vực</td>
                <td className="py-3">{document.field}</td>
              </tr>

              <tr>
                <td className="py-3 font-semibold">Chủ đề</td>
                <td className="py-3">{document.topic}</td>
              </tr>

              <tr>
                <td className="py-3 font-semibold">Định dạng</td>
                <td className="py-3">{document.format}</td>
              </tr>

              <tr>
                <td className="py-3 font-semibold align-top">Mô tả</td>
                <td className="py-3 whitespace-pre-line">
                  {document.description}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Download buttons */}
          <div className="w-full mt-6 flex justify-center gap-4">
            <Button width={140} height={40} variant="secondary">
              Download
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
