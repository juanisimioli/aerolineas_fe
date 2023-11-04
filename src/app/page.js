"use client";
import styles from "./page.module.css";
import { Roboto } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return <main className={`${styles.main} ${roboto.className}`}></main>;
}
