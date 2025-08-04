
import { Button } from "@/components/ui/button";

function CommunityCreationsHeader() {
  const categories = [
    { label: "Trending", active: true },
    { label: "Polki" },
    { label: "Diamond" },
    { label: "Gold" },
    { label: "Weddings" },
    { label: "Festivals" },
    { label: "Heritage Events" },
    { label: "Everyday Wear" },
  ];

  return (
    <div className="w-full mb-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[var(--color-primary-darker)] bg-clip-text text-transparent mb-6">
        Community Creations
      </h1>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat, idx) => (
          <Button
            key={idx}
            variant={idx === 0 ? "default" : "outline"}
            className={`text-xs sm:text-sm px-3 py-2 ${
              idx === 0
                ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]"
                : "bg-white text-[var(--color-primary-dark)] border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
            }`}
          >
            {cat.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default CommunityCreationsHeader;
