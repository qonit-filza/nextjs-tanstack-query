import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'

export function Sidebar() {
  return (
    <aside className="sticky top-0 left-0 shrink-0 max-w-[240px] border h-screen border-right">
      <div className="flex items-center gap-4 px-5 h-24">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">Makayla</p>
          <p className="text-xs">TELKOM</p>
          <p className="text-xs">Staff Pengadaan 1</p>
        </div>
      </div>
      <Separator />
      <Accordion type="multiple">
        <AccordionItem value="item-3">
          <AccordionTrigger>Menu</AccordionTrigger>
          <AccordionContent>
            <Link href="/dashboard/products">Product</Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/dashboard/users">Users</Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}
