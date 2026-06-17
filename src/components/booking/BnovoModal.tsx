"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { CONTACT, SITE } from "@/content/site";
import { BnovoWidget } from "@/components/booking/BnovoWidget";

type Props = {
  /** Trigger element — renders an uncontrolled dialog */
  trigger?: React.ReactNode;
  /** Controlled open state (use without trigger) */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function BnovoModal({ trigger, open, onOpenChange }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 z-[81] flex flex-col bg-white focus:outline-none">
          {/* Header — KORBI-style dark bar */}
          <div className="bg-pine flex items-center gap-4 px-6 sm:px-10 py-4 shrink-0">
            <div>
              <p className="text-white font-semibold text-sm tracking-wide">{SITE.name}</p>
              <p className="text-white/45 text-xs mt-0.5">{CONTACT.addressFull}</p>
            </div>
            <Dialog.Close className="ml-auto flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors cursor-pointer">
              Закрыть окно бронирования
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          {/* Booking widget — scrollable */}
          <div className="flex-1 overflow-y-auto bg-[#f7f7f5]">
            <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10">
              <BnovoWidget instanceId="booking_iframe_modal" />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
