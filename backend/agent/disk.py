import psutil
from backend.agent.base import BaseAgent

class DiskCheckAgent(BaseAgent):
    def run(self):
        disk = psutil.disk_usage('/')
        return {"disk_percent": disk.percent}
