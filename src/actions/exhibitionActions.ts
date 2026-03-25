// src/actions/exhibitionActions.ts
"use server";

import { db, storage } from "@/lib/firebase";
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { revalidatePath } from "next/cache";

export async function createExhibition(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const artist = formData.get("artist") as string || formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const start_date = formData.get("start_date") as string;
    const end_date = formData.get("end_date") as string;
    const is_main_slider = formData.get("is_main_slider") === "on";
    const file = formData.get("poster_image") as File;
    const youtube_url = formData.get("youtube_url") as string;

    if (!title) {
      return { success: false, message: "제목은 필수입니다." };
    }

    let poster_url = null;
    if (file && file.size > 0) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const storageRef = ref(storage, `exhibitions/${fileName}`);
      const uploadResult = await uploadBytes(storageRef, file);
      poster_url = await getDownloadURL(uploadResult.ref);
    }

    await addDoc(collection(db, "exhibitions"), {
      title,
      artist: artist || null,
      description: description || null,
      start_date: start_date || null,
      end_date: end_date || null,
      is_active: true,
      poster_url,
      is_main_slider,
      youtube_url: youtube_url || null,
      created_at: serverTimestamp(),
    });

    revalidatePath("/");
    revalidatePath("/archive");
    revalidatePath("/admin/exhibition");
    
    return { success: true };
  } catch (error: any) {
    console.error("Exhibition Action Error:", error);
    return { success: false, message: error.message || "서버 내부 오류 발생" };
  }
}

export async function deleteExhibition(id: string) {
  try {
    await deleteDoc(doc(db, "exhibitions", id));
    revalidatePath("/admin/exhibition");
    revalidatePath("/archive");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Delete Exhibition Error:", error);
    throw new Error(error.message || "전시 삭제 실패");
  }
}
