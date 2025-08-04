// src/pages/ShopPage.jsx
import React from "react";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { LeftSideBar } from "@/components/LeftSideBar";
import PromptInput from "@/components/PromptInput";
import Carousel from "@/components/Carousel";
import CommunityCreationsHeader from "@/components/CommunityCreationsHeader";
import CommunityCreations from "@/components/CommunityCreations";
import MasonryGallery from "@/components/MasonryGallery";
import featureimage1 from "../assets/feature 1.jpg";
import featureimage2 from "../assets/feature 2.jpg";
import featureimage3 from "../assets/feature 3.jpg";

export default function ShopPage() {
  return (
    <SidebarProvider>
      <ShopPageLayout />
    </SidebarProvider>
  );
}

function ShopPageLayout() {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  const featured = [
    { id: "1", title: "Text To Image", src: featureimage1, description:"ur theme turns mobile traffic into sales – and when questions come up" },
    { id: "2", title: "Prompt Filters", src: featureimage2,description:"ur theme turns mobile traffic into sales – and when questions come up"  },
    { id: "3", title: "Emerald Drop Earrings", src: featureimage3,description:"ur theme turns mobile traffic into sales – and when questions come up"  },
  ];

  const recent = [
    { id: "1", title: "Work A", src: featureimage1 },
    { id: "2", title: "Work B", src: featureimage2 },
    { id: "3", title: "Work C", src: featureimage3 },
    { id: "4", title: "Work D", src: featureimage1 },
    { id: "5", title: "Work E", src: featureimage2 },
    { id: "6", title: "Work F", src: featureimage3 },
  ];

  return (
    <div className="flex h-screen">
      {/* 1) Toggle button must live inside SidebarProvider */}
      <SidebarTrigger
        onClick={() => setOpenMobile((prev) => !prev)}
        className="absolute top-4 left-4 lg:hidden p-2 bg-white rounded shadow"
      />

      {/* 2) Mobile drawer */}
      {isMobile && (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent side="left" className="w-full max-w-xs p-0 bg-white">
            <LeftSideBar />
          </SheetContent>
        </Sheet>
      )}

      {/* 3) Desktop sidebar */}
      {!isMobile && (
        <div className="hidden lg:block w-64 bg-white border-r">
          <LeftSideBar />
        </div>
      )}

      {/* 4) Main content */}
      <main className="flex-1 overflow-auto bg-gradient-to-br from-white via-white to-orange-100">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Prompt input */}
          <div className="mb-8 mt-4 pt-16 lg:pt-8">
            <PromptInput />
          </div>

          {/* Featured carousel */}
          <div className="mb-12">
            <Carousel
              title="Featured Guides"
              overlayText
              backgroundImages={featured}
              parentCarouselCss="w-full"
              width=" xl:w-100 lg:w-72 sm:w-80 md:w-96"
              height="xl:h-56 lg:h-40 sm:h-64 md:h-72"
            />
          </div>

          {/* Recent creations carousel */}
          <div className="mb-12">
            <Carousel
              title="Recent Creations"
              overlayText={false}
              backgroundImages={recent}
              parentCarouselCss="w-full"
              width="xl:w-90 lg:w-70 sm:w-80 md:w-96"
              height="xl:h-48 lg:h-35 sm:h-56 md:h-64"
            />
          </div>

    
          <CommunityCreations />
       
        </div>
      </main>
    </div>
  );
}
