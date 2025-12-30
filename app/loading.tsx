import { SectionCard } from "@/components/ui/section-card";

export default function Loading() {
  return (
    <SectionCard>
      <div className="flex flex-col items-center justify-center py-20">
        <span className="mt-4 text-xl font-bold text-black/60 dark:text-white/60">Loading...</span>
      </div>
    </SectionCard>
  );
}