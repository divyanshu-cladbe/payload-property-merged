import React, { Fragment } from "react";
import escapeHTML from "escape-html";
import Image from "next/image";

interface Node {
  type?: string;
  text?: string;
  children?: Node[];
  url?: string;
  relationTo?: string;
  value?: {
    url?: string;
    alt?: string;
    cloudflareImageUrl?: string;
    [key: string]: unknown;
  };
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  [key: string]: unknown;
}

export const serializeSlate = (children: Node[]): React.ReactNode => {
  if (!Array.isArray(children)) return null;

  return children?.map((node, i) => {
    // Handle text nodes with formatting
    if (node.text !== undefined) {
      let text: React.ReactNode = node.text;

      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      if (node.underline) {
        text = <u key={i}>{text}</u>;
      }

      if (node.strikethrough) {
        text = <s key={i}>{text}</s>;
      }

      if (node.code) {
        text = <code key={i}>{text}</code>;
      }

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }

    // Handle element nodes with proper styling
    switch (node.type) {
      case "h1":
        return (
          <h2 key={i} className="text-4xl font-bold mt-8 mb-4 text-gray-900">
            {serializeSlate(node.children || [])}
          </h2>
        );
      case "h2":
        return (
          <h2 key={i} className="text-3xl font-bold mt-8 mb-4 text-gray-900">
            {serializeSlate(node.children || [])}
          </h2>
        );
      case "h3":
        return (
          <h3 key={i} className="text-2xl font-bold mt-6 mb-3 text-gray-900">
            {serializeSlate(node.children || [])}
          </h3>
        );
      case "h4":
        return (
          <h4 key={i} className="text-xl font-bold mt-6 mb-3 text-gray-900">
            {serializeSlate(node.children || [])}
          </h4>
        );
      case "h5":
        return (
          <h5 key={i} className="text-lg font-bold mt-4 mb-2 text-gray-900">
            {serializeSlate(node.children || [])}
          </h5>
        );
      case "h6":
        return (
          <h6 key={i} className="text-base font-bold mt-4 mb-2 text-gray-900">
            {serializeSlate(node.children || [])}
          </h6>
        );
      case "blockquote":
        return (
          <blockquote
            key={i}
            className="border-l-4 border-purple-500 pl-4 py-2 my-4 italic text-gray-700"
          >
            {serializeSlate(node.children || [])}
          </blockquote>
        );
      case "ul":
        return (
          <ul key={i} className="list-disc list-outside ml-6 my-4 space-y-2">
            {serializeSlate(node.children || [])}
          </ul>
        );
      case "ol":
        return (
          <ol key={i} className="list-decimal list-outside ml-6 my-4 space-y-2">
            {serializeSlate(node.children || [])}
          </ol>
        );
      case "li":
        return (
          <li key={i} className="text-gray-700 leading-relaxed pl-2">
            {serializeSlate(node.children || [])}
          </li>
        );
      case "link":
        return (
          <a
            href={escapeHTML(node.url || "")}
            key={i}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-700 underline"
          >
            {serializeSlate(node.children || [])}
          </a>
        );
      case "upload":
        if (node.value?.cloudflareImageUrl || node.value?.url) {
          // Prefer Cloudflare CDN URL over local Payload server URL
          const imageUrl = node.value.cloudflareImageUrl || node.value.url;
          return (
            <div key={i} className="my-8">
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={imageUrl!}
                  alt={node.value.alt || "Uploaded image"}
                  fill
                  className="object-cover"
                />
              </div>
              {node.value.alt && (
                <p className="text-center text-sm text-gray-600 mt-2">
                  {node.value.alt}
                </p>
              )}
            </div>
          );
        }
        return null;
      default:
        // Default paragraph with proper spacing
        return (
          <p key={i} className="mb-4 text-gray-700 leading-relaxed">
            {serializeSlate(node.children || [])}
          </p>
        );
    }
  });
};
