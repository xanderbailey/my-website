import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { unified } from "unified";
import parse from "remark-parse";
import { Node } from "unist";
import { Heading, Text } from "mdast";

const postsDirectory = path.join(process.cwd(), "content/posts");

const extractHeader = (content: string): string => {
  const tree = unified().use(parse).parse(content);
  let header = "";

  const visit = (node: Node) => {
    if (node.type === "heading") {
      const headingNode = node as Heading;
      if (headingNode.depth === 1) {
        const textNode = headingNode.children[0] as Text;
        if (textNode && textNode.type === "text") {
          header = textNode.value;
          return true; // Stop visiting further nodes
        }
      }
    }
    return false; // Continue visiting other nodes
  };

  tree.children.some(visit);

  return header;
};

const getPostHeaders = (): { fileName: string; header: string }[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  const headers = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const header = extractHeader(fileContent);
    return {
      fileName,
      header,
    };
  });
  return headers;
};

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const headers = getPostHeaders();
    res.status(200).json(headers);
  } catch (error) {
    console.error("Error retrieving post headers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;