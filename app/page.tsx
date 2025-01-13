"use client";
import { useEffect, useState } from "react";
import { Ordiscan, Inscription } from "ordiscan";

// interface Inscription {
//   id: string;
//   number: number;
//   content: string;
//   content_type: string;
//   owner_address: string;
//   owner_output: string;
//   genesis_address: string;
//   genesis_output: string;
//   timestamp: string;
//   content_url: string;
//   collection_slug: string | null;
//   sat: number;
//   satributes: string[];
//   metadata: Record<string, any> | null;
//   metaprotocol: string | null;
//   parent_inscription_id: string | null;
//   delegate_inscription_id: string | null;
//   submodules: string[];
//   sats_name: string | null;
//   brc20_action: Record<string, any> | null;
// }

export default function Home() {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ordiscan = new Ordiscan("ab6ce104-831c-457d-a2eb-471463991f3e");

  useEffect(() => {
    const fetchInscriptions = async () => {
      try {
        setIsLoading(true);
        const response = await ordiscan.inscription.list();
        setInscriptions(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInscriptions();
  }, []);

  function InscriptionList() {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div className="text-red-500">Error: {error}</div>;
    }

    return (
      <div className="grid grid-cols-3 gap-4 w-full max-w-6xl">
        {inscriptions.map(
          (inscription) =>
            inscription.content_type === "text/plain;charset=utf-8" && (
              <div
                key={inscription.inscription_id}
                className="p-4 border rounded-lg"
              >
                <p className="text-sm text-gray-500">
                  Inscription #{inscription.inscription_number}
                </p>
                <p className="truncate">Id: {inscription.inscription_id}</p>
                <p className="truncate">Content Type: {inscription.content_type}</p>
              </div>
            )
        )}
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-8">Latest Ordinals</h1>
      <InscriptionList />
    </main>
  );
}
