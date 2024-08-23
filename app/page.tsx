import { taskSchema } from "@/app/data/schema";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { UserNav } from "@/components/user-nav";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/data/tasks.json"),
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function Page() {
  const tasks = await getTasks();

  return (
    <main className="sm:py-16 py-12 sm:container space-y-8 px-4">
      <div className="flex items-center justify-between space-y-2 gap-8">
        <div>
          <h2 className="sm:text-2xl text-xl font-bold tracking-tight">
            Welcome back!
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>

      <DataTable data={tasks} columns={columns} />
    </main>
  );
}
