// app/api/vehicles/[id]/route.ts
import { requireOperator } from "@/utils/supabase/roleGuard";
import { createClient } from "@/utils/supabase/server";
import type { Vehicle } from "@/utils/supabase/types";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // Only operators can change pending status (approve/reject)
  const operatorId = await requireOperator();
  if (operatorId instanceof NextResponse) return operatorId;

  const {id : vehicleId} = await params;
  if (!vehicleId) {
    return NextResponse.json({ error: "Missing vehicle id" }, { status: 400 });
  }

  const { supabase } = await createClient();

  // parse body
  let body: { status?: string } | null = null;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || !body.status) {
    return NextResponse.json({ error: "Missing status in body" }, { status: 400 });
  }

  const allowed = ["active", "rejected", "inactive", "pending"];
  if (!allowed.includes(body.status)) {
    return NextResponse.json({ error: `Invalid status, allowed: ${allowed.join(", ")}` }, { status: 400 });
  }

  try {
    // When approving -> set approved_by + approved_at
    const updatePayload: Partial<Vehicle & { approved_by?: string; approved_at?: string }> = {
      status: body.status as any,
    };

    if (body.status === "active") {
      updatePayload.approved_by = operatorId;
      updatePayload.approved_at = new Date().toISOString();
    } else if (body.status === "rejected") {
      updatePayload.approved_by = operatorId;
      updatePayload.approved_at = new Date().toISOString();
    }

    const { data: updated, error: updateError } = await supabase
      .from("vehicles")
      .update(updatePayload)
      .eq("id", vehicleId)
      .select()
      .single();

    if (updateError) {
      console.error("vehicles update error", updateError);
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Optionally allow operators to delete vehicles
  const operatorId = await requireOperator();
  if (operatorId instanceof NextResponse) return operatorId;

  const vehicleId = params.id;
  if (!vehicleId) {
    return NextResponse.json({ error: "Missing vehicle id" }, { status: 400 });
  }

  const { supabase } = await createClient();

  try {
    const { error } = await supabase.from("vehicles").delete().eq("id", vehicleId);
    if (error) {
      console.error("vehicles delete error", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
  }
}
