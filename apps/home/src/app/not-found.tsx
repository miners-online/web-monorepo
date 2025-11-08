"use client"

import Link from 'next/link'
import { Blankslate } from '@primer/react/experimental'
import { PageLayout } from '@primer/react'
import { BookIcon } from '@primer/octicons-react'

export default function NotFound() {
  return (
    <PageLayout>
      <PageLayout.Content>
        <Blankslate>
          <Blankslate.Visual>
            <BookIcon size="medium" />
          </Blankslate.Visual>
          <Blankslate.Heading>Page Not Found</Blankslate.Heading>
          <Blankslate.Description>
            The page you are looking for does not exist.
          </Blankslate.Description>
          <Blankslate.PrimaryAction href='/'>
            Go back home
          </Blankslate.PrimaryAction>
        </Blankslate>
      </PageLayout.Content>
    </PageLayout>
  )
}