import { GameWithScores } from "./types";
import { customFetch } from "@/common/custom-fetch";

export async function getGames() {
  return customFetch<GameWithScores[]>("/api/games");
}

export async function postGame(data: FormData) {
  if (
    !data.get("target-20") ||
    !data.get("target-19") ||
    !data.get("target-18") ||
    !data.get("target-17") ||
    !data.get("target-16") ||
    !data.get("target-15") ||
    !data.get("target-bull")
  )
    return Promise.reject("Missing data");

  return customFetch("/api/games", {
    method: "POST",
    body: data,
  });
}
