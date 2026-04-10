"use client";

import { useRef, useState } from "react";
import { sendContactMessage } from "@/app/actions/contact";

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
    <form ref={ref} onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send"}
      </button>
      {status === "done" && <p>Message sent!</p>}
      {status === "error" && <p>Something went wrong. Try again.</p>}
    </form>
  );
}