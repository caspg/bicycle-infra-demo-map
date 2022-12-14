# Bicycle infrastructure demo map


https://user-images.githubusercontent.com/10419439/192972574-bf8800b3-880b-4edc-828b-5e3d03b5b914.mov


## Generating geojson with bicycle infrastructure

Software requirements:

* https://osmcode.org/osmium-tool/
* https://gdal.org/ (ogr2ogr)

Download OSM data from geofabrik

```bash
curl https://download.geofabrik.de/europe/poland/pomorskie-latest.osm.pbf -o pomorskie-latest.osm.pbf
```

Generate desired boundry polygon

```bash
osmium getid -r pomorskie-latest.osm.pbf r11772296 -o trojmiasto-aglomeracja-boundary.osm
```

Extract data using previously generated polygon

```bash
osmium extract -p trojmiasto-aglomeracja-boundary.osm pomorskie-latest.osm.pbf -o trojmiasto-aglomeracja.osm.pbf
```

Filter desired ways by tags

```bash
osmium tags-filter trojmiasto-aglomeracja.osm.pbf w/highway=cycleway w/bicycle=designated -o trojmiasto-aglomeracja-bicycle-infra.osm.pbf
```

Check layers

```bash
ogrinfo trojmiasto-aglomeracja-bicycle-infra.osm.pbf
```

Convert given layer to GeoJSON

```bash
ogr2ogr -f GeoJSON trojmiasto-aglomeracja-bicycle-infra_1.geojson trojmiasto-aglomeracja-bicycle-infra.osm.pbf lines
ogr2ogr -f GeoJSON trojmiasto-aglomeracja-bicycle-infra_2.geojson trojmiasto-aglomeracja-bicycle-infra.osm.pbf multilinestrings
```

In this example, only `lines` layer has data.
