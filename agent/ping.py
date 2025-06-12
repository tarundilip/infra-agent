import subprocess
from agent.base import BaseAgent

class PingCheckAgent(BaseAgent):
    def run(self):
        try:
            output = subprocess.check_output(["ping", "-c", "1", "8.8.8.8"], stderr=subprocess.DEVNULL)
            for line in output.decode().split("\n"):
                if "time=" in line:
                    time_ms = line.split("time=")[-1].split(" ")[0]
                    return {"ping_google_ms": float(time_ms)}
            return {"ping_google_ms": "unknown"}
        except Exception:
            return {"ping_google_ms": "unreachable"}

