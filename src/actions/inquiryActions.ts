"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

type InquiryData = {
  type: "general" | "exhibition";
  name: string;
  phone: string;
  email: string;
  content: string;
};

export async function submitInquiry(data: InquiryData) {
  try {
    await addDoc(collection(db, "inquiries"), {
      ...data,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    return { success: true, message: "성공적으로 접수되었습니다. 담당자가 확인 후 연락드리겠습니다." };
  } catch (error) {
    console.error("Inquiry Error:", error);
    return { success: false, message: "접수 중 오류가 발생했습니다." };
  }
}
