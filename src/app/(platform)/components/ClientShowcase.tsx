// src/app/(platform)/components/ClientShowcase.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getActiveClients } from "@/actions/clientActions";

export default async function ClientShowcase() {
  const clients = await getActiveClients();

  if (clients.length === 0) return null;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {clients.map((client) => (
        <Link
          key={client.id}
          href={client.website_url || `/${client.slug}`}
          className="group block border border-border rounded-lg overflow-hidden hover:border-foreground/30 transition-all duration-500"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            {client.thumbnail_url ? (
              <Image
                src={client.thumbnail_url}
                alt={client.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground font-serif text-2xl">
                {client.name}
              </div>
            )}
            {client.category && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-mono rounded-full">
                  {client.category}
                </span>
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-serif">{client.name}</h3>
              <ArrowUpRight
                size={20}
                className="text-muted-foreground group-hover:text-foreground group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
              />
            </div>
            {client.description && (
              <p className="text-foreground/60 font-light leading-relaxed">
                {client.description}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
