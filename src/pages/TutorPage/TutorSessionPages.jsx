// src/pages/Admin/TutorSessionPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import TutorSessionContent from "./TutorSessionContent.jsx";
import { TUTORS } from "../../data/tutorData.js";

const TutorSessionPage = () => {
  const { tutorId } = useParams();

  // Tìm tutor để lấy tên (hiển thị tiêu đề đẹp hơn)
  const tutor = TUTORS.find((t) => t.id === tutorId);

  return (
    <TutorSessionContent
      tutorId={tutorId}
      tutorName={tutor ? tutor.name : undefined}
    />
  );
};

export default TutorSessionPage;
