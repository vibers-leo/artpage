// src/actions/clientActions.ts
"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export type Client = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  thumbnail_url: string | null;
  website_url: string | null;
  template: string;
  status: "active" | "inactive" | "development";
  category: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
};

// 공개용: 활성 클라이언트 목록 (랜딩 페이지)
export async function getActiveClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("status", "active")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("클라이언트 목록 조회 실패:", error);
    return [];
  }

  return data || [];
}

// 어드민용: 전체 클라이언트 목록
export async function getAllClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("클라이언트 목록 조회 실패:", error);
    return [];
  }

  return data || [];
}

// 단일 클라이언트 조회
export async function getClient(id: string): Promise<Client | null> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("클라이언트 조회 실패:", error);
    return null;
  }

  return data;
}

// 클라이언트 생성
export async function createClient(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const website_url = formData.get("website_url") as string;
    const category = formData.get("category") as string;
    const template = formData.get("template") as string;
    const status = (formData.get("status") as string) || "active";

    if (!name || !slug) {
      return { success: false, message: "이름과 슬러그는 필수입니다." };
    }

    // 썸네일 이미지 처리
    const file = formData.get("thumbnail") as File;
    let thumbnail_url: string | null = null;

    if (file && file.size > 0) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(`clients/${fileName}`, file);

      if (uploadError) {
        console.error("Upload Error:", uploadError);
        return { success: false, message: "이미지 업로드 실패" };
      }

      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(uploadData.path);

      thumbnail_url = publicUrlData.publicUrl;
    }

    const { error: dbError } = await supabase.from("clients").insert({
      name,
      slug,
      description: description || null,
      website_url: website_url || null,
      category: category || null,
      template: template || "default",
      status,
      thumbnail_url,
    });

    if (dbError) {
      console.error("DB Error:", dbError);
      return { success: false, message: "클라이언트 등록 실패" };
    }

    revalidatePath("/admin/clients");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, message: "서버 내부 오류 발생" };
  }
}

// 클라이언트 수정
export async function updateClient(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const website_url = formData.get("website_url") as string;
    const category = formData.get("category") as string;
    const template = formData.get("template") as string;
    const status = formData.get("status") as string;

    if (!name || !slug) {
      return { success: false, message: "이름과 슬러그는 필수입니다." };
    }

    const updateData: Record<string, unknown> = {
      name,
      slug,
      description: description || null,
      website_url: website_url || null,
      category: category || null,
      template: template || "default",
      status: status || "active",
      updated_at: new Date().toISOString(),
    };

    // 새 썸네일이 업로드된 경우
    const file = formData.get("thumbnail") as File;
    if (file && file.size > 0) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(`clients/${fileName}`, file);

      if (uploadError) {
        console.error("Upload Error:", uploadError);
        return { success: false, message: "이미지 업로드 실패" };
      }

      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(uploadData.path);

      updateData.thumbnail_url = publicUrlData.publicUrl;
    }

    const { error: dbError } = await supabase
      .from("clients")
      .update(updateData)
      .eq("id", id);

    if (dbError) {
      console.error("DB Error:", dbError);
      return { success: false, message: "클라이언트 수정 실패" };
    }

    revalidatePath("/admin/clients");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, message: "서버 내부 오류 발생" };
  }
}

// 클라이언트 삭제
export async function deleteClient(id: string) {
  const { error } = await supabase.from("clients").delete().eq("id", id);

  if (error) {
    throw new Error("클라이언트 삭제 실패");
  }

  revalidatePath("/admin/clients");
  revalidatePath("/");
}
