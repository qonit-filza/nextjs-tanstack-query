import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="grid grid-cols-2 justify-items-center items-center">
        <Card>
          <CardHeader className="gap-8">
            <div className="flex justify-between">
              <Image
                src="/iproc-logo.png"
                alt="iproc logo"
                width={75}
                height={25}
                className="object-contain"
              />
              <Button variant="outline">-</Button>
            </div>
            <div>
              <CardTitle>Masuk ke Platform iProc</CardTitle>
              <CardDescription className="mt-2">
                Sistem modernisasi pengadaan barang dan jasa elektronik
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" />
              </div>
              <div>
                <Label htmlFor="password">Username</Label>
                <Input id="password" type="password" />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <Button>Login to your account</Button>
            <p className="text-sm">
              Informasi iProc:{' '}
              <span className="font-semibold">helpdesk@adw.co.id</span>
            </p>
          </CardFooter>
        </Card>
        <Image
          src="/undraw-hello.png"
          alt="login welcome illustration"
          width={600}
          height={288}
        />
      </div>
    </div>
  )
}
