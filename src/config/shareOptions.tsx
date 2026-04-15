import React from "react";
import Icons from "@/components/Property/PropertyCard/Icons";
import { toast } from "@/hooks/use-toast";

export interface ShareOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  action: (url: string, title: string) => void;
}

export const shareOptions: ShareOption[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: <Icons.WhatsAppIcon />,
    action: (url, title) => {
      const text = encodeURIComponent(`Check out this property: ${title}\n${url}`);
      window.open(`https://wa.me/?text=${text}`, "_blank");
    },
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: <Icons.FacebookIcon />,
    action: (url) => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank"
      );
    },
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: <Icons.TwitterIcon />,
    action: (url, title) => {
      const text = encodeURIComponent(`Check out this property: ${title}`);
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
    },
  },
  {
    id: "email",
    name: "Email",
    icon: <Icons.EmailIcon />,
    action: (url, title) => {
      const subject = encodeURIComponent(`Check out this property: ${title}`);
      const body = encodeURIComponent(
        `I found this interesting property and thought you might like it:\n\n${title}\n\n${url}`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    },
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: <Icons.RedditIcon />,
    action: (url, title) => {
      window.open(
        `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        "_blank"
      );
    },
  },
  {
    id: "embed",
    name: "Embed",
    icon: <Icons.EmbedIcon />,
    action: (url) => {
      const embedCode = `<iframe src="${url}" width="100%" height="600" frameborder="0"></iframe>`;
      navigator.clipboard.writeText(embedCode);
      toast({
        title: "Embed Code Copied",
        description: "The embed code has been copied to your clipboard!",
      });
    },
  },
];
