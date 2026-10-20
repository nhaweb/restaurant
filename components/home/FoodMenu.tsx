import { MenuBoardLazy } from "@/components/menu/MenuBoardLazy";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMenuCategories, getMenuItems } from "@/lib/content/menu";

export async function FoodMenu() {
  const [items, categories] = await Promise.all([
    getMenuItems(),
    getMenuCategories(),
  ]);

  return (
    <section id="menu" className="relative overflow-x-clip py-14 sm:py-16 md:py-24">
    

      <div className="container-site relative z-10">
        <MenuBoardLazy
          limit={8}
          showViewAll
          items={items}
          categories={categories}
          headingSlot={
            <SectionHeading
              showLeaf
              title="Thực đơn của chúng tôi"
              description="Từ bữa sáng đến món nhẹ buổi tối — giá rõ ràng, calo và nhãn dinh dưỡng khi có."
            />
          }
        />
      </div>
    </section>
  );
}
