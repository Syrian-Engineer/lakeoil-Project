// app/daily-reports/actions.ts
"use server";

import { cookies } from "next/headers";

export async function deleteDailyReport(id: number) {
  const access_token = (await cookies()).get("access_token")?.value;

  try {
    const response = await fetch(`http://central.oktin.ak4tek.com:3950//daily_report/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`,
      },
    });

    if (!response.ok) {
      return { success: false, message: `Failed: ${response.statusText}` };
    }

    const result = await response.json();
    return { success: true, message: "Report deleted", data: result };

  } catch (err) {
    return { success: false, message: "Server error" };
  }
}
