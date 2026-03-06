import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import DeleteClientButton from "@/components/admin/DeleteClientButton";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminClientList() {
    const { data: clients, error } = await supabase
        .from("clients")
        .select("*")
        .order("display_order", { ascending: true });

    if (error) {
        return <div className="p-10 text-red-500">에러 발생: {error.message}</div>;
    }

    const statusLabel: Record<string, { text: string; className: string }> = {
        active: { text: "활성", className: "bg-green-100 text-green-700" },
        inactive: { text: "비활성", className: "bg-gray-100 text-gray-500" },
        development: { text: "개발중", className: "bg-yellow-100 text-yellow-700" },
    };

    return (
        <div className="max-w-screen-xl mx-auto py-20 px-6">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-serif font-bold">클라이언트 관리</h1>
                    <p className="text-sm text-gray-500 mt-2">에이전시 고객사를 관리합니다</p>
                </div>
                <Link href="/admin/clients/write">
                    <Button className="bg-black text-white hover:bg-gray-800">
                        + 새 클라이언트 등록
                    </Button>
                </Link>
            </div>

            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="p-4 border-b">썸네일</th>
                            <th className="p-4 border-b">이름 / 카테고리</th>
                            <th className="p-4 border-b">슬러그</th>
                            <th className="p-4 border-b">템플릿</th>
                            <th className="p-4 border-b">상태</th>
                            <th className="p-4 border-b text-right">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {clients?.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-10 text-center text-gray-400">
                                    등록된 클라이언트가 없습니다.
                                </td>
                            </tr>
                        ) : (
                            clients?.map((client) => (
                                <tr key={client.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4 w-24">
                                        <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden">
                                            {client.thumbnail_url ? (
                                                <Image
                                                    src={client.thumbnail_url}
                                                    alt={client.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-xs text-gray-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="font-bold text-gray-900">{client.name}</p>
                                        <p className="text-sm text-gray-500">{client.category || "-"}</p>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600 font-mono">
                                        /{client.slug}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {client.template}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusLabel[client.status]?.className || "bg-gray-100 text-gray-500"}`}>
                                            {statusLabel[client.status]?.text || client.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {client.website_url && (
                                                <Link href={client.website_url} target="_blank">
                                                    <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                                                        방문
                                                    </Button>
                                                </Link>
                                            )}
                                            <Link href={`/admin/clients/edit?id=${client.id}`}>
                                                <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:text-black">
                                                    수정
                                                </Button>
                                            </Link>
                                            <DeleteClientButton id={client.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
