import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import type { NewsContent } from "@/services/news/types";

type Props = {
  data: NewsContent;
};

export function RichText({ data }: Props) {
  return (
    <div
      className="max-w-none text-base leading-relaxed text-foreground/90 [&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:text-muted [&_blockquote]:italic [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_li]:my-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
    >
      <LexicalRichText data={data} />
    </div>
  );
}
