/** Load the XMPP protocol implementation only when a connection is requested. */
export const loadXmppClient = () => import('@xmpp/client')
