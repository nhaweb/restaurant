"use client";



import Image from "next/image";

import Link from "next/link";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

import { FadeIn } from "@/components/ui/FadeIn";

import { useCart } from "@/components/shop/CartProvider";

import { CheckoutPayForm } from "@/components/shop/CheckoutPayForm";

import { formatShopPrice } from "@/data/shop";

import { shopProducts } from "@/data/shop";



const FALLBACK_LINES = shopProducts.slice(0, 5).map((p) => ({

  id: p.id,

  slug: p.slug,

  name: p.name,

  price: p.price,

  image: p.image,

  quantity: 1,

}));



export function CartView() {

  const { items, subtotal, setQuantity, removeItem, addItem } = useCart();

  const [coupon, setCoupon] = useState("");

  const [couponApplied, setCouponApplied] = useState(false);



  const displayItems = items.length > 0 ? items : [];

  const shipping = 0;

  const discount = couponApplied ? Math.min(10, subtotal * 0.05) : 0;

  const total = Math.max(0, subtotal + shipping - discount);



  const seedDemoCart = () => {

    FALLBACK_LINES.forEach((line) => {

      addItem(

        {

          id: line.id,

          slug: line.slug,

          name: line.name,

          price: line.price,

          image: line.image,

        },

        line.quantity,

      );

    });

  };



  return (

    <div className="space-y-12">

      <FadeIn>

        {displayItems.length === 0 ? (

          <div className="border border-gray-5 px-6 py-16 text-center">

            <p className="mb-6 text-lg text-gray-2">Giỏ hàng của bạn đang trống.</p>

            <div className="flex flex-wrap justify-center gap-4">

              <Button href="/menu#full-menu" size="lg" withArrow>

                Xem thực đơn

              </Button>

              <Button

                type="button"

                variant="outline"

                shape="pill"

                onClick={seedDemoCart}

              >

                Tải giỏ mẫu

              </Button>

            </div>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[720px] border-collapse text-left">

              <thead>

                <tr className="border-b border-gray-5 text-lg font-bold text-gray-1">

                  <th className="py-4 pr-4 font-bold">Sản phẩm</th>

                  <th className="px-4 py-4 font-bold">Giá</th>

                  <th className="px-4 py-4 font-bold">Số lượng</th>

                  <th className="px-4 py-4 font-bold">Tổng</th>

                  <th className="py-4 pl-4 font-bold">Xóa</th>

                </tr>

              </thead>

              <tbody>

                {displayItems.map((line) => (

                  <tr key={line.id} className="border-b border-gray-5">

                    <td className="py-6 pr-4">

                      <Link

                        href={`/shop/${line.slug}`}

                        className="flex items-center gap-4 hover:text-primary"

                      >

                        <span className="relative size-[80px] shrink-0 overflow-hidden bg-gray-6 sm:size-[100px]">

                          <Image

                            src={line.image}

                            alt=""

                            fill

                            className="object-cover"

                            sizes="100px"

                          />

                        </span>

                        <span className="text-base font-bold text-gray-1">

                          {line.name}

                        </span>

                      </Link>

                    </td>

                    <td className="px-4 py-6 text-base text-gray-2">

                      {formatShopPrice(line.price)}

                    </td>

                    <td className="px-4 py-6">

                      <div className="inline-flex h-10 items-stretch border border-gray-5">

                        <button

                          type="button"

                          className="w-10 hover:bg-gray-6"

                          aria-label={`Giảm số lượng ${line.name}`}

                          onClick={() =>

                            setQuantity(line.id, line.quantity - 1)

                          }

                        >

                          −

                        </button>

                        <span className="flex min-w-10 items-center justify-center border-x border-gray-5">

                          {line.quantity}

                        </span>

                        <button

                          type="button"

                          className="w-10 hover:bg-gray-6"

                          aria-label={`Tăng số lượng ${line.name}`}

                          onClick={() =>

                            setQuantity(line.id, line.quantity + 1)

                          }

                        >

                          +

                        </button>

                      </div>

                    </td>

                    <td className="px-4 py-6 text-base font-bold text-gray-1">

                      {formatShopPrice(line.price * line.quantity)}

                    </td>

                    <td className="py-6 pl-4">

                      <button

                        type="button"

                        onClick={() => removeItem(line.id)}

                        className="text-2xl leading-none text-gray-3 hover:text-primary"

                        aria-label={`Xóa ${line.name}`}

                      >

                        ×

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </FadeIn>



      <FadeIn delay={0.06}>

        <div className="grid gap-8 lg:grid-cols-2">

          <div>

            <h2 className="mb-4 text-[32px] font-bold leading-10 text-gray-1">

              Mã giảm giá

            </h2>

            <div className="border border-gray-5 p-6 md:p-8">

              <p className="mb-6 text-base leading-6 text-gray-3">

                Có mã khuyến mãi? Nhập bên dưới để áp dụng giảm giá mẫu cho tổng đơn.

              </p>

              <form

                className="flex flex-col gap-3 sm:flex-row"

                onSubmit={(e) => {

                  e.preventDefault();

                  setCouponApplied(coupon.trim().length > 0);

                }}

              >

                <label className="sr-only" htmlFor="coupon">

                  Mã giảm giá

                </label>

                <input

                  id="coupon"

                  value={coupon}

                  onChange={(e) => setCoupon(e.target.value)}

                  placeholder="Nhập mã tại đây"

                  className="h-[62px] flex-1 border border-gray-5 px-4 text-base"

                />

                <button

                  type="submit"

                  className="h-[62px] bg-[#0d0d0d] px-8 text-base font-bold text-white hover:bg-primary"

                >

                  Áp dụng

                </button>

              </form>

              {couponApplied && (

                <p className="mt-3 text-sm text-primary" role="status">

                  Đã áp dụng mã.

                </p>

              )}

            </div>

          </div>



          <div>

            <h2 className="mb-4 text-[32px] font-bold leading-10 text-gray-1">

              Tổng thanh toán

            </h2>

            <div className="border border-gray-5 p-6 md:p-8">

              <dl className="space-y-4 text-base leading-7">

                <div className="flex justify-between gap-4">

                  <dt className="font-bold text-gray-1">Tạm tính giỏ hàng</dt>

                  <dd className="text-gray-2">{formatShopPrice(subtotal)}</dd>

                </div>

                <div className="flex justify-between gap-4">

                  <dt className="text-gray-2">Phí giao hàng</dt>

                  <dd className="text-gray-2">{formatShopPrice(shipping)}</dd>

                </div>

                {discount > 0 && (

                  <div className="flex justify-between gap-4">

                    <dt className="text-gray-2">Giảm giá</dt>

                    <dd className="text-primary">

                      −{formatShopPrice(discount)}

                    </dd>

                  </div>

                )}

                <div className="flex justify-between gap-4 border-t border-gray-5 pt-4 text-lg font-bold text-gray-1">

                  <dt>Tổng cộng</dt>

                  <dd>{formatShopPrice(total)}</dd>

                </div>

              </dl>

              <CheckoutPayForm disabled={displayItems.length === 0} />

            </div>

          </div>

        </div>

      </FadeIn>

    </div>

  );

}

