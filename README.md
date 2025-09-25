# foreclosure-map

A tool to predict upcoming property foreclosures via tax delinquency in WA state.

## Setup

1. Install esridump tool to get data from WA arcgis feature server.

```
mkdir esridump
virtualenv esridump
source ./esridump/bin/activate
pip install esridump
```

```
esri2geojson https://services.arcgis.com/jsIt88o09Q0r1j8h/ArcGIS/rest/services/Current_Parcels/FeatureServer/0 parcels.geojson
```

