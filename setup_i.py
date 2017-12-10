from cx_Freeze import setup, Executable
import os, sys
#import tkinter
#root = tkinter.Tk()

#initScript
#force (-f)
#http://cx-freeze.readthedocs.io/en/latest/distutils.html#bdist-msi

#includes = ""
includes = "_mssql,uuid"
twisted = False
if twisted:
    includes = includes + ",zope.interface"
    pass

pyVersion = str(sys.version.split()[0][:3])

PYTHON_INSTALL_DIR = os.path.dirname(os.path.dirname(os.__file__))
#os.environ['TCL_LIBRARY'] = os.path.join(PYTHON_INSTALL_DIR, 'tcl', 'tcl8.6')
#os.environ['TK_LIBRARY'] = os.path.join(PYTHON_INSTALL_DIR, 'tcl', 'tk8.6')

"""
#os.environ['TCL_LIBRARY'] = root.tk.exprstring('$tcl_library')
#os.environ['TK_LIBRARY'] = root.tk.exprstring('$tk_library')
#"""

base=None
if sys.platform == "win32":
    base = "Win32GUI"
#from PyQt5 import uic
#uic.loadUi("pyBOT.ui", self)
#ProgramMenuFolder
#ProgramFilesFolder
#DesktopFolder
#CommonFilesFolder
#CommonAppDataFolder
executables = [
        #Executable('app.py', base=base, targetName = 'pySGPChat.exe', shortcutName="pySGPchat", shortcutDir="DesktopFolder",  icon="chat.ico"),
        Executable('app.py', base=base, targetName = 'pySGPChat.exe', icon="chat.ico"),
    ]
#includefiles=["img/BeBOT-splash.png", "BeBOT.ico"]
#buildOptions = dict(include_files = [(absolute_path_to_file,'final_filename')])
#"""
buildOptions = dict(include_files = [
                                        #os.path.join(PYTHON_INSTALL_DIR, 'DLLs', 'tk86t.dll'),
                                        #os.path.join(PYTHON_INSTALL_DIR, 'DLLs', 'tcl86t.dll'),
                                        os.path.join('lib'),
                                        (os.path.join('pyCHATManager.exe')),
                                        (os.path.join('pySGPChat-0.0.1.win32.zip')),
                                    ],
                    excludes = ["tkinter", "tcl", "test"],
                    includes = ["_mssql", "uuid","zope.interface"],
                    #includes = includes.split(","),
                    optimize = 2
                    #build_exe = "./dist"
                    ,) #"""


"""
mplBackendsPath = os.path.join(os.path.split(sys.executable)[0],
                        "Lib/site-packages/matplotlib/backends/backend_*")

fileList = glob.glob(mplBackendsPath)

moduleList = []

for mod in fileList:
    modules = os.path.splitext(os.path.basename(mod))[0]
    if not module == "backend_qt4agg":
        moduleList.append("matplotlib.backends." + modules)

build_exe_options = {"excludes": ["tkinter"] + moduleList, "optimize": 2}

copyDependentFiles=True,
    appendScriptToExe=True,
    appendScriptToLibrary=False,
#"""



shortcut_table = [
    ("Startup",        # Shortcut
     "StartupFolder",          # Directory_
     "pySGPChat",                  # Name
     "TARGETDIR",              # Component_
     "[TARGETDIR]pySGPChat.exe",# Target
     None,                     # Arguments
     None,                     # Description
     None,                     # Hotkey
     None,                     # Icon
     None,                     # IconIndex
     None,                     # ShowCmd
     'TARGETDIR'               # WkDir
     ),
    #("Start Menu",        # Shortcut
    ("Desktop Shortcut",        # Shortcut
     "DesktopFolder",          # Directory_
     "PySGPChat Manager",                  # Name
     "TARGETDIR",              # Component_
     #"[TARGETDIR]pySGPChat.exe",# Target
     "[TARGETDIR]pyCHATManager.exe",# Target
     None,                     # Arguments
     None,                     # Description
     None,                     # Hotkey
     None,                     # Icon
     None,                     # IconIndex
     None,                     # ShowCmd
     'TARGETDIR'               # WkDir
     ),
    ("Programs Folder",        # Shortcut
     "ProgramMenuFolder",          # Directory_
     "PySGPChat Manager",                  # Name
     "TARGETDIR",              # Component_
     "[TARGETDIR]pyCHATManager.exe",# Target
     None,                     # Arguments
     None,                     # Description
     "CTRL + ALT + C",                     # Hotkey
     None,                     # Icon
     None,                     # IconIndex
     None,                     # ShowCmd
     'TARGETDIR'               # WkDir
     ),
    ]

# Now create the table dictionary
msi_data = {"Shortcut": shortcut_table}

# Change some default MSI options and specify the use of the above defined tables
bdist_msi_options = {'data': msi_data, "upgrade_code": "{96a85bac-52af-4019-9e94-3afcc9e1ad0c}", "add_to_path": True}


#options = {
        #"bdist_msi": bdist_msi_options,
    #}

setup(  name = "pySGPChat(py" + pyVersion +")",
        version = "1.0",
        description = "pySGPChat - pyCHAT",
        options = dict(build_exe = buildOptions, bdist_msi = bdist_msi_options),
        executables = executables
        ,)
#python setup.py bdist_msi #py-2.7 - py-3.6 -
#python setup.py build
#python -m pip install cx_Freeze --upgrade
#pip install cx_Freeze-6.0b1-cp36-cp36m-win32.whl
