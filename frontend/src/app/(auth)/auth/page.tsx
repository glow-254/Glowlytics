'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Beaker } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get('tab') || 'login'

  async function onSubmit(event: React.FormEvent<HTMLFormElement>, action: string) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${action}`, {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      if (action === 'login') {
        router.push('/dashboard')
      } else if (action === 'register') {
        router.push('/auth?tab=login&registered=true')
      } else if (action === 'forgot-password') {
        // Show success message
      }
    } else {
      // Handle errors (e.g., show error message)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-pink-50">
      <header className="w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-xl font-bold text-purple-700">
            <Beaker className="h-6 w-6" />
            <span>Glowlytics</span>
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="forgot-password">Reset Password</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Log in to your account</CardTitle>
                <CardDescription>Enter your email and password to log in</CardDescription>
              </CardHeader>
              {searchParams.get('registered') && (
                <Alert className="mb-4 mx-6">
                  <AlertDescription>
                    Account created successfully. Please log in.
                  </AlertDescription>
                </Alert>
              )}
              <form onSubmit={(e) => onSubmit(e, 'login')}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Log in'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>Enter your details to create your account</CardDescription>
              </CardHeader>
              <form onSubmit={(e) => onSubmit(e, 'register')}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input id="register-email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input id="register-password" name="password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" name="companyName" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create account'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            <TabsContent value="forgot-password">
              <CardHeader>
                <CardTitle>Forgot your password?</CardTitle>
                <CardDescription>Enter your email to reset your password</CardDescription>
              </CardHeader>
              <form onSubmit={(e) => onSubmit(e, 'forgot-password')}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input id="reset-email" name="email" type="email" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Sending reset link...' : 'Send reset link'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
      <footer className="w-full border-t bg-purple-50 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Glowlytics. All rights reserved.
        </div>
      </footer>
    </div>
  )
}