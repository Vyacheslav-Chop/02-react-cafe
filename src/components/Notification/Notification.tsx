import type { JSX } from "react";
import css from "./Notification.module.css";

export default function Notification(): JSX.Element {
  return <p className={css.message}>No feedback yet</p>;
}
