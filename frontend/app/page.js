'use client'

import { useEffect, useState, useRef } from "react";
import { uploadPhoto } from "./helper";

const BACKEND_URL = "http://127.0.0.1:8080";

export default function Home() {
  const [image, setImage] = useState("myphoto");

  useEffect(() => {
    fetch(`${BACKEND_URL}/photos?file=myphoto.jpg`)
      .then(res => res.blob())
      .then(blob => setImage(URL.createObjectURL(blob)))
      .catch(e => console.error('An error occurred: ', e));
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-gray-800">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 gap-2 bg-white dark:bg-gray-800">
        <h1 className="text-4xl justify-center font-bold">Very isolated photo uploads</h1>
        <img src={image} alt="uploaded image" width={200} height={200}/>
        <form action={uploadPhoto} onSubmit={async (e) => { e.preventDefault(); await uploadPhoto(new FormData(e.target)); window.location.reload(); }} className="flex flex-col gap-2">
          <label>Upload any jpg you&#39;d like! There&#39;s no users so there&#39;s nothing to hack :&#41;</label>
          <input type="file" name="uploaded_photo" accept=".jpg" className="text-sm file:mr-5 file:py-1 file:px-3 file:border file:rounded-lg file:hover:bg-white/40" />
          <button type="submit" className="border rounded-lg p-2 hover:bg-white/40">Upload</button>
        </form>
      </main>
    </div>
  );
}
