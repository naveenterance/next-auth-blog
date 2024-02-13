"use client";
import React, { useEffect, useState } from "react";

interface author {
  _id: string;
  name: string;
  password: string;
}

const getauthors = async (): Promise<{ authors: author[] }> => {
  try {
    const res = await fetch("http://localhost:3000/api/authors", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch authors");
    }

    return res.json();
  } catch (error) {
    console.error("Error loading authors: ", error);
    throw error;
  }
};

const authorList: React.FC = () => {
  const [authors, setauthors] = useState<author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchauthors = async () => {
    try {
      const { authors } = await getauthors();
      setauthors(authors);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchauthors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {authors.map((item) => (
        <div
          key={item._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{item.name}</h2>
            <div>{item.password}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default authorList;
