import psutil
from backend.agent.base import BaseAgent

class MemoryCheckAgent(BaseAgent):
    def run(self):
        mem = psutil.virtual_memory()
        return {"memory_percent": mem.percent}
