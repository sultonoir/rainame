import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <div className="sticky left-0 top-0 z-20 hidden h-dvh w-[230px] border-r p-4 lg:flex">
      <SidebarItem />
    </div>
  );
};

export default Sidebar;
