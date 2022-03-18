## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

# crypter

Crypter is a tool to encrypt/decrypt messages for secure chating

### Usage

This can be used to send messages securly on the web. Send bank card numbers, personal informations etc. to friends, family members securly.

#### Encrypt

Two input field presented, one is the key, and the other is the message. The key is coming from the other participant (friend, family member, etc.). Click on the encrypt and send the output via any chat platform (Messenger, iMessage, WhatsApp, etc.) it will be secure.

#### Decrypt

Present an input field and a key. The user need to send this key to the other participant who will use this key for the encryption. The output what you got from the other participant need to put into that single field. Click on the decrypt and the original message appers.
