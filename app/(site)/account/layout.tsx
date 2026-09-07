import { AccountNav } from "@/components/account/account-nav";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1340px] px-4 pb-16 pt-10 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
        <AccountNav />
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
