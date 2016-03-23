# cd into data directory
cd public/data

# extract county data into national/state/tx files
fab getCounties

# clean up the state file
csvcut -c statefips,state,pop10,pop11,pop12,pop13,pop14,pop15 -d "," state_county_pop_2015_tmp.csv > state_county_pop_2015.csv
rm -rf state_county_pop_2015_tmp.csv

# extract MSA into new files
fab getMSA
