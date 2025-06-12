import psutil
from backend.agent.base import BaseAgent

class CpuCheckAgent(BaseAgent):
    def run(self):
        return {"cpu_percent": psutil.cpu_percent(interval=1)}
