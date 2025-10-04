# http://foreclosedby.tax

A project to show homes that are delinquent or about to be forclosed on by taxes in WA. (And eventually nationally.)

Getting started with development:
```bash
npm install
npm run dev
```

### Getting Tax Parcel Data

Download GeoJSON of tax parcels ([2025](https://geo.wa.gov/maps/2b603a599a0842a3b2284c04c8927f35/about)) from the [WA geospatial open data portal](https://geo.wa.gov/).

I recommend using `wget -c {GeoJSON URL}` to download the file since the server may kill your download in the middle simply because the tax parcel data is quite large (> 5GB).

Once the data is obtained, it will need to be imported into
DuckDB and then spatially joined with pointcloud data about
forclosures.

Basically will have a few different data sources:
Will have layer of basemap.
Then will have layer for tax parcels.
Then will have point cloud layer for homes that are in foreclosure.

The point cloud layer will need to be intersected with the
tax parcel layer to find the parcels that have problems.

Or I could only include the parcels that are reaching foreclosure.

Or I could add a property to the parcels that are in foreclosure instead. (I like this option, and I think that I will go with it.)

So a property dictating that a parcel is in forclosure.
How will I do that? I will query all parcels in the list on the assessor's site, (only do single family homes?) and then join the data that I get from the assessor with the data that I have on state tax parcels.

With these two together, I should be able to set a flag in the generated GeoJSON (with COPY gdal mode) to display in MapLibre on the front end.

So the pipeline will look something like:
```
                     ST_Read     GDAL COPY
+--------------------+     +------+     +-------+     +--------------+
|WA TaxParcel GeoJSON| --> |DuckDB| --> |PMTiles| --> |MapLibre GL JS|
+--------------------+     +------+     +-------+     +--------------+
                            ^
                            |
+-----------------------------+
|Assessor Data for 1 Fam Homes|
+-----------------------------+
            ^
            |
+------------------------+
|County Assessor Scrapers|
+------------------------+
```

Initial scope to deliver value, is do the scraping for a single county. King or Snohomish?
Only perform on parcels zoned for single family housing.