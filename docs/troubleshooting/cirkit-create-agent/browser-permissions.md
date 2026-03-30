---
sidebar_position: 2
---

# Browser Permissions

When you first use the Cirkit Create Agent, your browser may ask for permission to allow Cirkit Designer to connect to it. If you accidentally clicked **Block** or **Deny**, the agent will not be able to communicate with the web app — even if the agent is running correctly.

This is the most common cause of "agent not found" issues, especially for first-time users.

## Fixing Permissions in Google Chrome

1. Open Chrome and navigate to [app.cirkitdesigner.com](https://app.cirkitdesigner.com)
2. Click the **lock icon** (or tune/settings icon) in the address bar, to the left of the URL
3. Click **Site settings**
4. Scroll down to find any permissions that are set to **Block**
5. Change any blocked permissions back to **Ask (default)** or **Allow**
6. Close the Site settings tab
7. **Reload** the Cirkit Designer page

If you don't see specific permissions listed, you can also reset all permissions for the site:

1. In the Site settings page, click **Reset permissions**
2. Go back to Cirkit Designer and reload the page
3. When prompted, click **Allow** to grant the necessary permissions

## Fixing Permissions in Microsoft Edge

The process is nearly identical to Chrome:

1. Navigate to [app.cirkitdesigner.com](https://app.cirkitdesigner.com)
2. Click the **lock icon** in the address bar
3. Click **Permissions for this site**
4. Reset any blocked permissions to **Ask (default)**
5. Reload the page

## Fixing Permissions in Firefox

1. Navigate to [app.cirkitdesigner.com](https://app.cirkitdesigner.com)
2. Click the **lock icon** in the address bar
3. Click **Connection secure** > **More Information**
4. Go to the **Permissions** tab
5. Review and reset any permissions that are set to **Block**
6. Close the dialog and reload the page

## Still Not Working?

If you've confirmed permissions are correct and the agent still won't connect, proceed to the [Universal Fix](./universal-fix).
