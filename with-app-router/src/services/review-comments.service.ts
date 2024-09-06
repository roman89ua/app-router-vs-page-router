import "server-only";

export type CommentInputType = {
  message: string;
  username: string;
  review: string | number;
  slug: string;
};

const CMS_URL = process.env.CMS_URL;

export async function addComment(data: CommentInputType) {
  try {
    const response = await fetch(`${CMS_URL}/api/comments?`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
