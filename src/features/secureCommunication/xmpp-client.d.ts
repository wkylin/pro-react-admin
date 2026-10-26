declare module '@xmpp/client' {
  export interface XmppElement {
    attrs: Record<string, string | undefined>
    is(name: string, namespace?: string): boolean
    getChildText(name: string, namespace?: string): string | undefined
  }

  export interface XmppClient {
    readonly status: string
    readonly reconnect: { stop(): void }
    on(event: 'online', listener: (address: { toString(): string }) => void): XmppClient
    on(event: 'stanza', listener: (stanza: XmppElement) => void): XmppClient
    on(event: 'offline', listener: () => void): XmppClient
    on(event: 'error', listener: (cause: unknown) => void): XmppClient
    start(): Promise<void>
    stop(): Promise<unknown>
    send(element: XmppElement): Promise<void>
  }

  export function client(options: {
    service: string
    domain: string
    resource: string
    username?: string
    password?: string
    credentials?: (
      authenticate: (credentials: { username: string; password: string }, mechanism: string) => Promise<unknown>,
      mechanisms: string[]
    ) => Promise<void>
  }): XmppClient

  export function xml(
    name: string,
    attrs?: Record<string, string>,
    ...children: Array<XmppElement | string>
  ): XmppElement
  export function jid(value: string): { local?: string; domain: string; toString(): string }
}
