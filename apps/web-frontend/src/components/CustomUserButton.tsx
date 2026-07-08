import { UserButton } from '@clerk/astro/react'

export default function Header() {
    return (
        <UserButton
            userProfileMode="navigation"
            userProfileUrl="/account"
        />
    )
}