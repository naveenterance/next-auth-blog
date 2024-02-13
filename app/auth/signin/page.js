"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const password = e.target.password.value;
    const result = await signIn("credentials", { name, password });
    if (!result.error) {
      router.push("/");
    } else {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" id="name" name="name" required />
      <input type="password" id="password" name="password" required />
      <button type="submit">Sign in</button>
    </form>
  );
}
