import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <InnerLayout>{children}</InnerLayout>
    </SidebarProvider>
  );
}

function InnerLayout({ children }) {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  return (
    <div className="flex h-screen">
      {/* Sidebar (drawer on mobile, fixed on desktop) */}
      {isMobile ? (
        <>
          {/* Trigger button to open/close the drawer */}
          <SidebarTrigger onClick={() => setOpenMobile(true)} />

          {/* The slide-over drawer */}
          <Sheet open={openMobile} onOpenChange={setOpenMobile}>
            <SheetContent side="left" className="w-full max-w-xs bg-white">
              <AppSidebar />
            </SheetContent>
          </Sheet>
        </>
      ) : (
        <div className="w-64 bg-white border-r">
          <AppSidebar />
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
