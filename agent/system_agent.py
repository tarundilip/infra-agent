from concurrent.futures import ThreadPoolExecutor
from agent.cpu import CpuCheckAgent
from agent.memory import MemoryCheckAgent
from agent.disk import DiskCheckAgent
from agent.ping import PingCheckAgent

class SystemHealthAgent:
    def __init__(self):
        self.agents = [
            CpuCheckAgent(),
            MemoryCheckAgent(),
            DiskCheckAgent(),
            PingCheckAgent()
        ]

    def run(self):
        results = {}
        with ThreadPoolExecutor() as executor:
            futures = [executor.submit(agent.run) for agent in self.agents]
            for future in futures:
                results.update(future.result())
        return results
