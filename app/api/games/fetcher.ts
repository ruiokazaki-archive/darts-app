import { GameWithScores } from "./types";
import { customFetch } from "@/common/custom-fetch";

export async function getGames() {
  return customFetch<GameWithScores[]>("/api/games");
}
