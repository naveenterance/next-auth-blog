import { FC } from "react";
import { useRouter } from "next/navigation";

interface RemoveProps {
  id: string;
}

const Remove: FC<RemoveProps> = ({ id }) => {
  const router = useRouter();
  const removeArticle = async (): Promise<void> => {
    const confirmed: boolean = confirm("Are you sure?");

    if (confirmed) {
      const res: Response = await fetch(
        `http://localhost:3000/api/articles?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        router.push("/");
      }
    }
  };

  return (
    <button onClick={removeArticle} className="text-red-400">
      delete
    </button>
  );
};

export default Remove;
