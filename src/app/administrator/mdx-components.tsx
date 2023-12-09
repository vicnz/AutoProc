import type { MDXComponents } from "mdx/types";
import { options } from "@lib/client/remark-gfm";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        ...(options.components as any),
    };
}
