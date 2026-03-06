"use client";

import { useTransition } from "react";
import { deleteClient } from "@/actions/clientActions";
import { Button } from "@/components/ui/button";

export default function DeleteClientButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm("정말로 이 클라이언트를 삭제하시겠습니까? 복구할 수 없습니다.")) {
            startTransition(async () => {
                await deleteClient(id);
            });
        }
    };

    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-500 hover:bg-red-600 text-white"
        >
            {isPending ? "삭제 중..." : "삭제"}
        </Button>
    );
}
