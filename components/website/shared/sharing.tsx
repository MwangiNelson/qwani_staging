"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";

export const Sharing = ({
  bg = "background",
}: {
  bg?: "background" | "foreground";
}) => {
  const pathname = usePathname();
  const url =
    typeof window !== "undefined" ? window.location.origin + pathname : "";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.log("Web Share API is not supported in your browser.");
    }
  };

  return (
    <div className="fx-a-center gap-2 py-2">
      <span>Share</span>
      <Button
        variant={bg === "background" ? "outline" : "noEffect"}
        size={"icon"}
        onClick={handleShare}
      >
        <FiShare2 />
      </Button>
      <Button
        variant={bg === "background" ? "outline" : "noEffect"}
        size={"icon"}
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              document.title
            )}&url=${encodeURIComponent(url)}`,
            "_blank"
          )
        }
      >
        <FaXTwitter />
      </Button>
    </div>
  );
};
