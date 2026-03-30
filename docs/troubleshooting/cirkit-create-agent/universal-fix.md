---
sidebar_position: 3
---

# Universal Fix

If you've already checked your [browser permissions](./browser-permissions) and the Cirkit Create Agent still isn't connecting, follow this step-by-step process. This resolves the majority of agent issues, including:

- Agent was working but stopped
- Multiple failed connection attempts
- Agent appears to be running but Cirkit Designer can't find it

## The Fix

### Step 1: Close All Running Instances of the Cirkit Create Agent

You may have multiple instances of the agent running (including failed/zombie processes). Close them all.

**Windows:**

1. Press **Ctrl + Shift + Esc** to open Task Manager
2. Click **More details** if Task Manager is in compact mode
3. Look for any processes named **CirkitCreateAgent**, **ArduinoCreateAgent**, or similar
4. Select each one and click **End task**
5. Repeat until no agent processes remain

**Mac:**

1. Open **Activity Monitor** (search for it in Spotlight with **Cmd + Space**)
2. In the search bar, type **Cirkit** or **Arduino**
3. Select any matching processes
4. Click the **X** button in the toolbar and choose **Force Quit**
5. Repeat until no agent processes remain

### Step 2: Close All Instances of the Cirkit Designer Web App

Close every browser tab or window that has Cirkit Designer open. This ensures no stale connections are held.

### Step 3: Verify Only One Create Agent Is Installed

Having multiple copies of the agent installed can cause conflicts. Check that you only have one.

**Windows:**

1. Open **Settings** > **Apps** > **Installed apps** (or **Add or remove programs** on older Windows)
2. Search for **Cirkit** or **Arduino Create Agent**
3. If you see more than one installation, uninstall all of them
4. Reinstall a single copy from Cirkit Designer

**Mac:**

1. Open **Finder**
2. Check both of these locations for the agent:
   - `/Applications/` (system-wide)
   - `~/Applications/` (user-only)
3. Also check `~/.arduino-create/` for agent data files
4. If you find multiple copies, delete all of them
5. Reinstall a single copy from Cirkit Designer

### Step 4: Start the Create Agent

Launch the Cirkit Create Agent. You should see its icon appear in your system tray (Windows) or menu bar (Mac).

### Step 5: Open Cirkit Designer

Open **one** browser tab and navigate to [app.cirkitdesigner.com](https://app.cirkitdesigner.com). The agent should now be detected.

## Still Not Working?

If this process didn't resolve the issue, see [Agent Not Connecting](./agent-not-connecting) for a deeper dive into connection problems.
