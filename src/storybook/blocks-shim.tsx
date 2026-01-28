export * from '@storybook/addon-docs/blocks'

// Provide a safe fallback for ArgsTable when the real addon doesn't export it.
import { ArgsTableFallback } from './ArgsTableFallback'

// Re-export ArgsTable if it's available; otherwise export our fallback implementation.
import * as Blocks from '@storybook/addon-docs/blocks'

export const ArgsTable = (Blocks as any).ArgsTable ?? ArgsTableFallback

// Also provide a default export if consumers import the module as a namespace
export default { ...(Blocks as any), ArgsTable }
