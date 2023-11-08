
export const metadata = {
    title: "The Pub - Auth",
    description: "Authentication Routes for Users"
}

export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    return(
        <div className="flex items-center justify-center h-full">
            {children}
        </div>
    )
}

// This is the layout for the authentication pages