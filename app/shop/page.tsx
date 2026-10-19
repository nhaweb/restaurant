import { redirect } from "next/navigation";

/** Shop catalog lives on /menu — keep /shop as a stable alias for old links. */
export default function ShopPage() {
  redirect("/menu#full-menu");
}
