from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

project = Path(__file__).resolve().parent
zip_path = project.parent / f"{project.name}.zip"

excluded_parts = {".venv", "__pycache__", ".git"}
excluded_names = {".DS_Store", "kiwi-welcome.zip"}

with ZipFile(zip_path, "w", ZIP_DEFLATED) as archive:
    for path in project.rglob("*"):
        if not path.is_file():
            continue
        if any(part in excluded_parts for part in path.parts):
            continue
        if path.name in excluded_names:
            continue

        archive.write(path, path.relative_to(project.parent))

print(f"Created: {zip_path}")
