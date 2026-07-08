"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function QRPage() {

  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  if (!url) return null;

  return (

    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">

      <h1 className="text-4xl font-bold mb-3">
        Ringana Assistant
      </h1>

      <p className="text-xl text-gray-700 mb-8">
        Escanea para comenzar
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg">

        <QRCode
          value={url}
          size={260}
        />

      </div>

      <p className="mt-8 text-blue-600 text-lg break-all">
        {url}
      </p>

    </main>

  );

}