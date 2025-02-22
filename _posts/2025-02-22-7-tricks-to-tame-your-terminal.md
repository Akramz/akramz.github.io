---
layout: post
slug: 7 Tricks to Tame Your Terminal
published: true
---

Given how much we use the terminal, any friction to get an action done is multiplied hundred of times resulting in a lot of wasted time. Optimizing the way we use the terminal will give us a decent productivity boost. In this post I share with you some common pain points that I faced before and found solutions for.

## 1. My terminal theme and colors are confusing!
*Solution:* [`Oh My Zsh`](https://ohmyz.sh/).

1. `sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`
2. Pick a theme in `~/.zshrc` (for oh-my-zsh, set `ZSH_THEME="agnoster"` or similar).
3. Open a new terminal to see your fancy prompt.

.. or pick a dedicated color scheme like [**Solarized**](https://ethanschoonover.com/solarized/), [**Gruvbox**](https://github.com/morhetz/gruvbox), or [**Dracula**](https://draculatheme.com/).

## 2. I keep hunting for my terminal window!
*Solution*: Find a shortcut to hover a terminal whenever you need it.

For MacOS:
- Install [**iTerm2**](https://iterm2.com/) if you haven't already.
- Enable **hotkey window**:
    1. In iTerm2 > Preferences > Keys, set up a **"Hotkey"** (e.g. `⌘ + ``).
    2. Turn on the **"Hotkey Window"** option.
    3. Now press your hotkey, and a terminal drops down instantly—press it again to hide.

For Linux, use a drop-down terminal like [**Guake**](http://guake-project.org/), [**Yakuake**](https://apps.kde.org/yakuake/), or [**Tilda**](https://github.com/lanoxx/tilda):
1. Install e.g. `sudo apt-get install guake` (Ubuntu) or `sudo dnf install guake` (Fedora).
2. Launch Guake, then press F12 (default) to summon or hide it.
3. Customize the hotkey in Guake's preferences if you want a different shortcut.

## 3. It's slow to navigate directories!
*Solution*: [`z`](https://github.com/rupa/z)

Use [`z`](https://github.com/rupa/z) (autojump-like) or [`zoxide`](https://github.com/ajeetdsouza/zoxide):
1. Install `z`: `brew install z` (Mac) or `sudo apt-get install z`.
    - For `zoxide`, visit: [zoxide.org](https://github.com/ajeetdsouza/zoxide).
2. Source it in your shell config (`.zshrc`, `.bashrc`), e.g. `eval "$(zoxide init bash)"`.
3. After a day or two of normal usage, type `z <partial-dir-name>` to jump instantly.

## 4. I find myself writing the same commands lots of times!
*Solution*: [`zsh-autosuggestions`](https://github.com/zsh-users/zsh-autosuggestions) or quickly search the history.

For `zsh-autosuggestions`:
1. `brew install zsh-autosuggestions` (Mac) or use your distro's package manager.
2. Add `plugins=(zsh-autosuggestions)` in your `~/.zshrc` (if using oh-my-zsh).
3. Watch as your previous commands appear in lighter text—press right arrow to accept.

## 5. I Don't Know the Right Command!
*Solution:* use a LLM CLI tool to ask it for commands. 

1. Install [llm](https://llm.datasette.io/en/stable/) via pip.
2. Either install a free LLM locally or provide API keys (i.e., `llm keys set openai`)
3. Check the available LLMs you have via `llm models`
4. Add this to your `~/.bashrc`: `alias please="llm -m gpt-4o 'Give me a short macOS terminal command to'"`
5. Then just run `please "How do I find all .txt files and remove them?"`

## 6. I've got five tasks at once, but each new shell is a hassle
*Solution:* persist sessions with [`tmux`](https://github.com/tmux/tmux) and learn shortcuts for pane/window management.

For MacOS:
1. Use [iTerm2](https://iterm2.com/) with split panes or multiple tabs:
    1. Press `⌘ + T` for new tab, or `⌘ + D` / `⌘ + Shift + D` to split panes.
    2. Keep tasks running in separate tabs/panes.
2. Try [tmux](https://github.com/tmux/tmux) if you like multiplexing within one terminal:
    1. `brew install tmux`
    2. Run `tmux`, open new windows/panes with `Ctrl+B c` (new window) or `Ctrl+B %` (vertical split).

## 7. The cursor is slow!
*Solution:* adjust the cursor speed and learn shortcuts to jump around text quickly.

For MacOS:
1. Increase keyboard speed in **System Settings > Keyboard**. Slide "Key Repeat" to Fast, "Delay Until Repeat" to Short.
2. Set up **Option + ← / →** to move by word in Terminal:
    - In [iTerm2](https://iterm2.com/), under Preferences > Profiles > Keys, map Option+Left to `Esc+b` (move back one word) and Option+Right to `Esc+f` (move forward one word).

For Linux:
1. Adjust keyboard repeat rate: e.g. `xset r rate 200 50` (200 ms delay, 50 repeats/sec) in your `.bashrc` or `.profile` if you want it permanent.
2. Terminal shortcuts often already exist: Try `Ctrl+Left` or `Alt+Left` to jump word-by-word. If needed, add them in your Terminal Preferences or use your `.inputrc`.

Little tweaks can remove loads of friction and drastically boost your terminal productivity. We can (and should) find similar tricks around the software we use most: Browser, IDE, OS, etc.