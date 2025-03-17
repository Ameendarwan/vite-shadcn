'use client';

import { ChevronDown, ChevronRight, Map } from 'lucide-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@app/components/Sidebar/Sidebar';
import { useEffect, useMemo, useState } from 'react';

import React from 'react';
import SidebarFooterContent from '@app/components/SidebarFooterContent';
import auth from '@app/utils/auth';
import { paths } from '@app/routes/Routes.utils';

interface SidebarItem {
  title: string;
  path: string;
  icon: JSX.Element;
  children: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Home',
    path: paths.home,
    icon: <Map />,
    children: [],
  },
];
const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  const { state, setOpen } = useSidebar();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const token = auth.token();
    if (!token || auth.isTokenExpired()) {
      <Navigate replace to={paths.home} />;
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // Toggle collapsible sections
  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleSelectItem = (item: SidebarItem) => {
    toggleSection(item.title);
    navigate(item.path);
  };

  const isExpanded = useMemo(() => state === 'expanded', [state]);

  if (!isAuthenticated) {
    return null; // Prevent rendering until authentication is verified
  }

  // Generate Breadcrumbs from URL
  // const breadcrumbs = pathname
  //   .split("/")
  //   .filter((segment) => segment)
  //   .map((segment, index, arr) => {
  //     const href = "/" + arr.slice(0, index + 1).join("/");
  //     return {
  //       label: segment.charAt(0).toUpperCase() + segment.slice(1),
  //       href,
  //     };
  //   });

  return (
    <>
      <Sidebar collapsible={isExpanded ? 'offcanvas' : 'icon'}>
        <SidebarHeader onClick={() => setOpen(true)} className={`cursor-pointer px-4 ${isExpanded ? 'py-2' : 'py-4'}`}>
          <div className="group relative flex w-full flex-row items-center gap-2">
            {/* Logo (visible if not hovered and not expanded) */}
            {!isExpanded && (
              <div className="transition-opacity duration-300 group-hover:opacity-0">
                <img src="/logo.png" alt="Company Logo" width={25} height={25} />
              </div>
            )}

            {/* SidebarTrigger (hidden by default, shown on hover if not expanded) */}
            {!isExpanded && (
              <div className="absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <SidebarTrigger />
              </div>
            )}

            {/* Budgetwise text (only shown when expanded) */}
            {isExpanded && (
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Company Logo" width={50} height={50} />
                <h2 className="!font-poppins text-lg font-semibold">Budgetwise</h2>
              </div>
            )}
          </div>
        </SidebarHeader>

        <SidebarSeparator />

        {/* Sidebar Content */}
        <SidebarContent className="px-3 pt-4">
          <SidebarMenu className="flex flex-col gap-3">
            {sidebarItems.map((item, index) => (
              <SidebarMenuItem
                key={index}
                className={`hover:!rounded-md hover:!bg-primary hover:!text-white ${pathname === item.path ? 'rounded-md bg-primary text-white' : ''}`}>
                <SidebarMenuButton
                  className="hover:!rounded-md hover:!bg-primary hover:!text-white"
                  onClick={() => handleSelectItem(item)}>
                  {item.icon} <span className="text-md">{item.title}</span>
                  {item.children.length > 0 &&
                    (openSections[item.title] ? (
                      <ChevronDown className="ml-auto h-4 w-4" />
                    ) : (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    ))}
                </SidebarMenuButton>

                {item.children.length > 0 && openSections[item.title] && (
                  <div className="pl-6">
                    {item?.children?.map((child, idx) => (
                      <SidebarMenuItem key={idx}>
                        <SidebarMenuButton>{child?.title}</SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </div>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarSeparator />

        {/* Footer / Profile Section */}
        {isExpanded && (
          <SidebarFooter>
            <SidebarFooterContent />
          </SidebarFooter>
        )}
      </Sidebar>
      <main className="w-full flex-1 p-3">
        <div className="flex">
          {isExpanded && <SidebarTrigger />}

          {/* Breadcrumb Section */}
          {/* <Separator orientation="vertical" color="red" />
          <div className="flex flex-row items-center self-center">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <>
                    <BreadcrumbItem key={index}>
                      <BreadcrumbLink href={crumb.href}>
                        {crumb.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div> */}
        </div>
        {children}
      </main>
    </>
  );
};

export default SidebarWrapper;
