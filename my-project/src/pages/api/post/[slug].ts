import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

const getPostData = (slug: string) => {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContent);

  return {
    content,
    frontmatter: data,
  };
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  try {
    const postData = getPostData(slug as string);
    res.status(200).json(postData);
  } catch (error) {
    console.error("Error retrieving post data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
