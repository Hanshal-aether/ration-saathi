import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import Booking from "../../../components/booking";

export default async function Shop({ params }) {
  const shop = await prisma.fairPriceShop.findUnique({ where: { id: params.id }, include: { timeSlots: { orderBy: { date: "asc" } } } });
  if (!shop) notFound();
  const slots = shop.timeSlots.map((slot) => ({ ...slot, date: slot.date.toISOString() }));
  return <main className="mx-auto max-w-2xl px-4 py-8"><p className="font-semibold text-service-600">Book your visit</p><h1 className="mt-2 text-3xl font-bold">{shop.name}</h1><p className="mt-2 text-lg">{shop.address}</p><Booking slots={slots} /></main>;
}
