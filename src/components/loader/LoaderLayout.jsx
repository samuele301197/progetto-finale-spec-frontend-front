import { useState, useEffect } from "react";
import Loader from "./Loader.jsx";

export default function LoaderLayout({ children, bgImages = [] }) {
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (bgImages.length === 0) {
      setLoading(false);
      setFadeIn(true);
      return;
    }

    let loadedCount = 0;

    const images = bgImages.map((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount += 1;
        if (loadedCount === bgImages.length) {
          setLoading(false);
          setFadeIn(true);
        }
      };
      return img;
    });

    return () =>
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
  }, [bgImages]);

  if (loading) return <Loader />;

  return (
    <div className={`loader-layout-content ${fadeIn ? "fade-in" : ""}`}>
      {children}
    </div>
  );
}
