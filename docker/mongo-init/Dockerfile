FROM mongo

COPY init_data.json /init_data.json
CMD mongoimport --host mongo --db test --collection book --type json --file /init_data.json --jsonArray
