"use client";

import { useRef, useState } from "react";
import { sendContactMessage } from "@/app/actions/contact";

import Main from "@/components/Main/Main"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import styles from './contactPage.module.css'

export default function ContactPage() {
  const ref = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const formData = new FormData(ref.current!);
      await sendContactMessage(formData);
      setStatus("done");
      ref.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
        <Header />
        <Main className={styles.contactPage}>
            <h1>Get in touch</h1>
            <form ref={ref} onSubmit={handleSubmit} className={styles.form}>
                <input name="name" placeholder="Name" required />
                <input name="email" type="email" placeholder="Email" required />
                <textarea name="message" placeholder="Message" required />
                <button type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : "Send"}
                </button>
                {status === "done" && <p>Message sent!</p>}
                {status === "error" && <p>Something went wrong. Try again.</p>}
                </form>
        </Main>
        <Footer />
    </>
  );
}