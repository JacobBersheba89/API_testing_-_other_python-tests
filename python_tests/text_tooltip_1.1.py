import pyperclip
import keyboard
import tkinter as tk
import threading
import pyautogui
import time

# Tooltip funkce
def show_tooltip(text, duration=3000):
    x, y = pyautogui.position()
    root = tk.Tk()
    root.overrideredirect(True)
    root.attributes("-topmost", True)
    root.attributes("-alpha", 0.9)
    label = tk.Label(root, text=text, bg="yellow", fg="black", padx=10, pady=5)
    label.pack()
    root.geometry(f"+{x+10}+{y+10}")

    # Zavřít tooltip po určité době
    root.after(duration, root.destroy)
    root.mainloop()

# Funkce pro zpracování zkratky
def on_shortcut():
    try:
        clipboard_text = pyperclip.paste()
        if clipboard_text:
            print(f"Zobrazování textu: {clipboard_text}")
            threading.Thread(target=show_tooltip, args=(clipboard_text,), daemon=True).start()
        else:
            print("Schránka je prázdná.")
    except Exception as e:
        print(f"Chyba při zpracování zkratky: {e}")

# Hlavní část programu
if __name__ == "__main__":
    print("Aplikace běží. Stiskni Ctrl+Shift+Q pro zobrazení textu ze schránky.")
    # Přidání zkratky
    keyboard.add_hotkey("ctrl+shift+q", on_shortcut)

    # Periodický výpis pro zpětnou vazbu
    def periodic_feedback():
        while True:
            print("Program stále běží... Stiskni Esc pro ukončení.")
            time.sleep(10)  # Interval mezi výpisy

    threading.Thread(target=periodic_feedback, daemon=True).start()

    # Udržování programu v chodu
    keyboard.wait("esc")  # Ukončení programu klávesou ESC
    print("Program ukončen.")
