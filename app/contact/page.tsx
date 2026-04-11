"use client"

import { useRef, useState } from "react"
import { sendContactMessage } from "@/app/actions/contact"
import { User, AtSign, MessageSquare, ArrowRight, CheckCircle, TriangleAlert } from "lucide-react"
import { motion, AnimatePresence, type Variants } from "framer-motion"

import Main from "@/components/Main/Main"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import styles from "./contactPage.module.css"
import { useFitText } from "@/hooks/useFitText"
import { useEntranceAnimation } from "@/hooks/useEntranceAnimation"

const formVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function ContactPage() {
  const ref = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const headingRef = useFitText();
  const controls = useEntranceAnimation(); // ← moved inside the component

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

        <motion.h1
          ref={headingRef}
          className={styles.heading}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Get in touch
        </motion.h1>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={formVariants}
          style={{ width: "100%" }}
        >
          <form ref={ref} onSubmit={handleSubmit} className={styles.form}>

            <motion.div className={styles.field} variants={itemVariants}>
              <User size={24} className={styles.fieldIcon} />
              <input className={styles.input} name="name" placeholder="Name" required />
            </motion.div>

            <motion.div className={styles.field} variants={itemVariants}>
              <AtSign size={24} className={styles.fieldIcon} />
              <input className={styles.input} name="email" type="email" placeholder="Email address" required />
            </motion.div>

            <motion.div className={styles.field} variants={itemVariants}>
              <MessageSquare size={24} className={styles.fieldIcon} />
              <textarea className={styles.textarea} name="message" placeholder="Write your message" required />
            </motion.div>

            <motion.div className={styles.submitRow} variants={itemVariants}>
              <ArrowRight size={24} className={styles.submitIcon} />
              <button type="submit" disabled={status === "sending"} className={styles.button}>
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
            </motion.div>

            <AnimatePresence mode="wait">
              {status === "done" && (
                <motion.span
                  key="success"
                  className={`${styles.statusMessage} ${styles.success}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <CheckCircle size={20} />
                  <div>
                    <strong>Your message is on the way</strong>
                    <span>I will get back as soon as possible</span>
                  </div>
                </motion.span>
              )}
              {status === "error" && (
                <motion.span
                  key="error"
                  className={`${styles.statusMessage} ${styles.error}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <TriangleAlert size={20} />
                  <div>
                    <strong>Something went wrong</strong>
                    <span>Refresh your browser and try again</span>
                  </div>
                </motion.span>
              )}
            </AnimatePresence>

          </form>
        </motion.div>

      </Main>
      <Footer />
    </>
  );
}