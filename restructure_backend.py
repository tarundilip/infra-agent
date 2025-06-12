import os
import shutil
import re
import subprocess

BACKEND_DIR = "backend"
MOVE_ITEMS = ["agent", "utils", "run_agent.py", "run_agent.sh", "requirements.txt"]
OLD_MODULES = ["agent", "utils"]

def git_commit():
    subprocess.run(["git", "add", "."], check=True)
    subprocess.run(["git", "commit", "-m", "Automated backend restructure"], check=True)

def move_items():
    for item in MOVE_ITEMS:
        src = os.path.join(".", item)
        dst = os.path.join(BACKEND_DIR, os.path.basename(item))
        if os.path.exists(src):
            print(f"Moving {src} → {dst}")
            shutil.move(src, dst)
        else:
            print(f"Skipping {item} (not found)")

def fix_imports():
    for root, _, files in os.walk(BACKEND_DIR):
        for file in files:
            if file.endswith(".py"):
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                original = content

                for module in OLD_MODULES:
                    # Match: from agent. OR import agent.
                    content = re.sub(rf'\bfrom {module}\b', f'from backend.{module}', content)
                    content = re.sub(rf'\bimport {module}\b', f'import backend.{module}', content)

                if content != original:
                    print(f"Updated imports in {file_path}")
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(content)

def main():
    print("🔁 Moving backend items...")
    move_items()
    print("🔧 Fixing import paths...")
    fix_imports()
    print("✅ Restructure complete.")
    git_commit()
    print("Git commit complete.")

if __name__ == "__main__":
    main()
