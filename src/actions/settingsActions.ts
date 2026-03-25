"use server";

import { db, storage } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { revalidatePath } from "next/cache";

// 설정 조회
export async function getSiteSettings() {
  try {
    const docRef = doc(db, "site_settings", "default");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

// 설정 업데이트
export async function updateSiteSettings(formData: FormData) {
  // 인증 확인 (현재 Supabase 로그인이므로 임시 주석 처리하거나 필요시 유지)
  // const user = await someAuthCheck(); 

  try {
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;
    let imageUrl = formData.get("existingImage") as string;

    // 새 이미지가 업로드된 경우
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `og-image-${Date.now()}.${fileExt}`;
      const storageRef = ref(storage, `settings/${fileName}`);
      
      const uploadResult = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(uploadResult.ref);
    }

    const docRef = doc(db, "site_settings", "default");
    const docSnap = await getDoc(docRef);

    const updateData = {
      og_description: description,
      og_image_url: imageUrl,
      updated_at: serverTimestamp(),
    };

    if (docSnap.exists()) {
      await updateDoc(docRef, updateData);
    } else {
      await setDoc(docRef, { ...updateData, id: 1 });
    }

    revalidatePath("/");
    revalidatePath("/admin/settings");
    
    return { success: true };
  } catch (error: any) {
    console.error("Settings Update Error:", error);
    return { error: "설정 저장 실패: " + error.message };
  }
}
