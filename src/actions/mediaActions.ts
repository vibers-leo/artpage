// src/actions/mediaActions.ts
"use server";

import { db, storage } from "@/lib/firebase";
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMedia(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const press_name = formData.get("press_name") as string;
    const link_url = formData.get("link_url") as string;
    const content = formData.get("content") as string;
    const published_date = formData.get("published_date") as string;
    const imageFile = formData.get("image") as File;

    if (!title || !link_url) throw new Error("필수 정보 누락");

    let image_url = null;
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const storageRef = ref(storage, `media/${fileName}`);
      const uploadResult = await uploadBytes(storageRef, imageFile);
      image_url = await getDownloadURL(uploadResult.ref);
    }

    await addDoc(collection(db, "media_releases"), {
      title,
      press_name,
      link_url,
      content,
      image_url,
      published_date: published_date || null,
      created_at: serverTimestamp(),
    });

    revalidatePath("/media");
    revalidatePath("/admin/media");
  } catch (error) {
    console.error("Error creating media:", error);
    throw error;
  }
  redirect("/admin/media");
}

export async function deleteMedia(id: string) {
  try {
    await deleteDoc(doc(db, "media_releases", id));
    revalidatePath("/admin/media");
    revalidatePath("/media");
    return { success: true };
  } catch (error) {
    console.error("Delete media error:", error);
    throw new Error("보도자료 삭제 실패");
  }
}
