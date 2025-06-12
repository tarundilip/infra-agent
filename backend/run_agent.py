import logging
from backend.agent.system_agent import SystemHealthAgent
import json
from datetime import datetime
import os
from backend.utils.cloud import upload_to_gcs

logging.basicConfig(
    filename='agent.log',
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s'
)

logging.info("Agent started...")

output_dir = "reports"
os.makedirs(output_dir, exist_ok=True)

agent = SystemHealthAgent()

try:
    report = agent.run()
    logging.info(f"Report collected: {report}")
except Exception as e:
    logging.error(f"Error running agent: {e}", exc_info=True)
    report = {}

timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
output_file = os.path.join(output_dir, f"report_{timestamp}.json")
with open(output_file, "w") as f:
    json.dump(report, f, indent=2)

logging.info(f"Report saved to {output_file}")

bucket_name = "infra-agent-lite-bucket"
destination_blob_name = f"reports/{os.path.basename(output_file)}"

try:
    upload_to_gcs(output_file, bucket_name, destination_blob_name)
    logging.info(f"Uploaded {output_file} to GCS bucket '{bucket_name}' as '{destination_blob_name}'")
except Exception as e:
    logging.error(f"Failed to upload to GCS: {e}", exc_info=True)
