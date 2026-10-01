'use client';

import { usePathname } from "next/navigation"

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Sanity Studio encodes open panes/dialogs in the pathname, so keying by it
  // would remount the whole Studio every time a popup opens or closes
  const key = pathname?.startsWith('/studio') ? 'studio' : pathname;

  return (
    <div key={key}>
      {children}
    </div>
  );
}
