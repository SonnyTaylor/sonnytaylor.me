import { redirect } from "next/navigation";
import { WorkbenchEditor } from "./editor";

export default function WorkbenchEditorPage() {
  if (process.env.NODE_ENV === "production") {
    redirect("/nice-try");
  }

  return <WorkbenchEditor />;
}
