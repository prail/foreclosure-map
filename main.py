import logging
import json
import sys

from prefect import flow, task
from esridump import EsriDumper
from pathlib import Path

FEATURE_SERVER = "https://services.arcgis.com/jsIt88o09Q0r1j8h/ArcGIS/rest/services/Current_Parcels/FeatureServer/0"

# override base esri dumper
class DagEsriDumper(EsriDumper):
    @task(retries=5, retry_delay_seconds=2)
    def __iter__(self):
        for p in super().__iter__():
            yield p

@flow(log_prints=True)
def dump(path):
    logger = logging.getLogger('cli')
    logger.setLevel(logging.INFO)
    handler = logging.StreamHandler()
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)

    dumper = DagEsriDumper(FEATURE_SERVER,
        extra_query_args=None,
        extra_headers=None,
        fields=None,
        request_geometry=True,
        proxy=None,
        timeout=30,
        max_page_size=1000,
        pause_seconds=0,
        parent_logger=logger,
        paginate_oid=False)

    with path.open("a") as f:
        for i, feature in enumerate(dumper):
            print(json.dumps(feature))
            f.write(json.dumps(feature))
            f.write('\n')
        f.close()
    
if __name__ == "__main__":
    dump(Path("parcels.geojson"))