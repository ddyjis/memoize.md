import * as prod from "react/jsx-runtime";
import rehypeKatex from "rehype-katex";
import rehypeReact, {type Options} from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import {unified} from "unified";
import type {Node, Parent} from "unist";
import {visit} from "unist-util-visit";

export function remarkCloze() {
  return (tree: Node) => {
    visit(
      tree,
      "text",
      (node: Node, index: number | undefined, parent: Parent | undefined) => {
        if (!parent || index === undefined) return;

        const regex = /==(.*?)==/g;
        const value = (node as Node & {value: string}).value;
        const nodes = [];
        let match = regex.exec(value);
        let lastIndex = 0;
        let clozeIndex = 0;

        while (match !== null) {
          // Text before the match
          if (match.index > lastIndex) {
            nodes.push({type: "text", value: value.slice(lastIndex, match.index)});
          }

          const currentClozeIndex = clozeIndex++;

          // The cloze match
          nodes.push({
            type: "cloze",
            data: {
              hName: "cloze",
              hProperties: {
                className: ["cloze-deletion"],
                dataIndex: currentClozeIndex,
              },
            },
            children: [{type: "text", value: match[1]}],
          });

          lastIndex = regex.lastIndex;
          match = regex.exec(value);
        }

        // Remaining text after last match
        if (lastIndex < value.length) {
          nodes.push({type: "text", value: value.slice(lastIndex)});
        }

        if (nodes.length > 0) {
          parent.children.splice(index, 1, ...(nodes as (Node | Parent)[]));
          return index + nodes.length;
        }
      },
    );
  };
}

export async function processMarkdown(
  content: string,
  components?: Options["components"],
) {
  const {result} = await unified()
    .use(remarkParse)
    .use(remarkCloze)
    .use(remarkMath)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeReact, {...prod, components} as Options)
    .process(content);

  return result as React.ReactNode;
}
