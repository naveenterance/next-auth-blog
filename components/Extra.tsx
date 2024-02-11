import { promises as fs } from "fs";

interface Data {
  title: string;
  content: string;
}

export default async function Extra(): Promise<JSX.Element> {
  const file: string = await fs.readFile(
    process.cwd() + "/db/data.json",
    "utf8"
  );
  const data: Data = JSON.parse(file);

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}
