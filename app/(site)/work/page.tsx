import Main from "@/components/Main/Main";
import { client } from "@/sanity/lib/client";
import { CASE_STUDIES_QUERY } from "@/sanity/lib/queries";
import AnimatedWork from "./AnimatedWork";

export default async function WorkPage() {
  const cases = await client.fetch(CASE_STUDIES_QUERY);

  return (
    <Main>
      <AnimatedWork cases={cases} />
    </Main>
  );
}