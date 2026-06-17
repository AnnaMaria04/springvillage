"use client";
import { CONTACT } from "@/lib/data";

export function BnovoWidget({ instanceId = "booking_iframe" }: { instanceId?: string }) {
  const src = `https://reservationsteps.ru/rooms/index/${CONTACT.bnovoUid}?lang=ru&scroll_to_rooms=0&is_auto_search=1&colorSchemePreview=0&insidePopup=0`;

  return (
    <div className="w-full h-full min-h-[600px] flex-1" id={instanceId}>
      <iframe
        src={src}
        className="w-full h-full min-h-[600px] border-0"
        title="Бронирование Spring Village"
        allow="payment"
      />
    </div>
  );
}
