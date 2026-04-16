import { Octokit } from "octokit";

const token = Deno.env.get("GITHUB_AUTH_TOKEN");
if (!token) {
  console.error("GITHUB_AUTH_TOKEN environment variable is not set.");
  Deno.exit(1);
}

const octokit = new Octokit({ auth: token });

try {
  const response = await octokit.rest.repos.getContent({
    owner: "ablunier",
    repo: "manfred",
    path: "CV/MAC.json",
  });

  if (!("content" in response.data)) {
    throw new Error("Unexpected response: missing content field.");
  }

  const bytes = Uint8Array.from(atob(response.data.content), (c) => c.charCodeAt(0));
  const json = JSON.parse(new TextDecoder().decode(bytes));

  await Deno.writeTextFile("./_data/mac.json", JSON.stringify(json, null, 2));
  console.log("MAC has been fetched and saved successfully.");
} catch (error) {
  console.error(error);
  Deno.exit(1);
}
