"use server";
import { customFetch } from "@/common/custom-fetch";

export async function postGame(data: FormData) {
  try {
    await customFetch("/api/games", {
      method: "POST",
      body: data,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to post game");
  }
}
