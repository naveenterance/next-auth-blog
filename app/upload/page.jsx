import { writeFile } from "fs/promises";
import { join } from "path";

const Upload = () => {
  async function upload(data) {
    "use server";

    const file = data.get("file");
    if (!file) {
      throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join(__dirname, ...Array(3).fill(".."), "public", file.name);
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
