export interface Article {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

export const getArticles = async (): Promise<{ articles: Article[] }> => {
  try {
    const res = await fetch("http://localhost:3000/api/articles", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch articles");
    }

    return res.json();
  } catch (error) {
    console.error("Error loading articles: ", error);
    throw error;
  }
};
