import os
import sys
import ctypes
from ctypes import wintypes
import win32con
byref = ctypes.byref
user32 = ctypes.windll.user32
HOTKEYS = {
    1 : (win32con.VK_SNAPSHOT, 0), #  "PRINT SCREEN"
    2 : (win32con.VK_F4, win32con.MOD_WIN)
}
def handle_print_screen ():
    os.startfile(os.path.join(os.path.realpath(os.path.dirname(sys.argv[0])),"boneca.jpg"))
def handle_win_f4 ():
    user32.PostQuitMessage (0)
HOTKEY_ACTIONS = {
    1 : handle_print_screen,
    2 : handle_win_f4
}
# Registering the keys without the print
for id, (vk, modifiers) in HOTKEYS.items ():
    #print "Registering id", id, "for key", vk
    pass
    if not user32.RegisterHotKey (None, id, modifiers, vk):
        #print "Unable to register id", id
        pass
# Calling the functions and removing from the register when quitting.
try:
    msg = wintypes.MSG ()
    while user32.GetMessageA (byref (msg), None, 0, 0) != 0:
        if msg.message == win32con.WM_HOTKEY:
            action_to_take = HOTKEY_ACTIONS.get (msg.wParam)
            if action_to_take:
                action_to_take ()
        user32.TranslateMessage (byref (msg))
        user32.DispatchMessageA (byref (msg))
finally:
    for id in HOTKEYS.keys ():
        user32.UnregisterHotKey (None, id)
