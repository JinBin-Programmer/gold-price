import { NextResponse } from "next/server";
import { getGoldData } from "@/lib/gold";

export async function GET() {
  const data = await getGoldData();
  return NextResponse.json(data);
}
