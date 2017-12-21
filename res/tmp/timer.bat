@echo off
set t1=%time%
REM echo %time% < nul
cmd /c %1
echo %t1% < nul
echo %time% < nul
