"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DEAL_STAGES, useCrm } from "@/context/CrmContext";
import type { Deal, DealStage } from "@/lib/types";

const stageLabels: Record<DealStage, string> = {
  lead: "Lead",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};

const stageColors: Record<DealStage, string> = {
  lead: "border-t-indigo-500",
  negotiation: "border-t-amber-500",
  won: "border-t-emerald-500",
  lost: "border-t-red-400",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function DealCard({
  deal,
  onMove,
}: {
  deal: Deal;
  onMove: (id: string, stage: DealStage) => void;
}) {
  const currentIndex = DEAL_STAGES.indexOf(deal.stage);
  const prevStage = currentIndex > 0 ? DEAL_STAGES[currentIndex - 1] : null;
  const nextStage =
    currentIndex < DEAL_STAGES.length - 1
      ? DEAL_STAGES[currentIndex + 1]
      : null;

  return (
    <Card hover className="p-4">
      <h3 className="font-medium text-slate-900">{deal.title}</h3>
      <p className="mt-1 text-sm text-slate-500">{deal.clientName}</p>
      <p className="mt-2 text-lg font-semibold text-indigo-600">
        {formatCurrency(deal.value)}
      </p>
      <div className="mt-3 flex gap-2">
        {prevStage && (
          <Button
            variant="secondary"
            className="flex-1 px-2 py-1.5 text-xs"
            onClick={() => onMove(deal.id, prevStage)}
          >
            ← {stageLabels[prevStage]}
          </Button>
        )}
        {nextStage && (
          <Button
            variant="secondary"
            className="flex-1 px-2 py-1.5 text-xs"
            onClick={() => onMove(deal.id, nextStage)}
          >
            {stageLabels[nextStage]} →
          </Button>
        )}
      </div>
    </Card>
  );
}

export default function DealsPage() {
  const { deals, moveDeal, hydrated } = useCrm();

  const columns = DEAL_STAGES.map((stage) => ({
    stage,
    deals: deals.filter((d) => d.stage === stage),
  }));

  return (
    <AppShell title="Deals" description="Track your sales pipeline">
      <PageHeader
        title="Deals Pipeline"
        description={`${deals.length} deals across all stages`}
      />

      {!hydrated ? (
        <div className="flex h-64 items-center justify-center text-slate-400">
          Loading...
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-4">
          {columns.map(({ stage, deals: stageDeals }) => (
            <div key={stage} className="flex flex-col">
              <div
                className={`mb-3 rounded-t-lg border-t-4 bg-white px-4 py-3 shadow-sm ${stageColors[stage]}`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-slate-900">
                    {stageLabels[stage]}
                  </h2>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                    {stageDeals.length}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3">
                {stageDeals.length === 0 ? (
                  <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
                    No deals
                  </div>
                ) : (
                  stageDeals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} onMove={moveDeal} />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
