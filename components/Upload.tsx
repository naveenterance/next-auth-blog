import { writeFile } from "fs/promises";
import { join } from "path";

const title = "example";

const Upload: React.FC = () => {
  async function upload(data: FormData): Promise<{ success: boolean }> {
    "use server";

    const file = data.get("file");
    if (!file) {
      throw new Error("No file uploaded");
    }

    const bytes = await (file as File).arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExtension = file ? (file as File).name.split(".").pop() : "";

    const path = join(
      __dirname,
      ...Array(4).fill(".."),
      "public",
      `${title}.${fileExtension}`
    );

    await writeFile(path, buffer);
    console.log(`open ${path} to see the uploaded file`);

    return { success: true };
  }

  return (
    <main>
      <h1>React Server Component: Upload</h1>
      <form action={upload}>
        <input type="file" name="file" />
        <input type="submit" value="Upload" />
      </form>
    </main>
  );
};

export default Upload;
