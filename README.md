# Welcome to Aotearoa

A beginner-friendly learning website built with Python and Flask. It includes topic lessons, browser-based read-aloud, and repeat-after-me practice.

## Requirements

- Python 3.9 or newer
- Internet browser

## Run on Windows

Open PowerShell in this folder:

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

If PowerShell blocks activation, run the app with:

```powershell
.venv\Scripts\python.exe -m pip install -r requirements.txt
.venv\Scripts\python.exe app.py
```

## Run on macOS or Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Open http://127.0.0.1:5000 in your browser.

Speech playback uses the browser's Web Speech API. Available voices depend on your device and browser.

## Create a ZIP

While the app is running, click **Download ZIP** in the top menu (or open http://127.0.0.1:5000/download).

Or run:

```bash
python make_zip.py
```

This creates `Newzealand_Learn.zip` in the parent folder. It excludes your virtual environment and Python cache files.
