import Main from "@/components/Main/Main";
import { client } from "@/sanity/lib/client";
import { CASE_STUDIES_QUERY } from "@/sanity/lib/queries";
import AnimatedWork from "./AnimatedWork";

import styles from './workPage.module.css'

const query = `*[_type == "caseStudy"] | order(_createdAt desc) {
  _id,
  title,
  alternativeTitle,
  slug,
  coverImage
}`

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function WorkPage() {
  const cases = await client.fetch(CASE_STUDIES_QUERY);

  return (
    <Main className={styles.workPage}>
      <AnimatedWork cases={cases} />
    </Main>
  );
}